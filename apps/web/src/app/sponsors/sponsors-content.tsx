"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { SPONSORS, type Sponsor } from "@/site/sponsors";
import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/utils/ui";

export function SponsorsTitle() {
	const { locale } = useI18n();
	return locale === "zh-CN" ? "赞助者" : "Sponsors";
}

export function SponsorsDescription() {
	const { locale } = useI18n();
	return locale === "zh-CN"
		? "支持 OpenCut，一起推进以隐私为先的视频编辑体验。"
		: "Support OpenCut and help us build the future of privacy-first video editing.";
}

export function SponsorsContent() {
	return (
		<div className="grid gap-6 sm:grid-cols-2">
			{SPONSORS.map((sponsor) => (
				<SponsorCard key={sponsor.name} sponsor={sponsor} />
			))}
		</div>
	);
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
	const { locale } = useI18n();
	const descriptions: Record<string, string> = {
		"zh-CN": {
			"Fal.ai": "将生成式图像、视频和音频模型整合在同一平台。",
			Vercel: "我们用来部署和托管 OpenCut 的平台。",
		},
		en: {
			"Fal.ai": "Generative image, video, and audio models all in one place.",
			Vercel: "Platform where we deploy and host OpenCut.",
		},
	}[locale];

	return (
		<Link
			href={sponsor.url}
			target="_blank"
			rel="noopener noreferrer"
			className="size-full"
		>
			<Card className="h-full">
				<CardContent className="flex h-full flex-col justify-center gap-8 p-8">
					<Image
						src={sponsor.logo}
						alt={`${sponsor.name} logo`}
						width={50}
						height={50}
						className={cn(
							"object-contain",
							sponsor.invertOnDark && "invert-0 dark:invert",
						)}
					/>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<h3 className="text-xl font-semibold group-hover:underline">
								{sponsor.name}
							</h3>
			<HugeiconsIcon
				icon={LinkSquare02Icon}
				className="text-muted-foreground size-4"
			/>
						</div>
						<p className="text-muted-foreground">
							{descriptions[sponsor.name] ?? sponsor.description}
						</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
