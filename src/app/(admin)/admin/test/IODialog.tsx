import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { client } from "@/db/hono";
import dayjs from "dayjs";
import {
  CheckCircleIcon,
  CircleCheckIcon,
  DownloadIcon,
  FileIcon,
  ShareIcon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

const IODialog = ({}: Props) => {
  const [importFile, setImportFile] = useState<File>();

  const handleDownload = async () => {
    const res = await client.api.admin.quiz.export.$get();
    if (!res.ok) {
      toast.error("ダウンロードに失敗しました");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ぷらっとテスト-${dayjs().format("YYYY-MM-DD-HHmmss")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!importFile) return;

    const res = await client.api.admin.quiz.import.$post({
      form: {
        file: importFile,
      },
    });

    if (!res.ok) {
      toast.error("アップロードに失敗しました");
      return;
    }

    const data = await res.json();

    toast.success(
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-semibold">
          <CircleCheckIcon size={16} />
          問題のアップロードが完了しました
        </div>
        <div className="flex gap-2 text-neutral-400">
          <div>追加: {data.createdNum}件</div>
          <div>更新: {data.updatedNum}件</div>
        </div>
      </div>,
    );

    setImportFile(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shrink-0" size="icon">
          <ShareIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ダウンロード / アップロード</DialogTitle>
        </DialogHeader>
        <div className="rounded-xl border">
          <div className="p-6">
            <div className="font-semibold">問題をダウンロード</div>
            <div className="mt-2 text-sm leading-5 text-neutral-500">
              作成したすべての問題を一つのデータファイルとしてダウンロードすることができます。定期的にダウンロードを行い、バックアップとして保存しておくことをお勧めします。
            </div>
          </div>
          <div className="flex justify-end border-t p-4">
            <Button className="w-fit" onClick={handleDownload}>
              <DownloadIcon className="mr-2" size={16} />
              ダウンロード
            </Button>
          </div>
        </div>
        <div className="min-w-0 rounded-xl border">
          <div className="p-6">
            <div className="font-semibold">問題をアップロード</div>
            <div className="mt-2 text-sm leading-5 text-neutral-500">
              ファイルをアップロードして問題を追加することができます。問題IDが重複した場合、アップロードデータによって上書きされます。
            </div>
          </div>
          <form
            className="flex justify-end gap-2 border-t p-4"
            onSubmit={handleUpload}
          >
            <label
              htmlFor="import-file"
              className="flex w-full min-w-0 cursor-pointer items-center rounded-md border px-4"
            >
              <FileIcon className="mr-2 shrink-0" size={16} />
              <div className="truncate text-sm">
                {importFile?.name || "ファイルを選択"}
              </div>
              <input
                type="file"
                className="hidden"
                id="import-file"
                accept=".json"
                onChange={(e) =>
                  setImportFile((prev) => e.target.files?.[0] || prev)
                }
              />
            </label>
            <Button type="submit" disabled={!importFile}>
              <UploadIcon className="mr-2" size={16} />
              アップロード
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IODialog;
