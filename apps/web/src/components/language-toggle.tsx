"use client";

import { Button } from "./ui/button";
import { cn } from "@/utils/ui";
import { useI18n } from "@/i18n/language-provider";

export function LanguageToggle({ className }: { className?: string }) {
	const { copy, toggleLocale } = useI18n();

	return (
		<Button
			variant="outline"
			size="sm"
			className={cn("h-8 px-2.5 text-xs", className)}
			onClick={toggleLocale}
			aria-label={copy.language.ariaLabel}
		>
			{copy.language.label}
		</Button>
	);
}
