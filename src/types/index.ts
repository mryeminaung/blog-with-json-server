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
	category: string;
	author: string;
	createdAt: string;
}
