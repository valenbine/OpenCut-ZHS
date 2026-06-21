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
		title: "服务条款",
		description: "适用于这款免费开源视频编辑器的清晰使用条款。如有疑问，请联系我们。",
		quickSummary: "快速摘要",
		headline: "你的内容归你所有，我们不拥有任何内容。",
		summaryItems: [
			"所有功能都在浏览器本地运行，不会上传到我们的服务器。",
			"我们不会主张对你的内容拥有所有权。",
			"个人和商业用途均可免费使用，没有水印或额外限制。",
			"你需要自行对使用方式负责，并遵守适用法律。",
			"服务按现状提供，我们会持续改进稳定性。",
			"开源意味着你可以审查代码，也可以自行部署。",
			"不需要账号，导出的视频始终属于你。",
		],
		questions: "有问题？请发邮件至",
		sections: [
			{
				title: "你的内容，你的权利",
				paragraphs: [
					"你拥有自己创作的一切内容。所有编辑和处理都在你的设备本地完成。我们不会看到、存储或访问你的文件，也不会对你使用 OpenCut 创建的视频、项目或其他内容主张任何权利。",
				],
				list: [
					"你的内容始终保留在你的设备上。",
					"你保留内容的全部知识产权。",
					"你可以按自己的需要导出和使用内容。",
					"OpenCut 不会添加水印或附加授权限制。",
				],
			},
			{
				title: "你可以如何使用 OpenCut",
				paragraphs: [
					"OpenCut 可免费用于个人用途和商业用途。你可以：",
					"你需要自行对使用方式和创作内容负责，并遵守所在地法律。",
				],
				list: [
					"为个人、教育或商业目的创作视频。",
					"将 OpenCut 用于客户项目和付费项目。",
					"分享和分发使用 OpenCut 创建的视频。",
					"在 MIT 许可证范围内修改和分发 OpenCut 软件。",
				],
			},
			{
				title: "AI 功能",
				paragraphs: [
					"自动字幕等 AI 功能完全在浏览器中通过本地模型运行，不会上传任何内容。你也可以在不使用这些功能的情况下正常使用 OpenCut。",
				],
			},
			{
				title: "服务",
				paragraphs: [
					"OpenCut 当前不要求账号。服务按现状提供，我们会尽力保证可靠性。",
				],
			},
			{
				title: "开源带来的额外权利",
				paragraphs: ["因为 OpenCut 是开源软件，你还拥有这些能力："],
				list: [
					"查看代码，确认我们如何处理你的数据。",
					"在自己的服务器上自行部署 OpenCut。",
					"按需修改软件。",
					"把改进贡献回社区。",
				],
				github: true,
			},
			{
				title: "限制与责任",
				paragraphs: [
					"OpenCut 免费提供。在法律允许范围内：",
					"由于你的内容仅保存在你的设备上，我们无法恢复丢失的项目。重要内容建议及时导出。",
				],
				list: [
					"我们不对数据或内容丢失承担责任。",
					"如果你清除了浏览器数据，本地项目可能会丢失。",
					"你需要自行对服务使用方式负责。",
					"我们的责任以适用法律允许的最大范围为限。",
				],
			},
			{
				title: "服务变更",
				paragraphs: ["我们可能会更新 OpenCut 和这些条款："],
				list: [
					"如有重要变更，我们会通知你。",
					"继续使用代表你接受更新后的条款。",
					"你也可以自行部署旧版本。",
					"重大调整会在 GitHub 社区中讨论。",
				],
			},
			{
				title: "停止使用",
				paragraphs: ["你可以随时停止使用 OpenCut。"],
				list: ["清除浏览器数据即可移除本地项目。"],
			},
			{
				title: "联系我们",
				paragraphs: [
					"如果你对这些条款有疑问，或需要反馈问题，可以通过 GitHub 仓库、电子邮件 oss@opencut.app 或 X 联系我们。",
					"这些条款受你所在司法辖区的适用法律约束，我们更希望通过开源社区中的友好讨论解决争议。",
				],
				contact: true,
			},
		],
		lastUpdated: "最后更新：2026 年 3 月 15 日",
	},
	en: {
		title: "Terms of service",
		description:
			"Fair and transparent terms for our free, open-source video editor. Contact us if you have any questions.",
		quickSummary: "Quick summary",
		headline: "You own your content and we own nothing.",
		summaryItems: [
			"Everything runs locally in your browser and nothing is uploaded to our servers.",
			"We never claim ownership of your content.",
			"Free for personal and commercial use with no watermarks or restrictions.",
			"You are responsible for how you use it and should follow applicable laws.",
			"The service is provided as is while we keep improving reliability.",
			"Open source means you can review the code and self-host if needed.",
			"No account is required and your exported videos are always yours.",
		],
		questions: "Questions? Email us at",
		sections: [
			{
				title: "Your Content, Your Rights",
				paragraphs: [
					"You own everything you create. All editing and processing happens locally on your device. We never see, store, or access your files, and we make no ownership or licensing claims over the videos, projects, or other content you create with OpenCut.",
				],
				list: [
					"Your content never leaves your device.",
					"You retain all intellectual property rights to your content.",
					"You can export and use your content however you choose.",
					"OpenCut adds no watermarks or licensing restrictions.",
				],
			},
			{
				title: "How You Can Use OpenCut",
				paragraphs: [
					"OpenCut is free for personal and commercial use. You can:",
					"You are responsible for how you use OpenCut and the content you create, including compliance with local law.",
				],
				list: [
					"Create videos for personal, educational, or commercial purposes.",
					"Use OpenCut for client work and paid projects.",
					"Share and distribute videos created with OpenCut.",
					"Modify and distribute the OpenCut software under the MIT license.",
				],
			},
			{
				title: "AI Features",
				paragraphs: [
					"AI features such as auto captions run entirely in your browser with on-device models. No content is uploaded, and you can use OpenCut without these features.",
				],
			},
			{
				title: "Service",
				paragraphs: [
					"OpenCut does not currently require an account. The service is provided as is, and we aim to keep it reliable.",
				],
			},
			{
				title: "Open Source Benefits",
				paragraphs: ["Because OpenCut is open source, you also can:"],
				list: [
					"Review the code to see exactly how we handle your data.",
					"Self-host OpenCut on your own servers.",
					"Modify the software to suit your needs.",
					"Contribute improvements back to the community.",
				],
				github: true,
			},
			{
				title: "Limitations and Liability",
				paragraphs: [
					"OpenCut is provided free of charge. To the extent permitted by law:",
					"Because your content stays on your device, we have no way to recover lost projects. Export important work when you finish editing.",
				],
				list: [
					"We are not liable for lost data or content.",
					"Projects stored in your browser may be lost if browser data is cleared.",
					"You are responsible for how you use the service.",
					"Our liability is limited to the maximum extent allowed by law.",
				],
			},
			{
				title: "Service Changes",
				paragraphs: ["We may update OpenCut and these terms:"],
				list: [
					"We will notify you about significant changes.",
					"Continued use means you accept the updated terms.",
					"You can self-host an older version if you prefer.",
					"Major changes will be discussed with the community on GitHub.",
				],
			},
			{
				title: "Stopping Use",
				paragraphs: ["You can stop using OpenCut at any time."],
				list: ["Clear your browser data to remove local projects."],
			},
			{
				title: "Contact Us",
				paragraphs: [
					"If you have questions about these terms or need to report an issue, contact us through our GitHub repository, by email at oss@opencut.app, or on X.",
					"These terms are governed by applicable law in your jurisdiction, and we prefer to resolve disputes through friendly discussion in the open-source community.",
				],
				contact: true,
			},
		],
		lastUpdated: "Last updated: March 15, 2026",
	},
} as const;

export function TermsContent() {
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
