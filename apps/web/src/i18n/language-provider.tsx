"use client";

import {
	createContext,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import { useLocalStorage } from "@/services/storage/use-local-storage";

export type Locale = "zh-CN" | "en";

const messages = {
	"zh-CN": {
		common: {
			cancel: "取消",
			close: "关闭",
			more: "更多",
			done: "完成",
			delete: "删除",
			duplicate: "复制",
			rename: "重命名",
			info: "信息",
			untitledProject: "未命名项目",
			createProjectFailed: "创建项目失败",
			loadProjectFailed: "加载项目失败",
			selectMode: "选择模式",
			custom: "自定义",
			saved: "已保存",
			loadingProject: "正在加载项目...",
			exitingProject: "正在退出项目...",
			searchPlaceholder: "搜索项目...",
			tryAgain: "请重试",
			newProjectName: "新建项目",
			themeLight: "切换到浅色模式",
			themeDark: "切换到深色模式",
			loading: "加载中",
			clearInput: "清空输入",
			showPassword: "显示密码",
			hidePassword: "隐藏密码",
			dragToAdjustValue: "拖动以调整数值",
			resetToDefault: "重置为默认值",
		},
		fontPicker: {
			selectFont: "选择字体",
			tabs: {
				all: "全部字体",
				myFonts: "我的字体",
				favorites: "收藏",
			},
			searchPlaceholder: ({ scope }: { scope: string }) => `搜索${scope}...`,
			loading: "正在加载字体...",
			error: "加载字体预览失败。",
			retry: "重试",
			empty: "没有找到字体。",
		},
		header: {
			links: {
				roadmap: "路线图",
				contributors: "贡献者",
				sponsors: "赞助者",
				blog: "博客",
			},
			copySvg: "复制 SVG",
			downloadSvg: "下载 SVG",
			brandAssets: "品牌资源",
			projects: "项目",
			closeMenu: "关闭菜单",
			logoAlt: "OpenCut 标志",
		},
		language: {
			label: "中 / EN",
			ariaLabel: "切换中英文",
		},
		landing: {
			heroTitle: "开源",
			heroHighlight: "视频编辑器",
			heroDescription: "简单易用，同时具备足够强大的编辑能力。支持任意平台。",
			heroCta: "体验早期测试版",
			heroBackgroundAlt: "OpenCut 视频编辑器首页背景",
		},
		footer: {
			description: "以隐私为先的视频编辑器，简单直接，上手轻松。",
			resources: "资源",
			company: "项目",
			links: {
				roadmap: "路线图",
				changelog: "更新日志",
				blog: "博客",
				privacy: "隐私",
				terms: "使用条款",
				contributors: "贡献者",
				sponsors: "赞助者",
				brand: "品牌",
				about: "关于",
			},
			copyright: ({ year }: { year: number }) =>
				`© ${year} OpenCut，保留所有权利`,
		},
		brand: {
			title: "品牌",
			description: "下载 OpenCut 品牌资源，用于你的项目中。",
			guidelinesLink: "阅读品牌使用指南。",
			downloadAll: "全部下载",
			copyAsset: "复制资源",
			assetCopied: "已复制资源",
			sections: {
				symbol: {
					title: "图形标",
					description:
						"当附近已经出现 OpenCut 名称，或可用空间有限时，单独使用图形标。",
				},
				lockup: {
					title: "完整标识",
					description:
						"完整标识由图形标与文字标组成。在大多数横向空间充足的场景中优先使用。",
				},
			},
			labels: {
				symbol: "图形标",
				logo: "标志",
				text: "文字标",
			},
			usageTitle: "使用说明",
			usageDescription:
				"OpenCut 是开源项目，代码可依据其许可证使用。该许可证覆盖代码本身，名称与标志遵循单独的品牌使用规则。你可以说明自己在使用 OpenCut、项目集成了 OpenCut，或产品基于 OpenCut 构建。产品命名、商业宣传和品牌背书相关使用需先获得许可。如有疑问，请联系",
			restrictionsTitle: "限制使用场景",
			restrictions: [
				"在你的产品、服务或域名中使用 OpenCut 名称。",
				"暗示 OpenCut 制作、赞助或认可了你的作品。",
				"在周边商品或商业营销中使用标志或名称。",
				"修改品牌标识。",
			],
		},
		changelog: {
			title: "更新日志",
			description: "查看 OpenCut 的最新变化",
			viewFull: "查看完整更新日志",
			dismiss: "关闭通知",
			copyMarkdown: "复制 Markdown",
			copied: "已复制",
			allReleases: "全部版本",
			older: "更早版本",
			newer: "更新版本",
			sections: {
				new: "新功能",
				improved: "改进",
				fixed: "修复",
				breaking: "破坏性变更",
				technical: "技术细节",
			},
		},
		editorHeader: {
			projectThumbnailAlt: "项目缩略图",
			exitProject: "退出项目",
			shortcuts: "快捷键",
			discord: "Discord",
			renameFailed: "重命名项目失败",
			deleteFailed: "删除项目失败",
		},
		export: {
			button: "导出",
			unknownError: "发生未知错误",
			exportingTitle: "正在导出项目",
			exportTitle: "导出项目",
			format: "格式",
			formatMp4: "MP4 (H.264) - 兼容性更好",
			formatWebm: "WebM (VP9) - 文件更小",
			quality: "质量",
			qualityLow: "低 - 文件最小",
			qualityMedium: "中 - 平衡",
			qualityHigh: "高 - 推荐",
			qualityVeryHigh: "极高 - 文件最大",
			audio: "音频",
			includeAudio: "导出时包含音频",
			cancel: "取消",
			failed: "导出失败",
			copy: "复制",
			retry: "重试",
		},
		projects: {
			home: "首页",
			allProjects: "全部项目",
			viewGrid: "网格视图",
			viewList: "列表视图",
			sortCreated: "创建时间",
			sortModified: "修改时间",
			sortName: "名称",
			sortDuration: "时长",
			selectAll: "全选",
			sortAriaLabel: ({ order }: { order: "asc" | "desc" }) =>
				order === "asc" ? "按升序排序" : "按降序排序",
			newProject: "新建项目",
			newProjectCompact: "新建",
			projectThumbnailAlt: "项目缩略图",
			createdOn: ({ date }: { date: string }) => `创建于 ${date}`,
			projectMenu: "项目菜单",
			createProjectFailed: "创建项目失败",
			noResultsTitle: "没有找到结果",
			noResultsDescription: ({ query }: { query: string }) =>
				`没有找到与“${query}”相关的项目。`,
			clearSearch: "清除搜索",
			noProjectsTitle: "还没有项目",
			noProjectsDescription:
				"开始创建你的第一个项目。导入素材、剪辑内容并导出视频，全部保存在本地。",
			createFirstProject: "创建第一个项目",
		},
		dialogs: {
			deleteProject: {
				titleSingle: ({ name }: { name: string }) => `删除“${name}”？`,
				titleMultiple: ({ count }: { count: number }) => `删除 ${count} 个项目？`,
				warning: "警告",
				description: ({ subject }: { subject: string }) =>
					`这会永久删除${subject}及其关联文件。`,
				confirmLabel: '输入 "DELETE" 以确认',
				confirmPlaceholder: "DELETE",
				confirmButton: "删除项目",
			},
			renameProject: {
				title: "重命名项目",
				newName: "新名称",
				placeholder: "输入新的项目名称",
				confirm: "重命名",
			},
			projectInfo: {
				duration: "时长",
				created: "创建时间",
				modified: "修改时间",
				projectId: "项目 ID",
			},
			shortcuts: {
				title: "键盘快捷键",
				reset: "恢复默认",
				or: "或",
				pressAnyKey: "按下任意组合键...",
				clickToEdit: "点击编辑快捷键",
				conflict: ({ key, action }: { key: string; action: string }) =>
					`按键“${key}”已绑定到“${action}”`,
			},
		},
	},
		en: {
		common: {
			cancel: "Cancel",
			close: "Close",
			more: "More",
			done: "Done",
			delete: "Delete",
			duplicate: "Duplicate",
			rename: "Rename",
			info: "Info",
			untitledProject: "Untitled project",
			createProjectFailed: "Failed to create project",
			loadProjectFailed: "Failed to load project",
			selectMode: "Select a mode",
			custom: "Custom",
			saved: "Saved",
			loadingProject: "Loading project...",
			exitingProject: "Exiting project...",
			searchPlaceholder: "Search projects...",
			tryAgain: "Please try again",
			newProjectName: "New project",
			themeLight: "Switch to light mode",
			themeDark: "Switch to dark mode",
			loading: "Loading",
			clearInput: "Clear input",
			showPassword: "Show password",
			hidePassword: "Hide password",
			dragToAdjustValue: "Drag to adjust value",
			resetToDefault: "Reset to default",
		},
		fontPicker: {
			selectFont: "Select a font",
			tabs: {
				all: "All fonts",
				myFonts: "My fonts",
				favorites: "Favorites",
			},
			searchPlaceholder: ({ scope }: { scope: string }) => `Search ${scope}...`,
			loading: "Loading fonts...",
			error: "Failed to load font previews.",
			retry: "Retry",
			empty: "No fonts found.",
		},
		header: {
			links: {
				roadmap: "Roadmap",
				contributors: "Contributors",
				sponsors: "Sponsors",
				blog: "Blog",
			},
			copySvg: "Copy SVG",
			downloadSvg: "Download SVG",
			brandAssets: "Brand assets",
			projects: "Projects",
			closeMenu: "Close menu",
			logoAlt: "OpenCut Logo",
		},
		language: {
			label: "EN / 中",
			ariaLabel: "Switch language",
		},
		landing: {
			heroTitle: "The open source",
			heroHighlight: "Video editor",
			heroDescription:
				"A simple but powerful video editor that gets the job done. Works on any platform.",
			heroCta: "Try early beta",
			heroBackgroundAlt: "OpenCut video editor landing page background",
		},
		footer: {
			description: "The privacy-first video editor that feels simple to use.",
			resources: "Resources",
			company: "Company",
			links: {
				roadmap: "Roadmap",
				changelog: "Changelog",
				blog: "Blog",
				privacy: "Privacy",
				terms: "Terms of use",
				contributors: "Contributors",
				sponsors: "Sponsors",
				brand: "Brand",
				about: "About",
			},
			copyright: ({ year }: { year: number }) =>
				`© ${year} OpenCut, All Rights Reserved`,
		},
		brand: {
			title: "Brand",
			description: "Download OpenCut brand assets for use in your projects.",
			guidelinesLink: "Read the brand guidelines.",
			downloadAll: "Download all",
			copyAsset: "Copy asset",
			assetCopied: "Asset copied",
			sections: {
				symbol: {
					title: "Symbol",
					description:
						"Use the symbol on its own when the OpenCut name is already present nearby or space is limited.",
				},
				lockup: {
					title: "Lockup",
					description:
						"The full lockup combines the symbol and wordmark. Prefer this in most contexts where you have enough horizontal space.",
				},
			},
			labels: {
				symbol: "Symbol",
				logo: "Logo",
				text: "Text",
			},
			usageTitle: "Usage",
			usageDescription:
				"OpenCut is open source and its code is available under the project license. The name and logo follow separate brand rules. You can say you use OpenCut, that your project integrates with OpenCut, or that it was built on top of OpenCut. Product naming, commercial marketing, and endorsement-related uses require permission first. For anything unclear, reach out at",
			restrictionsTitle: "What is not allowed",
			restrictions: [
				"Using OpenCut in the name of your product, service, or domain.",
				"Implying that OpenCut made, sponsors, or endorses your work.",
				"Using the logo or name on merchandise or commercial marketing.",
				"Modifying the marks.",
			],
		},
		changelog: {
			title: "Changelog",
			description: "See what's new in OpenCut",
			viewFull: "See full changelog",
			dismiss: "Dismiss",
			copyMarkdown: "Copy markdown",
			copied: "Copied!",
			allReleases: "All releases",
			older: "Older",
			newer: "Newer",
			sections: {
				new: "Features",
				improved: "Improvements",
				fixed: "Fixes",
				breaking: "Breaking Changes",
				technical: "Technical details",
			},
		},
		editorHeader: {
			projectThumbnailAlt: "Project thumbnail",
			exitProject: "Exit project",
			shortcuts: "Shortcuts",
			discord: "Discord",
			renameFailed: "Failed to rename project",
			deleteFailed: "Failed to delete project",
		},
		export: {
			button: "Export",
			unknownError: "Unknown error occurred",
			exportingTitle: "Exporting project",
			exportTitle: "Export project",
			format: "Format",
			formatMp4: "MP4 (H.264) - Better compatibility",
			formatWebm: "WebM (VP9) - Smaller file size",
			quality: "Quality",
			qualityLow: "Low - Smallest file size",
			qualityMedium: "Medium - Balanced",
			qualityHigh: "High - Recommended",
			qualityVeryHigh: "Very high - Largest file size",
			audio: "Audio",
			includeAudio: "Include audio in export",
			cancel: "Cancel",
			failed: "Export failed",
			copy: "Copy",
			retry: "Retry",
		},
		projects: {
			home: "Home",
			allProjects: "All projects",
			viewGrid: "Grid view",
			viewList: "List view",
			sortCreated: "Created",
			sortModified: "Modified",
			sortName: "Name",
			sortDuration: "Duration",
			selectAll: "Select all",
			sortAriaLabel: ({ order }: { order: "asc" | "desc" }) =>
				order === "asc" ? "Sort ascending" : "Sort descending",
			newProject: "New project",
			newProjectCompact: "New",
			projectThumbnailAlt: "Project thumbnail",
			createdOn: ({ date }: { date: string }) => `Created ${date}`,
			projectMenu: "Project menu",
			createProjectFailed: "Failed to create project",
			noResultsTitle: "No results found",
			noResultsDescription: ({ query }: { query: string }) =>
				`Your search for "${query}" did not return any results.`,
			clearSearch: "Clear search",
			noProjectsTitle: "No projects yet",
			noProjectsDescription:
				"Start creating your first project. Import media, edit, and export your videos. All privately.",
			createFirstProject: "Create your first project",
		},
		dialogs: {
			deleteProject: {
				titleSingle: ({ name }: { name: string }) => `Delete "${name}"?`,
				titleMultiple: ({ count }: { count: number }) => `Delete ${count} projects?`,
				warning: "Warning",
				description: ({ subject }: { subject: string }) =>
					`This will permanently delete ${subject} and all associated files.`,
				confirmLabel: 'Type "DELETE" to confirm',
				confirmPlaceholder: "DELETE",
				confirmButton: "Delete project",
			},
			renameProject: {
				title: "Rename project",
				newName: "New name",
				placeholder: "Enter a new name",
				confirm: "Rename",
			},
			projectInfo: {
				duration: "Duration",
				created: "Created",
				modified: "Modified",
				projectId: "Project ID",
			},
			shortcuts: {
				title: "Keyboard shortcuts",
				reset: "Reset to default",
				or: "or",
				pressAnyKey: "Press any key combination...",
				clickToEdit: "Click to edit shortcut",
				conflict: ({ key, action }: { key: string; action: string }) =>
					`Key "${key}" is already bound to "${action}"`,
			},
		},
	},
} as const;

type Messages = (typeof messages)[Locale];

interface LanguageContextValue {
	copy: Messages;
	isReady: boolean;
	locale: Locale;
	setLocale: (locale: Locale) => void;
	toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [locale, setStoredLocale, isReady] = useLocalStorage<Locale>({
		key: "opencut-locale",
		defaultValue: "zh-CN",
	});

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = (nextLocale: Locale) => {
		setStoredLocale({ value: nextLocale });
	};

	const toggleLocale = () => {
		setLocale(locale === "zh-CN" ? "en" : "zh-CN");
	};

	return (
		<LanguageContext.Provider
			value={{
				copy: messages[locale],
				isReady,
				locale,
				setLocale,
				toggleLocale,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useI18n() {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error("useI18n must be used within LanguageProvider");
	}

	return context;
}
