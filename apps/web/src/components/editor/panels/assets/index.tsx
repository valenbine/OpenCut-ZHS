"use client";

import { Separator } from "@/components/ui/separator";
import { type Tab, useAssetsPanelStore } from "@/components/editor/panels/assets/assets-panel-store";
import { TabBar } from "./tabbar";
import { Captions } from "@/subtitles/components/assets-view";
import { MediaView } from "./views/assets";
import { SettingsView } from "./views/settings";
import { SoundsView } from "@/sounds/components/assets-view";
import { StickersView } from "@/stickers/components/assets-view";
import { TextView } from "@/text/components/assets-view";
import { EffectsView } from "@/effects/components/assets-view";
import { useI18n } from "@/i18n/language-provider";

export function AssetsPanel() {
	const { activeTab } = useAssetsPanelStore();
	const { locale } = useI18n();
	const copy = locale === "zh-CN"
		? {
			transitions: "转场面板即将上线...",
			adjustment: "调节面板即将上线...",
		}
		: {
			transitions: "Transitions view coming soon...",
			adjustment: "Adjustment view coming soon...",
		};

	const viewMap: Record<Tab, React.ReactNode> = {
		media: <MediaView />,
		sounds: <SoundsView />,
		text: <TextView />,
		stickers: <StickersView />,
		effects: <EffectsView />,
		transitions: (
			<div className="text-muted-foreground p-4">{copy.transitions}</div>
		),
		captions: <Captions />,
		adjustment: (
			<div className="text-muted-foreground p-4">{copy.adjustment}</div>
		),
		settings: <SettingsView />,
	};

	return (
		<div className="panel bg-background flex h-full rounded-sm border overflow-hidden">
			<TabBar />
			<Separator orientation="vertical" />
			<div className="flex-1 overflow-hidden">{viewMap[activeTab]}</div>
		</div>
	);
}
