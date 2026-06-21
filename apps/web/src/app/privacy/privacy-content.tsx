"use client";

import { BasePage } from "@/app/base-page";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/language-provider";
import { SOCIAL_LINKS } from "@/site/social";

const copyByLocale = {
	"zh-CN": {
		title: "隐私政策",
		description: "了解我们如何处理你的数据与隐私。如有疑问，请联系我们。",
		quickSummary: "快速摘要",
		headline: "你的内容始终保留在你的设备上。",
		summaryItems: [
			"基础编辑完全在浏览器本地完成，我们无法看到你的文件。",
			"自动字幕等 AI 功能同样在浏览器本地运行，不会上传任何内容。",
			"OpenCut 当前不要求注册账号或登录。",
			"项目数据保存在你的设备上，服务器上没有副本。",
			"我们使用匿名统计改进产品，不会跟踪你的个人视频内容。",
			"你可以随时在浏览器中清除本地数据。",
			"我们不会出售或共享你的数据。",
		],
		questions: "有问题？请发邮件至",
		sections: [
			{
				title: "我们如何处理你的内容",
				paragraphs: [
					"所有编辑与处理都在你的设备本地完成。我们不会上传、存储，也无法访问你的视频或音频文件。你的内容始终由你掌控。自动字幕等 AI 功能也在浏览器中通过本地模型运行。",
				],
			},
			{
				title: "账号与认证",
				paragraphs: [
					"OpenCut 当前不提供用户账号、登录或 Google 登录。",
					"当前没有账号系统，因此我们不会收集账号邮箱、个人资料信息或 OAuth 身份数据。",
					"你的项目不会存储在我们的服务器上。项目名称、缩略图和创建日期等数据都通过 IndexedDB 保存在你的浏览器本地。",
				],
			},
			{
				title: "统计分析",
				paragraphs: [
					"我们使用 Databuddy 统计匿名访问量，不跟踪点击、交互行为或你在编辑器中的具体使用方式。",
					"我们不会收集个人信息，也不会存储可识别你身份的数据。",
				],
			},
			{
				title: "本地存储与 Cookies",
				paragraphs: ["我们使用浏览器本地存储和 IndexedDB 来："],
				list: [
					"在你的设备本地保存项目。",
					"记住编辑器偏好与设置。",
					"保存跨会话所需的应用状态。",
				],
				footnote: "所有数据都保留在你的设备上，你可以随时在浏览器设置中清除。",
			},
			{
				title: "第三方服务",
				paragraphs: ["OpenCut 当前集成以下服务："],
				list: [
					"Vercel：用于托管与内容分发。",
					"Databuddy：用于匿名统计。",
				],
			},
			{
				title: "你的权利",
				paragraphs: ["你对自己的数据拥有完整控制权："],
				list: [
					"当前使用 OpenCut 不需要账号。",
					"清除本地存储即可移除所有已保存项目。",
					"你可以随时就隐私问题联系我们。",
				],
			},
			{
				title: "开源透明度",
				paragraphs: [
					"OpenCut 完全开源。你可以查看代码，确认我们如何处理数据，也可以按需自行部署。",
				],
				github: true,
			},
			{
				title: "联系我们",
				paragraphs: [
					"如果你对本隐私政策或数据处理方式有疑问，可以在 GitHub 仓库提交 issue、发送邮件到 oss@opencut.app，或通过 X 联系我们。",
				],
				contact: true,
			},
		],
		lastUpdated: "最后更新：2026 年 3 月 15 日",
	},
	en: {
		title: "Privacy policy",
		description:
			"Learn how we handle your data and privacy. Contact us if you have any questions.",
		quickSummary: "Quick summary",
		headline: "Your content never leaves your device.",
		summaryItems: [
			"Basic editing happens locally in your browser and we never see your files.",
			"AI features like auto captions also run locally in your browser and nothing is uploaded.",
			"OpenCut does not currently require an account or login.",
			"Project data stays on your device, not our servers.",
			"We use anonymized analytics to improve the app and do not track personal video content.",
			"You can clear local data from your browser at any time.",
			"We do not sell or share your data with anyone.",
		],
		questions: "Questions? Email us at",
		sections: [
			{
				title: "How We Handle Your Content",
				paragraphs: [
					"All editing and processing happens locally on your device. We never upload, store, or access your video or audio files. Your content stays private and under your control. AI-powered features like auto captions also run in your browser with on-device models.",
				],
			},
			{
				title: "Accounts & Authentication",
				paragraphs: [
					"OpenCut does not currently offer user accounts, login, or Google sign-in.",
					"Because there is no account system today, we do not collect account emails, profile information, or OAuth identity data.",
					"Your projects are never stored on our servers. Project names, thumbnails, and creation dates are stored locally in your browser using IndexedDB.",
				],
			},
			{
				title: "Analytics",
				paragraphs: [
					"We use Databuddy for basic anonymized visitor counts. We do not track clicks, interactions, or how you use the editor.",
					"No personal information is collected and no data that could identify you is stored.",
				],
			},
			{
				title: "Local Storage & Cookies",
				paragraphs: ["We use browser local storage and IndexedDB to:"],
				list: [
					"Save your projects locally on your device.",
					"Remember your editor preferences and settings.",
					"Store app state needed for the editor to work between sessions.",
				],
				footnote:
					"All data stays on your device and can be cleared at any time through your browser settings.",
			},
			{
				title: "Third-Party Services",
				paragraphs: ["OpenCut integrates with these services:"],
				list: [
					"Vercel: Hosting and content delivery.",
					"Databuddy: Anonymized analytics.",
				],
			},
			{
				title: "Your Rights",
				paragraphs: ["You have complete control over your data:"],
				list: [
					"No account is required to use OpenCut today.",
					"Clear local storage to remove all saved projects.",
					"Contact us with any privacy concerns.",
				],
			},
			{
				title: "Open Source Transparency",
				paragraphs: [
					"OpenCut is completely open source. You can review the code, verify how we handle data, and self-host the application if you prefer.",
				],
				github: true,
			},
			{
				title: "Contact Us",
				paragraphs: [
					"If you have questions about this policy or how we handle your data, open an issue on our GitHub repository, email oss@opencut.app, or reach out on X.",
				],
				contact: true,
			},
		],
		lastUpdated: "Last updated: March 15, 2026",
	},
} as const;

export function PrivacyContent() {
	const { locale } = useI18n();
	const copy = copyByLocale[locale];

	return (
		<BasePage title={copy.title} description={copy.description}>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="quick-summary" className="rounded-2xl border px-5">
					<AccordionTrigger className="no-underline!">
						{copy.quickSummary}
					</AccordionTrigger>
					<AccordionContent>
						<h3 className="mb-3 text-lg font-medium">{copy.headline}</h3>
						<ol className="list-decimal space-y-2 pl-6">
							{copy.summaryItems.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ol>
						<p className="mt-4">
							{copy.questions}{" "}
							<a href="mailto:oss@opencut.app" className="text-primary hover:underline">
								oss@opencut.app
							</a>
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{copy.sections.map((section) => (
				<section key={section.title} className="flex flex-col gap-3">
					<h2 className="text-2xl font-semibold">{section.title}</h2>
					{section.paragraphs.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
					{section.list && (
						<ul className="list-disc space-y-2 pl-6">
							{section.list.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					)}
					{section.footnote && <p>{section.footnote}</p>}
					{section.github && (
						<p>
							<a
								href={SOCIAL_LINKS.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								GitHub
							</a>
						</p>
					)}
					{section.contact && (
						<p>
							<a
								href={`${SOCIAL_LINKS.github}/issues`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								GitHub
							</a>{" "}
							<a href="mailto:oss@opencut.app" className="text-primary hover:underline">
								oss@opencut.app
							</a>{" "}
							<a
								href={SOCIAL_LINKS.x}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								X
							</a>
						</p>
					)}
				</section>
			))}

			<Separator />
			<p className="text-muted-foreground text-sm">{copy.lastUpdated}</p>
		</BasePage>
	);
}
