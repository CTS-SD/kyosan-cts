import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DownloadIcon, FileIcon, ShareIcon } from "lucide-react";

type Props = {};

const IODialog = ({}: Props) => {
  const handleDownload = () => {
    window.open("/api/admin/quiz/export");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <ShareIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
        <div className="rounded-xl border">
          <div className="p-6">
            <div className="font-semibold">問題をインポート</div>
            <div className="mt-2 text-sm leading-5 text-neutral-500">
              JSON形式で問題をインポートすることができます。
              <div className="text-yellow-600">この機能は現在開発中です🙇</div>
            </div>
          </div>
          <div className="flex justify-end border-t p-4">
            <Button className="w-fit" disabled>
              <FileIcon className="mr-2" size={16} />
              ファイルを選択
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IODialog;
