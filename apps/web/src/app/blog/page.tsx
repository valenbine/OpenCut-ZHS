import type { Metadata } from "next";
import { BlogContent } from "@/app/blog/blog-content";
import { getPosts } from "@/blog/query";

export const metadata: Metadata = {
	title: "博客 - OpenCut",
	description:
		"阅读 OpenCut 的最新动态与更新，这是一款免费开源的视频编辑器。",
	openGraph: {
		title: "博客 - OpenCut",
		description:
			"阅读 OpenCut 的最新动态与更新，这是一款免费开源的视频编辑器。",
		type: "website",
	},
};

export default async function BlogPage() {
	const data = await getPosts().catch(() => null);
	return <BlogContent posts={data?.posts ?? []} />;
}
