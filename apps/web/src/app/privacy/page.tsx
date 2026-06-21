import type { Metadata } from "next";
import { PrivacyContent } from "@/app/privacy/privacy-content";

export const metadata: Metadata = {
	title: "隐私政策 - OpenCut",
	description:
		"了解 OpenCut 如何处理你的数据与隐私，以及我们在视频编辑过程中保护信息的方式。",
	openGraph: {
		title: "隐私政策 - OpenCut",
		description:
			"了解 OpenCut 如何处理你的数据与隐私，以及我们在视频编辑过程中保护信息的方式。",
		type: "website",
	},
};

export default function PrivacyPage() {
	return <PrivacyContent />;
}
