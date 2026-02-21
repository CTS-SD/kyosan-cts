"use client";

import { ClockIcon, ListCheckIcon, PercentIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DailySessionTrend, PerQuizAccuracy, QuizType, SessionSummary } from "@/lib/quiz";
import { getQuizTypeLabel } from "@/lib/quiz";

type DashboardProps = {
  summary: SessionSummary;
  perQuiz: PerQuizAccuracy[];
  trend: DailySessionTrend[];
};

function formatPlayTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const summaryCards = [
  {
    title: "総プレイ数",
    icon: PlayIcon,
    getValue: (s: SessionSummary) => s.totalSessions.toLocaleString(),
    description: "ぷらっとテストの完了回数",
  },
  {
    title: "総出題数",
    icon: ListCheckIcon,
    getValue: (s: SessionSummary) => s.totalQuestions.toLocaleString(),
    description: "出題された問題の総数",
  },
  {
    title: "平均正答率",
    icon: PercentIcon,
    getValue: (s: SessionSummary) => `${s.avgAccuracyRate}%`,
    description: "全問題の平均正答率",
  },
  {
    title: "平均プレイ時間",
    icon: ClockIcon,
    getValue: (s: SessionSummary) => formatPlayTime(s.avgPlayTimeSec),
    description: "ぷらっとテストの平均プレイ時間",
  },
] as const;

const chartConfig = {
  sessionCount: {
    label: "プレイ数",
    color: "var(--color-primary)",
  },
  avgAccuracyRate: {
    label: "平均正答率",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export function Dashboard({ summary, perQuiz, trend }: DashboardProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} size="sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{card.title}</CardDescription>
                <card.icon className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="font-semibold text-2xl!">{card.getValue(summary)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Trend Chart */}
      <Card className="max-sm:-mx-6 max-sm:rounded-none">
        <CardHeader>
          <CardTitle>日別プレイ推移（過去30日）</CardTitle>
          <CardDescription>プレイ数と平均正答率の推移</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {trend.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <ComposedChart data={trend} margin={{ left: 0, right: 12, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => {
                    const d = new Date(value);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 100]}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value: string) => {
                        const d = new Date(value);
                        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  yAxisId="left"
                  dataKey="sessionCount"
                  fill="var(--color-sessionCount)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Line
                  yAxisId="right"
                  dataKey="avgAccuracyRate"
                  stroke="var(--color-avgAccuracyRate)"
                  strokeWidth={2}
                  dot={false}
                  type="monotone"
                  connectNulls={true}
                />
              </ComposedChart>
            </ChartContainer>
          ) : (
            <p className="py-12 text-center text-muted-foreground">データがありません</p>
          )}
        </CardContent>
      </Card>

      {/* Per-Quiz Accuracy Table */}
      <Card className="max-sm:-mx-6 max-sm:rounded-none">
        <CardHeader>
          <CardTitle>問題別正答率</CardTitle>
          <CardDescription>正答率が低い順</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {perQuiz.length > 0 ? (
            <div className="flex overflow-x-auto">
              <div className="grow px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>問題文</TableHead>
                      <TableHead className="w-24">回答形式</TableHead>
                      <TableHead className="w-20 text-right">回答数</TableHead>
                      <TableHead className="w-48">正答率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {perQuiz.map((quiz) => (
                      <TableRow key={quiz.quizId}>
                        <TableCell className="text-muted-foreground">{quiz.quizId}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          <Link href={`/admin/puratto/q/${quiz.quizId}`} className="hover:underline" target="_blank">
                            {quiz.question}
                          </Link>
                        </TableCell>
                        <TableCell>{getQuizTypeLabel(quiz.type as QuizType)}</TableCell>
                        <TableCell className="text-right">{quiz.totalAttempts}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={quiz.accuracyRate} className="h-2 w-30" />
                            <span className="w-12 text-right text-muted-foreground text-xs">{quiz.accuracyRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">データがありません</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
