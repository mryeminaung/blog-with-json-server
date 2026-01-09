import { api } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import { useEffect, useState } from "react";

interface BlogFilterProp {
	filterKey: string;
	setFilterKey: (name: string) => void;
}

export default function BlogFilter({
	filterKey,
	setFilterKey,
}: BlogFilterProp) {
	const [categories, setCategories] = useState<
		{ id: number; name: string }[] | null
	>([]);

	useEffect(() => {
		const loadData = async () => {
			const res = await api.get("/categories");
			setCategories(res.data);
		};
		loadData();
	}, []);

	const isActiveBadge = (name: string) => {
		return filterKey === name;
	};

	return (
		<div className="space-y-3 border-b border-border pb-5 mb-5 border-b-gray-300">
			<h3 className="font-semibold">Filter by Category</h3>
			<div className="flex gap-4 flex-wrap">
				<Chip
					onClick={() => setFilterKey("All")}
					variant={isActiveBadge("All") ? "solid" : "bordered"}
					color={isActiveBadge("All") ? "primary" : "default"}>
					All
				</Chip>
				{categories &&
					categories?.map((category) => (
						<Chip
							key={category.id}
							onClick={() => setFilterKey(category.name)}
							variant={isActiveBadge(category.name) ? "solid" : "bordered"}
							className="hover:cursor-pointer"
							color={isActiveBadge(category.name) ? "primary" : "default"}>
							{category.name}
						</Chip>
					))}
			</div>
		</div>
	);
}
