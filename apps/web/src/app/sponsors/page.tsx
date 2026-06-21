import type { Metadata } from "next";
import { BasePage } from "@/app/base-page";
import {
	SponsorsContent,
	SponsorsDescription,
	SponsorsTitle,
} from "./sponsors-content";

export const metadata: Metadata = {
	title: "赞助者 - OpenCut",
	description:
		"支持 OpenCut，一起构建免费开源视频编辑的未来。",
	openGraph: {
		title: "赞助者 - OpenCut",
		description:
			"支持 OpenCut，一起构建免费开源视频编辑的未来。",
		type: "website",
	},
};

export default function SponsorsPage() {
	return (
		<BasePage title={<SponsorsTitle />} description={<SponsorsDescription />}>
			<SponsorsContent />
		</BasePage>
	);
}
