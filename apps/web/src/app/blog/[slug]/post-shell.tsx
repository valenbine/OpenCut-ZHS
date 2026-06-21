"use client";

import Image from "next/image";
import { BasePage } from "@/app/base-page";
import Prose from "@/components/ui/prose";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/language-provider";

export function BlogPostShell({
	title,
	coverImage,
	publishedAt,
	html,
}: {
	title: string;
	coverImage: string;
	publishedAt: string;
	html: string;
}) {
	const { locale } = useI18n();
	const formattedDate = new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(publishedAt));

	return (
		<BasePage>
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="flex items-center justify-center">
					<time dateTime={publishedAt}>{formattedDate}</time>
				</div>
				<h1 className="text-5xl font-bold tracking-tight text-center md:text-4xl">
					{title}
				</h1>
				{coverImage && (
					<div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg">
						<Image
							src={coverImage}
							alt={title}
							loading="eager"
							fill
							className="rounded-lg object-cover"
						/>
					</div>
				)}
			</div>
			<Separator />
			<section>
				<Prose html={html} />
			</section>
		</BasePage>
	);
}
