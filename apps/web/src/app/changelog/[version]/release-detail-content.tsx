"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BasePage } from "@/app/base-page";
import { CopyMarkdownButton } from "@/changelog/components/copy-markdown-button";
import {
	ReleaseArticle,
	ReleaseChanges,
	ReleaseDescription,
	ReleaseMeta,
	ReleaseTitle,
} from "@/changelog/components/release";
import type { Release } from "@/changelog/utils";
import { useI18n } from "@/i18n/language-provider";

export function ReleaseDetailContent({
	release,
	newer,
	older,
}: {
	release: Release;
	newer: Release | null;
	older: Release | null;
}) {
	const { copy } = useI18n();

	return (
		<BasePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
				<Link
					href="/changelog"
					className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
				>
					<ChevronLeftIcon className="size-4" />
					{copy.changelog.allReleases}
				</Link>

				<ReleaseArticle variant="detail">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<ReleaseMeta release={release} />
							<CopyMarkdownButton
								description={release.description}
								changes={release.changes}
							/>
						</div>
						<ReleaseTitle as="h1">{release.title}</ReleaseTitle>
						{release.description && (
							<ReleaseDescription>{release.description}</ReleaseDescription>
						)}
					</div>
					<ReleaseChanges release={release} />
				</ReleaseArticle>

				<nav className="flex items-center justify-between border-t pt-8">
					{older ? (
						<Link
							href={`/changelog/${older.version}`}
							className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
						>
							<ChevronLeftIcon className="size-4" />
							<div className="flex flex-col">
								<span className="text-xs text-muted-foreground/60">
									{copy.changelog.older}
								</span>
								<span className="font-medium">{older.title}</span>
							</div>
						</Link>
					) : (
						<div />
					)}
					{newer ? (
						<Link
							href={`/changelog/${newer.version}`}
							className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground"
						>
							<div className="flex flex-col">
								<span className="text-xs text-muted-foreground/60">
									{copy.changelog.newer}
								</span>
								<span className="font-medium">{newer.title}</span>
							</div>
							<ChevronRightIcon className="size-4" />
						</Link>
					) : (
						<div />
					)}
				</nav>
			</div>
		</BasePage>
	);
}
