import { Markdown } from "@/features/quiz/components/markdown";

const items = [
  {
    title: "見出し",
    content: `# 見出し1（最大）
## 見出し2
### 見出し3
#### 見出し4（最小）
`,
  },
  {
    title: "強調",
    content: `**太字**

*斜体*

~~打ち消し線~~

**太字の中に*斜体*を入れる**
`,
  },
  {
    title: "リスト（箇条書き）",
    content: `- りんご
- みかん
- ぶどう
  - 巨峰
  - マスカット
`,
  },
  {
    title: "リスト（番号付き）",
    content: `1. 最初にすること
2. 次にすること
3. 最後にすること
`,
  },
  {
    title: "チェックリスト",
    content: `- [x] 完了したタスク
- [x] これも完了
- [ ] まだのタスク
- [ ] これも未完了
`,
  },
  {
    title: "リンク",
    content: `[リンクのテキスト](https://example.com)

[京都産業大学](https://www.kyoto-su.ac.jp)
`,
  },
  {
    title: "画像",
    content: `![京産の画像](https://i.imgur.com/XcomFXw.jpeg)
`,
  },
  {
    title: "引用",
    content: `> これは引用文です。

> 引用の中に **太字** や *斜体* も使えます。
`,
  },
  {
    title: "コード（インライン）",
    content: `文章の中に \`コード\` を埋め込めます。

例えば \`Hello, World!\` のように書きます。
`,
  },
  {
    title: "コードブロック",
    content: `\`\`\`タイトル
複数行のコードは
このように書きます。
\`\`\`
`,
  },
  {
    title: "テーブル",
    content: `| 名前 | 役割 | 所属 |
| --- | --- | --- |
| 山田 太郎 | リーダー | 案内班 |
| 鈴木 花子 | サブ | 受付班 |
| 田中 一郎 | メンバー | 案内班 |
`,
  },
  {
    title: "水平線",
    content: `上のセクション

---

下のセクション
`,
  },
];

const MarkdownPage = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="my-8 font-bold text-2xl">マークダウン記法について</h1>
      <h2 className="mt-12 mb-6 font-semibold text-lg">マークダウン記法とは？</h2>
      <p className="text-foreground/80 leading-relaxed">
        マークダウンは、テキストを簡単に装飾するための記法です。見出しやリスト、リンク、画像などをシンプルな記号で表現できます。例えば、見出しは「#」を使い、リストは「-」や「1.」を使います。マークダウンは多くのプラットフォームでサポートされており、ブログやドキュメント作成などで広く利用されています。
      </p>
      <h2 className="mt-12 mb-6 font-semibold text-lg">書き方と実際の表示例</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="flex min-w-0 flex-col">
            <h2 className="mb-2 px-4 font-semibold">{item.title}</h2>
            <MarkdownExample content={item.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const MarkdownExample = ({ content }: { content: string }) => {
  return (
    <div className="min-w-0 grow rounded-3xl border bg-card p-1.5 shadow-xs">
      <pre className="min-w-0 overflow-x-auto rounded-2xl bg-accent p-4 text-sm">{content}</pre>
      <Markdown className="p-4">{content}</Markdown>
    </div>
  );
};

export default MarkdownPage;
