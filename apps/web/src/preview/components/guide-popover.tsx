"use client";

import { AnimatePresence, motion } from "motion/react";
import { GUIDE_REGISTRY, getGuideById } from "@/guides";
import { usePreviewStore } from "@/preview/preview-store";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/i18n/language-provider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/ui";

export function GridPopover({ children }: { children: React.ReactNode }) {
	const { locale } = useI18n();
	const activeGuide = usePreviewStore((state) => state.activeGuide);
	const toggleGuide = usePreviewStore((state) => state.toggleGuide);
	const activeGuideDef = getGuideById(activeGuide);
	const options = activeGuideDef?.renderOptions?.();

	return (
		<Popover>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent sideOffset={8} className="w-60 px-0">
				<div className="flex flex-col gap-2 px-4">
					<Label>{locale === "zh-CN" ? "参考线" : "Guides"}</Label>
					<div className="grid grid-cols-3 gap-1">
						{GUIDE_REGISTRY.map((guide) => (
							<GridItem
								key={guide.id}
								label={getGuideLabel({ id: guide.id, fallback: guide.label, locale })}
								preview={guide.renderPreview()}
								isSelected={activeGuide === guide.id}
								onClick={() => toggleGuide(guide.id)}
							/>
						))}
					</div>
				</div>
				<AnimatePresence>
					{options && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								height: { type: "spring", duration: 0.2, bounce: 0 },
								opacity: { duration: 0.2 },
							}}
							className="overflow-hidden"
						>
							<Separator className="my-3" />
							<div className="px-4">{options}</div>
						</motion.div>
					)}
				</AnimatePresence>
			</PopoverContent>
		</Popover>
	);
}

function getGuideLabel({
	id,
	fallback,
	locale,
}: {
	id: string;
	fallback: string;
	locale: "zh-CN" | "en";
}) {
	if (locale !== "zh-CN") return fallback;

	switch (id) {
		case "grid":
			return "网格";
		case "ig-reels":
			return "Reels";
		case "yt-shorts":
			return "Shorts";
		case "spotlight":
			return "Spotlight";
		case "tiktok":
			return "TikTok";
		case "custom":
			return "自定义";
		default:
			return fallback;
	}
}

function GridItem({
	label,
	preview,
	isSelected,
	onClick,
}: {
	label: string;
	preview: React.ReactNode;
	isSelected?: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={isSelected}
			className={cn(
				"flex cursor-pointer rounded-sm flex-col gap-2 px-1.5 py-1.5 hover:bg-foreground/5",
				isSelected && "bg-primary/5! text-primary",
			)}
		>
			<div
				className={cn(
					"aspect-video bg-foreground/5 flex items-center justify-center rounded-sm",
					isSelected && "bg-primary/5!",
				)}
			>
				{preview}
			</div>
			<span
				className={cn(
					"text-xs",
					isSelected ? "text-primary" : "text-muted-foreground",
				)}
			>
				{label}
			</span>
		</button>
	);
}
