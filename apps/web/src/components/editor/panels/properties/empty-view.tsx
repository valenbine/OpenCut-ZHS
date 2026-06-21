import { HugeiconsIcon } from "@hugeicons/react";
import { Settings05Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/i18n/language-provider";

export function EmptyView() {
	const { locale } = useI18n();
	const copy = locale === "zh-CN"
		? {
			title: "这里还是空的",
			description: "点击时间线中的元素即可编辑它的属性",
		}
		: {
			title: "It's empty here",
			description: "Click an element on the timeline to edit its properties",
		};

	return (
		<div className="bg-background flex h-full flex-col items-center justify-center gap-3 p-4">
			<HugeiconsIcon
				icon={Settings05Icon}
				className="text-muted-foreground/75 size-10"
				strokeWidth={1}
			/>
			<div className="flex flex-col gap-2 text-center">
				<p className="text-lg font-medium ">{copy.title}</p>
				<p className="text-muted-foreground text-sm text-balance">
					{copy.description}
				</p>
			</div>
		</div>
	);
}
