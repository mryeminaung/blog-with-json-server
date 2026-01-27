import { formatBlogDate } from "@/lib/utils";
import { Image } from "@heroui/react";

type Props = {
	comment: {
		id: string;
		content: string;
		author: { id: string; name: string };
		updatedAt: string;
	};
};

export default function CommentItem({ comment }: Props) {
	return (
		<div className="border-b border-border pb-6 border-b-gray-300 last:border-b-0">
			<div className="flex gap-x-3">
				<Image
					className="w-10 h-10 rounded-full ring-2 ring-slate-500 shrink-0"
					src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
				/>
				<div className="flex-1 min-w-0">
					<div className="flex items-baseline gap-2 flex-wrap">
						<h4 className="font-semibold text-foreground">
							{comment.author.name}
						</h4>
						<span className="text-sm text-muted-foreground">
							{formatBlogDate(comment.updatedAt)}
						</span>
					</div>

					<p className="text-foreground/80 leading-relaxed">
						{comment.content}
					</p>
				</div>
			</div>
		</div>
	);
}
