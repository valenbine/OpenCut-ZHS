"use client";

import Link from "next/link";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { DEFAULT_LOGO_URL } from "@/site/brand";
import { SOCIAL_LINKS } from "@/site/social";
import { useI18n } from "@/i18n/language-provider";

type Category = "resources" | "company";

interface FooterLink {
	label: string;
	href: string;
}

type CategoryLinks = Record<Category, FooterLink[]>;
const categories: Category[] = ["resources", "company"];

export function Footer() {
	const { copy } = useI18n();

	const links: CategoryLinks = {
		resources: [
			{ label: copy.footer.links.roadmap, href: "/roadmap" },
			{ label: copy.footer.links.changelog, href: "/changelog" },
			{ label: copy.footer.links.blog, href: "/blog" },
			{ label: copy.footer.links.privacy, href: "/privacy" },
			{ label: copy.footer.links.terms, href: "/terms" },
		],
		company: [
			{ label: copy.footer.links.contributors, href: "/contributors" },
			{ label: copy.footer.links.sponsors, href: "/sponsors" },
			{ label: copy.footer.links.brand, href: "/brand" },
			{ label: copy.footer.links.about, href: `${SOCIAL_LINKS.github}/blob/main/README.md` },
		],
	};

	const categoryLabels: Record<Category, string> = {
		resources: copy.footer.resources,
		company: copy.footer.company,
	};

	return (
		<footer className="bg-background border-t">
			<div className="mx-auto max-w-5xl px-8 py-10">
				<div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-2">
					{/* Brand Section */}
					<div className="max-w-sm md:col-span-1">
						<div className="mb-4 flex items-center justify-start gap-2">
							<Image
								src={DEFAULT_LOGO_URL}
								alt="OpenCut"
								width={24}
								height={24}
								className="invert dark:invert-0"
							/>
							<span className="text-lg font-bold">OpenCut</span>
						</div>
						<p className="text-muted-foreground mb-5 text-sm md:text-left">
							{copy.footer.description}
						</p>
						<div className="flex justify-start gap-3">
							<Link
								href={SOCIAL_LINKS.github}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaGithub className="size-5" />
							</Link>
							<Link
								href={SOCIAL_LINKS.x}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<RiTwitterXLine className="size-5" />
							</Link>
							<Link
								href={SOCIAL_LINKS.discord}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<RiDiscordFill className="size-5" />
							</Link>
						</div>
					</div>

					<div className="flex items-start justify-start gap-12 py-2">
						{categories.map((category) => (
							<div key={category} className="flex flex-col gap-2">
								<h3 className="text-foreground font-semibold">
									{categoryLabels[category]}
								</h3>
								<ul className="space-y-2 text-sm">
									{links[category].map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-muted-foreground hover:text-foreground transition-colors"
												target={
													link.href.startsWith("http") ? "_blank" : undefined
												}
												rel={
													link.href.startsWith("http")
														? "noopener noreferrer"
														: undefined
												}
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Bottom Section */}
				<div className="flex flex-col items-start justify-between gap-4 pt-2 md:flex-row">
					<div className="text-muted-foreground flex items-center gap-4 text-sm">
						<span>{copy.footer.copyright({ year: new Date().getFullYear() })}</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
