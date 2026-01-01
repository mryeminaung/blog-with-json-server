import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import {
	differenceInDays,
	format,
	formatDistanceToNow,
	parseISO,
} from "date-fns";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	// timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const IsLogin = () => {
	const authUser = useAuthStore().authUser;

	return authUser ?? null;
};

export const formatBlogDate = (dateString: string) => {
	const date = parseISO(dateString);
	const now = new Date();

	// Calculate the difference in days
	const daysDiff = differenceInDays(now, date);

	// If less than 7 days ago, show "X days ago"
	if (daysDiff < 7) {
		return formatDistanceToNow(date, { addSuffix: true });
	}

	// Otherwise, show "Jan 01, 2026" (M D Y format)
	return format(date, "MMM dd, yyyy");
};

export const scrollToTop = () => {
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
