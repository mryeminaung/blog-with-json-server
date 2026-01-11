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
	categoryId: number;
	userId: string;
	createdAt: string;
}

export interface BlogInfoType {
	id: string;
	title: string;
	content: string;
	slug: string;
	category: { id: number; name: string };
	author: { id: string; fullName: string };
	createdAt: string;
}

export interface Author {
	id: string;
	name: string;
}

export interface CommentInfo {
	id: string;
	author: Author;
	updatedAt: string;
	content: string;
}
