"use client";

import { PlusSignIcon, RulerIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/language-provider";
import type { GuideDefinition } from "@/guides/types";

function CustomGuideOptions() {
	const { locale } = useI18n();

	return (
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="flex-1">
				<HugeiconsIcon icon={PlusSignIcon} />
				{locale === "zh-CN" ? "添加参考线" : "Add guide line"}
			</Button>
		</div>
	);
}

export const customGuide = {
	id: "custom",
	label: "Custom",
	renderPreview: () => <HugeiconsIcon size={16} icon={RulerIcon} />,
	renderTriggerIcon: () => <HugeiconsIcon icon={RulerIcon} />,
	renderOverlay: () => null,
	renderOptions: () => <CustomGuideOptions />,
} as const satisfies GuideDefinition;
