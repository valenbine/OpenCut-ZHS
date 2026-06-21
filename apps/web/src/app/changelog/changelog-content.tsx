"use client";

import { BasePage } from "@/app/base-page";
import { Separator } from "@/components/ui/separator";
import {
	ReleaseArticle,
	ReleaseChanges,
	ReleaseDescription,
	ReleaseMeta,
	ReleaseTitle,
} from "@/changelog/components/release";
import type { Release } from "@/changelog/utils";
import { useI18n } from "@/i18n/language-provider";

export function ChangelogContent({ releases }: { releases: Release[] }) {
	const { copy } = useI18n();

	return (
		<BasePage title={copy.changelog.title} description={copy.changelog.description}>
			<div className="mx-auto w-full max-w-3xl">
				<div className="relative">
					<div
						aria-hidden
						className="absolute top-2 bottom-0 left-[5px] hidden w-px bg-border sm:block"
					/>

					<div className="flex flex-col">
						{releases.map((release, releaseIndex) => (
							<div key={release.version} className="flex flex-col">
								<ReleaseArticle variant="list" isLatest={release.isLatest}>
									<ReleaseMeta release={release} />
									<div className="flex flex-col gap-4">
										<ReleaseTitle as="h2" href={`/changelog/${release.version}`}>
											{release.title}
										</ReleaseTitle>
										{release.description && (
											<ReleaseDescription>{release.description}</ReleaseDescription>
										)}
									</div>
									<ReleaseChanges release={release} />
								</ReleaseArticle>
								{releaseIndex < releases.length - 1 && (
									<Separator className="my-10 sm:ml-1.5" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</BasePage>
	);
}
