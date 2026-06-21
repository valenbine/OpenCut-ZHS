"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check, ListCheck, Trash2 } from "lucide-react";
import { cn } from "@/utils/ui";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { canDeleteScene, getMainScene } from "@/timeline/scenes";
import { toast } from "sonner";
import { useEditor } from "@/editor/use-editor";
import { useI18n } from "@/i18n/language-provider";

export function ScenesView({ children }: { children: React.ReactNode }) {
	const editor = useEditor();
	const { locale } = useI18n();
	const scenes = editor.scenes.getScenes();
	const currentScene = editor.scenes.getActiveScene();
	const [isSelectMode, setIsSelectMode] = useState(false);
	const [selectedScenes, setSelectedScenes] = useState<Set<string>>(new Set());
	const copy = {
		"zh-CN": {
			title: "场景",
			selectTitle: (count: number) => `选择场景（${count}）`,
			selectDescription: "选择要删除的场景",
			defaultDescription: "在项目中的不同场景之间切换",
			cancel: "取消",
			select: "选择",
			delete: (count: number) => `删除（${count}）`,
			empty: "暂无场景",
			deleteFailed: "删除场景失败",
			deleteTitle: "删除场景",
			deleteDescription: (count: number) =>
				`确定要删除 ${count} 个场景吗？此操作无法撤销。`,
		},
		en: {
			title: "Scenes",
			selectTitle: (count: number) => `Select scenes (${count})`,
			selectDescription: "Select scenes to delete",
			defaultDescription: "Switch between scenes in your project",
			cancel: "Cancel",
			select: "Select",
			delete: (count: number) => `Delete (${count})`,
			empty: "No scenes available",
			deleteFailed: "Failed to delete scene",
			deleteTitle: "Delete Scenes",
			deleteDescription: (count: number) =>
				`Are you sure you want to delete ${count} scene${count === 1 ? "" : "s"}? This action cannot be undone.`,
		},
	}[locale];

	const getSceneLabel = ({ name }: { name: string }) =>
		locale === "zh-CN" && name === "Main Scene" ? "主场景" : name;

	const handleSceneSwitch = async (sceneId: string) => {
		if (isSelectMode) {
			toggleSceneSelection({ sceneId });
			return;
		}

		try {
			await editor.scenes.switchToScene({ sceneId });
		} catch (error) {
			console.error("Failed to switch scene:", error);
		}
	};

	const toggleSceneSelection = ({ sceneId }: { sceneId: string }) => {
		setSelectedScenes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(sceneId)) {
				newSet.delete(sceneId);
			} else {
				newSet.add(sceneId);
			}
			return newSet;
		});
	};

	const handleSelectMode = () => {
		setIsSelectMode(!isSelectMode);
		setSelectedScenes(new Set());
	};

	const handleDeleteSelected = async () => {
		for (const sceneId of selectedScenes) {
			const scene = scenes.find((scene) => scene.id === sceneId);
			if (!scene) {
				continue;
			}

			const { canDelete, reason } = canDeleteScene({ scene });
			if (!canDelete) {
				toast.error(
					reason === "Cannot delete main scene" && locale === "zh-CN"
						? "不能删除主场景"
						: reason || copy.deleteFailed,
				);
				continue;
			}

			try {
				await editor.scenes.deleteScene({ sceneId });
			} catch (error) {
				console.error("Failed to delete scene:", error);
			}
		}
		setSelectedScenes(new Set());
		setIsSelectMode(false);
	};

	const isMainSceneSelected = (() => {
		const mainScene = getMainScene({ scenes });
		return Boolean(mainScene?.id && selectedScenes.has(mainScene.id));
	})();

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{isSelectMode ? copy.selectTitle(selectedScenes.size) : copy.title}
					</SheetTitle>
					<SheetDescription>
						{isSelectMode ? copy.selectDescription : copy.defaultDescription}
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 py-4">
					<div className="flex items-center gap-2">
						<Button
							className="rounded-md"
							variant={isSelectMode ? "default" : "outline"}
							size="sm"
							onClick={handleSelectMode}
						>
							<ListCheck />
							{isSelectMode ? copy.cancel : copy.select}
						</Button>
						{isSelectMode && (
							<DeleteDialog
								count={selectedScenes.size}
								onDelete={handleDeleteSelected}
								disabled={isMainSceneSelected}
								trigger={
									<Button
										className="rounded-md"
										variant="destructive"
										disabled={isMainSceneSelected}
										size="sm"
									>
										<Trash2 />
										{copy.delete(selectedScenes.size)}
									</Button>
								}
							/>
						)}
					</div>
					{scenes.length === 0 ? (
						<div className="text-muted-foreground text-sm">{copy.empty}</div>
					) : (
						<div className="space-y-2">
							{scenes.map((scene) => (
								<Button
									key={scene.id}
									variant="outline"
									className={cn(
										"w-full justify-between font-normal",
										currentScene?.id === scene.id &&
											!isSelectMode &&
											"border-primary !text-primary",
										isSelectMode &&
											selectedScenes.has(scene.id) &&
											"bg-accent border-foreground/30",
									)}
									onClick={() => handleSceneSwitch(scene.id)}
								>
									<span>{getSceneLabel({ name: scene.name })}</span>
									<div className="flex items-center gap-2">
										{((isSelectMode && selectedScenes.has(scene.id)) ||
											(!isSelectMode && currentScene?.id === scene.id)) && (
											<Check className="size-4" />
										)}
									</div>
								</Button>
							))}
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}

function DeleteDialog({
	count,
	onDelete,
	disabled,
	trigger,
}: {
	count: number;
	onDelete: () => void;
	disabled?: boolean;
	trigger: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const { locale } = useI18n();
	const copy = {
		"zh-CN": {
			title: "删除场景",
			description: `确定要删除 ${count} 个场景吗？此操作无法撤销。`,
			cancel: "取消",
			confirm: "删除",
		},
		en: {
			title: "Delete Scenes",
			description: `Are you sure you want to delete ${count} scene${count === 1 ? "" : "s"}? This action cannot be undone.`,
			cancel: "Cancel",
			confirm: "Delete",
		},
	}[locale];

	const handleDelete = () => {
		onDelete();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{copy.title}</DialogTitle>
					<DialogDescription>{copy.description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						{copy.cancel}
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={disabled}
					>
						{copy.confirm}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
