"use client";

import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/i18n/language-provider";
import { cn } from "@/utils/ui";

function Spinner({ className, ...props }: Omit<HugeiconsIconProps, "icon">) {
	const { copy } = useI18n();

	return (
		<HugeiconsIcon
			icon={Loading03Icon}
			role="status"
			aria-label={copy.common.loading}
			className={cn("size-4 animate-spin", className)}
			{...props}
		/>
	);
}

export { Spinner };
