"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/editor/use-editor";
import { useElementSelection } from "@/timeline/hooks/element/use-element-selection";
import { usePropertiesStore } from "./stores/properties-store";
import { getPropertiesConfig } from "./registry";
import { cn } from "@/utils/ui";
import { EmptyView } from "./empty-view";
import { useI18n } from "@/i18n/language-provider";

export function PropertiesPanel() {
	const editor = useEditor();
	const { locale } = useI18n();
	useEditor((e) => e.scenes.getActiveSceneOrNull());
	useEditor((e) => e.media.getAssets());
	const { selectedElements } = useElementSelection();
	const { activeTabPerType, setActiveTab } = usePropertiesStore();
	const labelsByLocale = {
		"zh-CN": {
			transform: "变换",
			blending: "混合",
			audio: "音频",
			speed: "速度",
			masks: "蒙版",
			effects: "特效",
			text: "文字",
			graphic: "图形",
			multiSelected: ({ count }: { count: number }) => `已选择 ${count} 个元素`,
		},
		en: {
			transform: "Transform",
			blending: "Blending",
			audio: "Audio",
			speed: "Speed",
			masks: "Masks",
			effects: "Effects",
			text: "Text",
			graphic: "Graphic",
			multiSelected: ({ count }: { count: number }) => `${count} elements selected.`,
		},
	} as const;
	const labels = labelsByLocale[locale];
	const getTabLabel = ({
		tabId,
		fallback,
	}: {
		tabId: string;
		fallback: string;
	}) => {
		switch (tabId) {
			case "transform":
				return labels.transform;
			case "blending":
				return labels.blending;
			case "audio":
				return labels.audio;
			case "speed":
				return labels.speed;
			case "masks":
				return labels.masks;
			case "effects":
				return labels.effects;
			case "text":
				return labels.text;
			case "graphic":
				return labels.graphic;
			default:
				return fallback;
		}
	};

	if (selectedElements.length === 0) {
		return (
			<div className="panel bg-background flex h-full flex-col items-center justify-center overflow-hidden rounded-sm border">
				<EmptyView />
			</div>
		);
	}

	if (selectedElements.length > 1) {
		return (
			<div className="panel bg-background flex h-full flex-col items-center justify-center overflow-hidden rounded-sm border">
				<p className="text-muted-foreground text-sm">
					{labels.multiSelected({ count: selectedElements.length })}
				</p>
			</div>
		);
	}

	const mediaAssets = editor.media.getAssets();

	const elementsWithTracks = editor.timeline.getElementsWithTracks({
		elements: selectedElements,
	});
	const elementWithTrack = elementsWithTracks[0];

	if (!elementWithTrack) return null;

	const { element, track } = elementWithTrack;
	const config = getPropertiesConfig({ element, mediaAssets });
	const visibleTabs = config.tabs;

	const storedTabId = activeTabPerType[element.type];
	const isStoredTabVisible = visibleTabs.some((t) => t.id === storedTabId);
	const activeTabId = isStoredTabVisible ? storedTabId : config.defaultTab;
	const activeTab =
		visibleTabs.find((t) => t.id === activeTabId) ?? visibleTabs[0];

	if (!activeTab) return null;

	return (
		<div className="panel bg-background flex h-full overflow-hidden rounded-sm border">
			<TooltipProvider delayDuration={0}>
				<div className="flex shrink-0 flex-col gap-0.5 border-r p-1 scrollbar-hidden overflow-y-auto">
					{visibleTabs.map((tab) => {
						const label = getTabLabel({ tabId: tab.id, fallback: tab.label });
						return (
						<Tooltip key={tab.id}>
							<TooltipTrigger asChild>
								<Button
									variant={tab.id === activeTab.id ? "secondary" : "ghost"}
									size="icon"
									onClick={() =>
										setActiveTab({
											elementType: element.type,
											tabId: tab.id,
										})
									}
									aria-label={label}
									className={cn(
										"shrink-0",
										"h-8 w-8",
										tab.id !== activeTab.id && "text-muted-foreground",
									)}
								>
									{tab.icon}
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right">{label}</TooltipContent>
						</Tooltip>
						);
					})}
				</div>
			</TooltipProvider>
			<ScrollArea className="flex-1 scrollbar-hidden">
				{activeTab.content({ trackId: track.id })}
			</ScrollArea>
		</div>
	);
}
