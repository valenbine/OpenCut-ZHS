import type { Metadata } from "next";
import { BasePage } from "@/app/base-page";
import {
	RoadmapContent,
	RoadmapDescription,
	RoadmapTitle,
} from "./roadmap-content";

export const metadata: Metadata = {
	title: "路线图 - OpenCut",
	description:
		"查看 OpenCut 接下来的计划，这是一款尊重隐私的免费开源视频编辑器。",
	openGraph: {
		title: "OpenCut 路线图 - 接下来要做什么",
		description:
			"查看 OpenCut 接下来的计划，这是一款尊重隐私的免费开源视频编辑器。",
		type: "website",
		images: [
			{
				url: "/open-graph/roadmap.jpg",
				width: 1200,
				height: 630,
				alt: "OpenCut 路线图",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OpenCut 路线图 - 接下来要做什么",
		description:
			"查看 OpenCut 接下来的计划，这是一款尊重隐私的免费开源视频编辑器。",
		images: ["/open-graph/roadmap.jpg"],
	},
};

export default function RoadmapPage() {
	return (
		<BasePage
			title={<RoadmapTitle />}
			description={<RoadmapDescription />}
		>
			<RoadmapContent />
		</BasePage>
	);
}
