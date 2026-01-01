interface LoginUser {
	email: string;
	password: string;
}

interface RegisterUser {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
}

interface BlogType {
	id: string;
	title: string;
	content: string;
	slug: string;
	categoryId: string;
	userId: string;
	createdAt: string;
}

interface BlogInfoType {
	id: string;
	title: string;
	content: string;
	slug: string;
	category: { id: string; name: string };
	author: { id: string; fullName: string };
	createdAt: string;
}
