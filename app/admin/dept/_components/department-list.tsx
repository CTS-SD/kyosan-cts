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
import { GripVerticalIcon, PointerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { reorderDepartments } from "@/features/departments/api";
import { departmentGradientStyle } from "@/features/departments/assets";
import type { Department } from "@/features/students/types";
import { cn } from "@/lib/utils";

type Props = {
  departments: Department[];
  counts: Record<number, number>;
  onSaved?: () => void;
  onCancel?: () => void;
} & React.ComponentProps<"div">;

export const DepartmentList = ({ departments, counts, onSaved, onCancel, className, ...props }: Props) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<number[]>(() => departments.map((d) => d.id));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const byId = new Map(departments.map((d) => [d.id, d]));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setOrder((prev) => arrayMove(prev, prev.indexOf(Number(active.id)), prev.indexOf(Number(over.id))));
  };

  const save = async () => {
    setSaving(true);
    try {
      await reorderDepartments(order);
      toast.success("並び順を保存しました");
      router.refresh();
      onSaved?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "並び順の保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex items-center gap-2 px-2">
        <span className="flex items-center gap-2 px-2 text-muted-foreground text-sm">
          <PointerIcon className="size-4" />
          <span className="font-semibold">ドラッグして並び替え</span>
        </span>
        <Button className="ml-auto" size="sm" onClick={save} disabled={saving}>
          {saving && <Spinner />}
          保存
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div className="flex flex-col gap-1 rounded-3xl bg-accent p-1">
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
        "flex touch-none items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
        isDragging ? "z-10 cursor-grabbing opacity-80 shadow-lg" : "cursor-grab",
      )}
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground" />
      <span className="size-3 shrink-0 rounded-full" style={departmentGradientStyle(color)} />
      <span className="font-semibold">{name}</span>
      <span className="ml-auto shrink-0 text-muted-foreground text-sm">{count}名</span>
    </button>
  );
};

export const DepartmentListDialogContent = ({
  departments,
  counts,
}: {
  departments: Department[];
  counts: Record<number, number>;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>部署を並び替え</DialogTitle>
        <DialogDescription>配属発表ページの並び順に影響します</DialogDescription>
      </DialogHeader>
      <div className="p-2 pt-0">
        <DepartmentList departments={departments} counts={counts} />
      </div>
    </DialogContent>
  );
};
