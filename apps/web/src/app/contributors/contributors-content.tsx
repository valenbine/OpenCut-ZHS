"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/language-provider";
import { GitHubContributeSection } from "@/components/gitHub-contribute-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { EXTERNAL_TOOLS } from "@/site/external-tools";

export interface Contributor {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
	type: string;
}

export function ContributorsTitle() {
	const { locale } = useI18n();
	return locale === "zh-CN" ? "贡献者" : "Contributors";
}

export function ContributorsDescription() {
	const { locale } = useI18n();
	return locale === "zh-CN"
		? "认识这些正在共同建设 OpenCut 的开发者与贡献者。"
		: "Meet the amazing people who contribute to OpenCut, the free and open-source video editor.";
}

export function ContributorsContent({
	contributors,
	topContributors,
	otherContributors,
	totalContributions,
}: {
	contributors: Contributor[];
	topContributors: Contributor[];
	otherContributors: Contributor[];
	totalContributions: number;
}) {
	const { locale } = useI18n();
	const copy = {
		"zh-CN": {
			contributors: "贡献者",
			contributions: "提交次数",
			topTitle: "核心贡献者",
			topDescription: "持续推动项目向前的人",
			allTitle: "全部贡献者",
			allDescription: "每一位都在让 OpenCut 变得更好",
			externalTitle: "外部工具",
			externalDescription: "我们在构建 OpenCut 时使用的工具",
			communityTitle: "加入社区",
			communityDescription:
				"OpenCut 由像你一样的开发者共同构建。每一次贡献都会让视频编辑变得更易用。",
			toolDescriptions: {
				Marble: "现代无头 CMS，用于内容管理和 OpenCut 博客。",
				Databuddy: "符合 GDPR 的分析与用户洞察工具。",
			},
		},
		en: {
			contributors: "contributors",
			contributions: "contributions",
			topTitle: "Top contributors",
			topDescription: "Leading the way in contributions",
			allTitle: "All contributors",
			allDescription: "Everyone who makes OpenCut better",
			externalTitle: "External tools",
			externalDescription: "Tools we use to build OpenCut",
			communityTitle: "Join the community",
			communityDescription:
				"OpenCut is built by developers like you. Every contribution, no matter how small, helps make video editing more accessible for everyone.",
			toolDescriptions: {
				Marble:
					"Modern headless CMS for content management and the blog for OpenCut",
				Databuddy: "GDPR compliant analytics and user insights for OpenCut",
			},
		},
	}[locale];

	return (
		<>
			<div className="-mt-4 flex items-center justify-center gap-8 text-sm">
				<StatItem value={contributors.length} label={copy.contributors} />
				<StatItem value={totalContributions} label={copy.contributions} />
			</div>

			<div className="mx-auto flex max-w-6xl flex-col gap-20">
				{topContributors.length > 0 && (
					<TopContributorsSection
						contributors={topContributors}
						title={copy.topTitle}
						description={copy.topDescription}
						contributionsLabel={copy.contributions}
					/>
				)}
				{otherContributors.length > 0 && (
					<AllContributorsSection
						contributors={otherContributors}
						title={copy.allTitle}
						description={copy.allDescription}
					/>
				)}
				<ExternalToolsSection
					title={copy.externalTitle}
					description={copy.externalDescription}
					toolDescriptions={copy.toolDescriptions}
				/>
				<GitHubContributeSection
					title={copy.communityTitle}
					description={copy.communityDescription}
				/>
			</div>
		</>
	);
}

function StatItem({ value, label }: { value: number; label: string }) {
	return (
		<div className="flex items-center gap-2">
			<div className="bg-foreground size-2 rounded-full" />
			<span className="font-medium">{value}</span>
			<span className="text-muted-foreground">{label}</span>
		</div>
	);
}

function TopContributorsSection({
	contributors,
	title,
	description,
	contributionsLabel,
}: {
	contributors: Contributor[];
	title: string;
	description: string;
	contributionsLabel: string;
}) {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="text-2xl font-semibold">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>

			<div className="mx-auto flex w-full max-w-xl flex-col justify-center gap-6 md:flex-row">
				{contributors.map((contributor) => (
					<TopContributorCard
						key={contributor.id}
						contributor={contributor}
						contributionsLabel={contributionsLabel}
					/>
				))}
			</div>
		</div>
	);
}

function TopContributorCard({
	contributor,
	contributionsLabel,
}: {
	contributor: Contributor;
	contributionsLabel: string;
}) {
	return (
		<Link
			href={contributor.html_url}
			target="_blank"
			rel="noopener noreferrer"
			className="w-full"
		>
			<Card>
				<CardContent className="flex flex-col gap-6 p-8 text-center">
					<Avatar className="mx-auto size-28">
						<AvatarImage
							src={contributor.avatar_url}
							alt={`${contributor.login}'s avatar`}
						/>
						<AvatarFallback className="text-lg font-semibold">
							{contributor.login.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-2">
						<h3 className="text-xl font-semibold">{contributor.login}</h3>
						<div className="flex items-center justify-center gap-2">
							<span className="font-medium">{contributor.contributions}</span>
							<span className="text-muted-foreground">{contributionsLabel}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

function AllContributorsSection({
	contributors,
	title,
	description,
}: {
	contributors: Contributor[];
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="text-2xl font-semibold">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>

			<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{contributors.map((contributor) => (
					<Link
						key={contributor.id}
						href={contributor.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="opacity-100 hover:opacity-70"
					>
						<div className="flex flex-col items-center gap-2 p-2">
							<Avatar className="size-16">
								<AvatarImage
									src={contributor.avatar_url}
									alt={`${contributor.login}'s avatar`}
								/>
								<AvatarFallback>
									{contributor.login.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="text-center">
								<h3 className="text-sm font-medium">{contributor.login}</h3>
								<p className="text-muted-foreground text-xs">
									{contributor.contributions}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

function ExternalToolsSection({
	title,
	description,
	toolDescriptions,
}: {
	title: string;
	description: string;
	toolDescriptions: Record<string, string>;
}) {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="text-2xl font-semibold">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>

			<div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
				{EXTERNAL_TOOLS.map((tool, index) => (
					<Link
						key={tool.url}
						href={tool.url}
						target="_blank"
						className="block"
						style={{ animationDelay: `${index * 100}ms` }}
					>
						<Card className="h-full">
							<CardContent className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center">
								<tool.icon className="size-8" />
								<div className="flex flex-1 flex-col gap-2">
									<h3 className="text-lg font-semibold">{tool.name}</h3>
									<p className="text-muted-foreground text-sm">
										{toolDescriptions[tool.name] ?? tool.description}
									</p>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
