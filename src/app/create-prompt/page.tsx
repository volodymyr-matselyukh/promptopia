'use client';

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Post = {
	prompt: string,
	tag: string
}

type Props = {};
const CreatePrompt = (props: Props) => {

	const router = useRouter();
	const {data: session} = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<Post>({
		prompt: "",
		tag: ""
	});

	const createPrompt = async (e: any) => {
		e.preventDefault();
		setSubmitting(true);

		try{
			const response = await fetch('/api/prompt/new', {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user?.id,
					tag: post.tag
				})
			});

			if(response.ok)
			{
				router.push('/');
			}
		}
		catch(err)
		{
			console.error(err);
		}
		finally{
			setSubmitting(false);
		}
	}

	return (
		<Form 
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};
export default CreatePrompt;
