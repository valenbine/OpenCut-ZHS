import type { Metadata } from "next";
import { TermsContent } from "@/app/terms/terms-content";

export const metadata: Metadata = {
	title: "服务条款 - OpenCut",
	description:
		"OpenCut 的服务条款，为这款免费开源视频编辑器提供清晰透明的使用说明。",
	openGraph: {
		title: "服务条款 - OpenCut",
		description:
			"OpenCut 的服务条款，为这款免费开源视频编辑器提供清晰透明的使用说明。",
		type: "website",
	},
};

export default function TermsPage() {
	return <TermsContent />;
}
