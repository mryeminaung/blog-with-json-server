import React from "react";

export default function GuestLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen items-center justify-center px-5 bg-linear-to-br from-blue-50 to-indigo-100">
			{children}
		</div>
	);
}
