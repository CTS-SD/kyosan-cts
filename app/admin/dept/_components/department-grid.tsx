"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowUpDownIcon, GripVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { reorderDepartments } from "@/features/departments/api";
import type { Department } from "@/features/students/types";
import { cn } from "@/lib/utils";

type Props = {
  departments: Department[];
  counts: Record<number, number>;
  addButton: React.ReactNode;
  children: React.ReactNode;
};

export const DepartmentGrid = ({ departments, counts, addButton, children }: Props) => {
  const router = useRouter();
  const [reordering, setReordering] = useState(false);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<number[]>(() => departments.map((d) => d.id));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const byId = new Map(departments.map((d) => [d.id, d]));

  const start = () => {
    setOrder(departments.map((d) => d.id));
    setReordering(true);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setOrder((prev) => arrayMove(prev, prev.indexOf(Number(active.id)), prev.indexOf(Number(over.id))));
  };

  const save = async () => {
    setSaving(true);
    try {
      await reorderDepartments(order);
      toast.success("並び順を保存しました");
      setReordering(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "並び順の保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  if (!reordering) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={start} disabled={departments.length < 2}>
            <ArrowUpDownIcon />
            並び替え
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {children}
          <div className="grid place-content-center">{addButton}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">ドラッグして並び替え</span>
        <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setReordering(false)} disabled={saving}>
          キャンセル
        </Button>
        <Button size="sm" onClick={save} disabled={saving}>
          {saving && <Spinner />}
          保存
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {order.map((id) => {
              const dept = byId.get(id);
              if (!dept) return null;
              return (
                <SortableDepartmentCard key={id} id={id} name={dept.name} color={dept.color} count={counts[id] ?? 0} />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableDepartmentCard = ({
  id,
  name,
  color,
  count,
}: {
  id: number;
  name: string;
  color: string;
  count: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      aria-label={`${name} を並び替え`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex touch-none items-center gap-2 rounded-3xl border bg-accent px-4 py-3 text-left outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
        isDragging ? "z-10 cursor-grabbing opacity-80 shadow-lg" : "cursor-grab",
      )}
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground" />
      <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-semibold text-muted-foreground">{name}</span>
      <span className="ml-auto shrink-0 text-muted-foreground text-sm">{count}名</span>
    </button>
  );
};
