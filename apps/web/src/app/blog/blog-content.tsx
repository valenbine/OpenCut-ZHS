"use client";

import Link from "next/link";
import { BasePage } from "@/app/base-page";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/language-provider";
import type { Post } from "@/blog/types";

const copyByLocale = {
	"zh-CN": {
		title: "博客",
		description: "阅读关于 OpenCut 的最新动态、发布和项目更新。",
		empty: "暂无文章",
	},
	en: {
		title: "Blog",
		description:
			"Read the latest news and updates about OpenCut, the free and open-source video editor.",
		empty: "No posts yet",
	},
} as const;

export function BlogContent({ posts }: { posts: Post[] }) {
	const { locale } = useI18n();
	const copy = copyByLocale[locale];

	return (
		<BasePage title={copy.title} description={copy.description}>
			{posts.length ? (
				<div className="flex flex-col">
					{posts.map((post) => (
						<div key={post.id} className="flex flex-col">
							<Link href={`/blog/${post.slug}`}>
								<div className="flex h-auto w-full items-center justify-between py-6 opacity-100 hover:opacity-75">
									<div className="flex flex-col gap-2">
										<h2 className="text-xl font-semibold">{post.title}</h2>
										<p className="text-muted-foreground">{post.description}</p>
									</div>
								</div>
							</Link>
							<Separator />
						</div>
					))}
				</div>
			) : (
				<div>{copy.empty}</div>
			)}
		</BasePage>
	);
}
