import type { Metadata } from "next";
import { ChangelogContent } from "@/app/changelog/changelog-content";
import { getSortedReleases } from "@/changelog/utils";

export const metadata: Metadata = {
	title: "更新日志 - OpenCut",
	description: "查看 OpenCut 的最新变化",
	openGraph: {
		title: "更新日志 - OpenCut",
		description: "OpenCut 的每一次更新、改进和修复都记录在这里。",
		type: "website",
		images: [
			{
				url: "/open-graph/changlog.jpg",
				width: 1200,
				height: 630,
				alt: "OpenCut 更新日志",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "更新日志 - OpenCut",
		description: "查看 OpenCut 的最新变化",
		images: ["/open-graph/changlog.jpg"],
	},
};

export default function ChangelogPage() {
	const releases = getSortedReleases();

	return <ChangelogContent releases={releases} />;
}
