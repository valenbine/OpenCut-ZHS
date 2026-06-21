"use client";

import { GitHubContributeSection } from "@/components/gitHub-contribute-section";
import { useI18n } from "@/i18n/language-provider";
import { Badge } from "@/components/ui/badge";
import { ReactMarkdownWrapper } from "@/components/ui/react-markdown-wrapper";
import { cn } from "@/utils/ui";

const LAST_UPDATED = "2026-02-25";

type StatusType = "complete" | "pending" | "default" | "info";

interface Status {
	text: string;
	type: StatusType;
}

interface RoadmapItem {
	title: string;
	description: string;
	status: Status;
}

export function RoadmapTitle() {
	const { locale } = useI18n();
	return locale === "zh-CN" ? "路线图" : "Roadmap";
}

export function RoadmapDescription() {
	const { locale } = useI18n();
	return locale === "zh-CN"
		? `OpenCut 接下来会做什么（最后更新：${LAST_UPDATED}）`
		: `What's coming next for OpenCut (last updated: ${LAST_UPDATED})`;
}

export function RoadmapContent() {
	const { locale } = useI18n();
	const copy = {
		"zh-CN": {
			items: [
				{
					title: "起点",
					description:
						"一切从这里开始。仓库建立、初始项目结构完成，也确定了免费开源视频编辑器的愿景。[这里可以看到第一条推文](https://x.com/mazeincoding/status/1936706642512388188)。",
					status: { text: "已完成", type: "complete" as const },
				},
				{
					title: "核心界面",
					description:
						"搭建基础框架，包括主布局、页头、侧栏、时间线容器和基础组件结构。功能还在持续补齐，但整体 UI 骨架已经成型。",
					status: { text: "已完成", type: "complete" as const },
				},
				{
					title: "核心功能",
					description:
						"让视频编辑器真正**可用**的能力都会集中在这里，包括时间线交互、存储、特效、转场等。",
					status: { text: "进行中", type: "pending" as const },
				},
				{
					title: "原生应用（移动端/桌面端）",
					description:
						"为 Mac、Windows、Linux 和 iOS/Android 提供原生 OpenCut 应用。",
					status: { text: "未开始", type: "default" as const },
				},
			],
			contributeTitle: "想一起参与吗？",
			contributeDescription:
				"OpenCut 是开源项目，由社区共同构建。每一次贡献都会推动我们把这款免费视频编辑器做得更完整。",
		},
		en: {
			items: [
				{
					title: "Start",
					description:
						"This is where it all started. Repository created, initial project structure, and the vision for a free, open-source video editor. [Check out the first tweet](https://x.com/mazeincoding/status/1936706642512388188) to see where it started.",
					status: { text: "Completed", type: "complete" as const },
				},
				{
					title: "Core UI",
					description:
						"Build the foundation - main layout, header, sidebar, timeline container, and basic component structure. Not all functionality yet, but the UI framework that everything else builds on.",
					status: { text: "Completed", type: "complete" as const },
				},
				{
					title: "Essential functionality",
					description:
						"Everything that makes a video editor **useful**. Timeline interactivity, storage, effects, transitions, etc.",
					status: { text: "In progress", type: "pending" as const },
				},
				{
					title: "Native app (mobile/desktop)",
					description:
						"Native OpenCut apps for Mac, Windows, Linux, and iOS/Android.",
					status: { text: "Not started", type: "default" as const },
				},
			],
			contributeTitle: "Want to help?",
			contributeDescription:
				"OpenCut is open source and built by the community. Every contribution, no matter how small, helps us build the best free video editor possible.",
		},
	}[locale];

	return (
		<div className="mx-auto flex max-w-4xl flex-col gap-16">
			<div className="flex flex-col gap-6">
				{copy.items.map((item, index) => (
					<RoadmapItem key={item.title} item={item} index={index} />
				))}
			</div>
			<GitHubContributeSection
				title={copy.contributeTitle}
				description={copy.contributeDescription}
			/>
		</div>
	);
}

function RoadmapItem({ item, index }: { item: RoadmapItem; index: number }) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-medium">
				<span className="leading-normal select-none">{index + 1}</span>
				<h3>{item.title}</h3>
				<StatusBadge status={item.status} className="ml-1" />
			</div>
			<div className="text-foreground/70 leading-relaxed">
				<ReactMarkdownWrapper>{item.description}</ReactMarkdownWrapper>
			</div>
		</div>
	);
}

function StatusBadge({
	status,
	className,
}: {
	status: Status;
	className?: string;
}) {
	return (
		<Badge
			className={cn("shadow-none", className, {
				"bg-green-500! text-white": status.type === "complete",
				"bg-yellow-500! text-white": status.type === "pending",
				"bg-blue-500! text-white": status.type === "info",
				"bg-foreground/10! text-accent-foreground": status.type === "default",
			})}
		>
			{status.text}
		</Badge>
	);
}
