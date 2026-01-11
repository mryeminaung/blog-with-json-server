import { Image } from "@heroui/react";

export default function CommentItem() {
	return (
		<div className="border-b border-border pb-6 border-b-gray-300 last:border-b-0">
			<div className="flex gap-x-3">
				<Image
					className="w-10 h-10 rounded-full shrink-0"
					src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
				/>
				<div className="flex-1 min-w-0">
					<div className="flex items-baseline gap-2 flex-wrap">
						<h4 className="font-semibold text-foreground">Ninja</h4>
						<span className="text-sm text-muted-foreground">Jan 02, 2025</span>
					</div>

					<p className="text-foreground/80 leading-relaxed">
						I had the same initial reaction to Tailwind, but once I got used to
						the utility-first approach, there was no going back. Great insights!
					</p>
				</div>
			</div>
		</div>
	);
}
