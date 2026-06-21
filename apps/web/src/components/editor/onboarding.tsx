"use client";

import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SOCIAL_LINKS } from "@/site/social";
import { useLocalStorage } from "@/services/storage/use-local-storage";
import { Button } from "../ui/button";
import { Dialog, DialogBody, DialogContent, DialogTitle } from "../ui/dialog";
import { useI18n } from "@/i18n/language-provider";

export function Onboarding() {
	const [step, setStep] = useState(0);
	const { locale } = useI18n();
	const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage({
		key: "hasSeenOnboarding",
		defaultValue: false,
	});

	const isOpen = !hasSeenOnboarding;
	const copy = {
		"zh-CN": {
			titles: ["欢迎体验 OpenCut Beta", "这是非常早期的测试版", "祝你测试愉快"],
			welcomeTitle: "欢迎体验 OpenCut Beta",
			welcomeDescription: "你是最早体验 OpenCut 的用户之一。它是一款完全开源的 CapCut 替代方案。",
			betaDescription1: "这个编辑器还有很多能力正在补齐中。",
			betaDescription2: "目前仍有不少功能缺失，我们正在持续开发。",
			betaDescription3: "想了解进度，可以查看我们的 [路线图](https://opencut.app/roadmap)。",
			funDescription: `加入我们的 [Discord](${SOCIAL_LINKS.discord})，和社区一起交流、反馈，帮助 OpenCut 变成更好的编辑器。`,
			next: "下一步",
			finish: "完成",
			fallback: "OpenCut 引导",
		},
		en: {
			titles: ["Welcome to OpenCut Beta!", "This is a super early beta!", "Have fun testing!"],
			welcomeTitle: "Welcome to OpenCut Beta!",
			welcomeDescription: "You're among the first to try OpenCut - the fully open source CapCut alternative.",
			betaDescription1: "There's still a ton of things to do to make this editor amazing.",
			betaDescription2: "A lot of features are still missing. We're working hard to build them out!",
			betaDescription3: "If you're curious, check out our roadmap [here](https://opencut.app/roadmap)",
			funDescription: `Join our [Discord](${SOCIAL_LINKS.discord}), chat with cool people and share feedback to help make OpenCut the best editor ever.`,
			next: "Next",
			finish: "Finish",
			fallback: "OpenCut Onboarding",
		},
	}[locale];

	const handleNext = () => {
		setStep(step + 1);
	};

	const handleClose = () => {
		setHasSeenOnboarding({ value: true });
	};

	const getStepTitle = () => {
		switch (step) {
			case 0:
				return copy.titles[0];
			case 1:
				return copy.titles[1];
			case 2:
				return copy.titles[2];
			default:
				return copy.fallback;
		}
	};

	const renderStepContent = () => {
		switch (step) {
			case 0:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title={copy.welcomeTitle} />
							<Description description={copy.welcomeDescription} />
						</div>
						<NextButton onClick={handleNext}>{copy.next}</NextButton>
					</div>
				);
			case 1:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title={getStepTitle()} />
							<Description description={copy.betaDescription1} />
							<Description description={copy.betaDescription2} />
							<Description description={copy.betaDescription3} />
						</div>
						<NextButton onClick={handleNext}>{copy.next}</NextButton>
					</div>
				);
			case 2:
				return (
					<div className="space-y-5">
						<div className="space-y-3">
							<Title title={getStepTitle()} />
							<Description description={copy.funDescription} />
						</div>
						<NextButton onClick={handleClose}>{copy.finish}</NextButton>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogTitle>
					<span className="sr-only">{getStepTitle()}</span>
				</DialogTitle>
				<DialogBody>{renderStepContent()}</DialogBody>
			</DialogContent>
		</Dialog>
	);
}

function Title({ title }: { title: string }) {
	return <h2 className="text-lg font-bold md:text-xl">{title}</h2>;
}

function Description({ description }: { description: string }) {
	return (
		<div className="text-muted-foreground">
			<ReactMarkdown
				components={{
					p: ({ children }) => <p className="mb-0">{children}</p>,
					a: ({ href, children }) => (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground hover:text-foreground/80 underline"
						>
							{children}
						</a>
					),
				}}
			>
				{description}
			</ReactMarkdown>
		</div>
	);
}

function NextButton({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<Button onClick={onClick} variant="default" className="w-full">
			{children}
			<ArrowRightIcon className="size-4" />
		</Button>
	);
}
