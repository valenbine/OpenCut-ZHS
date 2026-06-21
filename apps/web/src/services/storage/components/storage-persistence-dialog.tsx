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
import { useI18n } from "@/i18n/language-provider";
import { useStoragePersistence } from "@/services/storage/use-storage-persistence";

export function StoragePersistenceDialog() {
	const { locale } = useI18n();
	const { showDialog, onConfirm, onDismiss } = useStoragePersistence();

	return (
		<Dialog open={showDialog} onOpenChange={(open) => !open && onDismiss()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{locale === "zh-CN" ? "保护你的项目" : "Don't lose your projects"}
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<p className="text-base text-muted-foreground">
						{locale === "zh-CN"
							? "当浏览器存储空间不足时，项目可能会被自动删除。"
							: "Your browser can automatically delete your projects when storage runs low."}
					</p>
					<p className="text-base text-muted-foreground">
						{locale === "zh-CN"
							? "允许 OpenCut 保护这些项目吗？"
							: "Allow OpenCut to protect them?"}
					</p>
				</DialogBody>
				<DialogFooter>
					<Button variant="outline" onClick={onDismiss}>
						{locale === "zh-CN" ? "稍后再说" : "Not now"}
					</Button>
					<Button onClick={onConfirm}>
						{locale === "zh-CN" ? "允许" : "Allow"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
