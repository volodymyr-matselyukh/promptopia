"use client";

import Profile from "@/components/Profile";
import { Post } from "@/components/models/Post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = ({params}: any) => {

	const router = useRouter();
	const {id: userId} = params;
	const [posts, setPosts] = useState<Post[]>([])
	const {data: session} = useSession();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();
			setPosts(data);
		}

		if(userId)
		{
			fetchPosts();
		}
		
	}, [session?.user?.id]);

	const handleEdit = (post: Post) => {
		router.push(`/update-prompt?id=${post.id}`)
	}

	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt");

		if(hasConfirmed){
			try{
				await fetch(`/api/prompt/${post.id}`, {
					method: "DELETE"
				});

				const filteredPosts = posts.filter(p => p.id !== post.id);

				setPosts(filteredPosts);
			} catch(err)
			{
				console.error(err);
			}
		}
	}

	return (
		<Profile
			name="My"
			description="Welcome to your personalized profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};
export default ProfilePage;
