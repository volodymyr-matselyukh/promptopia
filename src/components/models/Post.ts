export type Post = {
	id: string,
	prompt: string,
	tag: string,
	creator: {
		id: string,
		image: string,
		username: string,
		email: string
	}
}