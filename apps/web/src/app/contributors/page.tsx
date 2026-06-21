import type { Metadata } from "next";
import { BasePage } from "../base-page";
import {
	ContributorsContent,
	ContributorsDescription,
	ContributorsTitle,
	type Contributor,
} from "./contributors-content";

function isContributor(value: unknown): value is Contributor {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	return (
		typeof Reflect.get(value, "id") === "number" &&
		typeof Reflect.get(value, "login") === "string" &&
		typeof Reflect.get(value, "avatar_url") === "string" &&
		typeof Reflect.get(value, "html_url") === "string" &&
		typeof Reflect.get(value, "contributions") === "number" &&
		typeof Reflect.get(value, "type") === "string"
	);
}

export const metadata: Metadata = {
	title: "贡献者 - OpenCut",
	description:
		"认识为 OpenCut 做出贡献的人们，这是一款免费开源的视频编辑器。",
	openGraph: {
		title: "贡献者 - OpenCut",
		description:
			"认识为 OpenCut 做出贡献的人们，这是一款免费开源的视频编辑器。",
		type: "website",
	},
};

async function getContributors(): Promise<Contributor[]> {
	try {
		const response = await fetch(
			"https://api.github.com/repos/OpenCut-app/OpenCut/contributors?per_page=100",
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					"User-Agent": "OpenCut-Web-App",
				},
				next: { revalidate: 600 }, // 10 minutes
			},
		);

		if (!response.ok) {
			console.error("Failed to fetch contributors");
			return [];
		}

		const data: unknown = await response.json();

		if (!Array.isArray(data)) {
			return [];
		}

		const filteredContributors = data.filter(isContributor).filter(
			(contributor) => contributor.type === "User",
		);

		return filteredContributors;
	} catch (error) {
		console.error("Error fetching contributors:", error);
		return [];
	}
}

export default async function ContributorsPage() {
	const contributors = await getContributors();
	const topContributors = contributors.slice(0, 2);
	const otherContributors = contributors.slice(2);
	const totalContributions = contributors.reduce(
		(sum, c) => sum + c.contributions,
		0,
	);

	return (
		<BasePage
			title={<ContributorsTitle />}
			description={<ContributorsDescription />}
		>
			<ContributorsContent
				contributors={contributors}
				topContributors={topContributors}
				otherContributors={otherContributors}
				totalContributions={totalContributions}
			/>
		</BasePage>
	);
}
