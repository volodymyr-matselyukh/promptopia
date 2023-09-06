"use client";

import { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";
import { Post } from "./models/Post";
import Link from "next/link";

type Props = {};

const Feed = (props: Props) => {
	const searchInput = useRef<HTMLInputElement>(null);
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState<Post[]>([]);

	const handleSearchChange = async (e: any) => {
		setSearchText(e.target.value || "");
	}

	const handleTagClick = (tag: string) => {
		var ev = new Event('keyup', { bubbles: true});

		if(searchInput.current)
		{
			searchInput.current.value = tag;
			
			searchInput.current.dispatchEvent(ev);
		}
	}

	const handleClear = (e: any) => {
		e.preventDefault();

		handleTagClick("");
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/prompt?search=${searchText}`);
			const data = await response.json();
			setPosts(data);
		}

		if(searchText.length >= 3 || !searchText)
		{
		 	fetchPosts();
		}
		
	}, [searchText]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					ref={searchInput}
					type="text"
					placeholder="Search for a tag or a username"
					onKeyUp={handleSearchChange}
					required
					className="search_input peer"
				/>

				<Link href="/"
					className="ml-4 hover:text-blue-500"
					onClick={handleClear}
				>
					Clear
				</Link>
			</form>

			<PromptCardList 
				data={posts}
				handleCardClick={() => {}}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};
export default Feed;
