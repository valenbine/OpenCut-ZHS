"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/language-provider";

export function DeleteProjectDialog({
	isOpen,
	onOpenChange,
	onConfirm,
	projectNames,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	projectNames: string[];
}) {
	const count = projectNames.length;
	const isSingle = count === 1;
	const singleName = isSingle ? projectNames[0] : null;
	const { copy, locale } = useI18n();
	const subject = singleName
		? locale === "zh-CN"
			? `“${singleName}”`
			: `"${singleName}"`
		: locale === "zh-CN"
			? `${count} 个项目`
			: `${count} projects`;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					event.stopPropagation();
				}}
			>
				<DialogHeader>
					<DialogTitle>
						{singleName ? (
							copy.dialogs.deleteProject.titleSingle({ name: singleName })
						) : (
							copy.dialogs.deleteProject.titleMultiple({ count })
						)}
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Alert variant="destructive">
						<AlertTitle>{copy.dialogs.deleteProject.warning}</AlertTitle>
						<AlertDescription>
							{copy.dialogs.deleteProject.description({ subject })}
						</AlertDescription>
					</Alert>
					<div className="flex flex-col gap-3">
						<Label className="text-xs font-semibold text-slate-500">
							{copy.dialogs.deleteProject.confirmLabel}
						</Label>
						<Input
							type="text"
							placeholder={copy.dialogs.deleteProject.confirmPlaceholder}
							size="lg"
							variant="destructive"
						/>
					</div>
				</DialogBody>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{copy.common.cancel}
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						{copy.dialogs.deleteProject.confirmButton}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
