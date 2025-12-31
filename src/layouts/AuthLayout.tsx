import MainNav from "@/components/navbar/MainNav";
import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainNav />
			<main className="border mx-auto px-5">{children}</main>
		</>
	);
}
