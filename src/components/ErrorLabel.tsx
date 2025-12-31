import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

export default function ErrorLabel({
	message,
}: {
	message: string | undefined;
}) {
	return (
		<p className="flex items-center gap-x-1 text-red-500 text-sm mt-2">
			<ExclamationCircleIcon className="size-3.5" />
			<span>{message}</span>
		</p>
	);
}
