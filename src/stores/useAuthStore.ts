import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
	authUser: { id: string; fullName: string; email: string } | null;
};

type Actions = {
	setAuthUser: (
		user: { id: string; fullName: string; email: string } | null,
	) => void;
};

type AuthStore = State & Actions;

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			authUser: null,
			setAuthUser: (user) => set({ authUser: user }),
		}),
		{
			name: "authInfo",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
