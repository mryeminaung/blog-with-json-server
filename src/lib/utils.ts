import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8000",
	// timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const IsLogin = () => {
	const authUser = useAuthStore().authUser;

	return authUser ?? null;
};
