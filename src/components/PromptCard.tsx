"use client";

import { useState } from "react";
import { Post } from "./models/Post";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
	post: Post;
	handleTagClick?: any;
	handleEdit?: any;
	handleDelete?: any;
};
const PromptCard = (props: Props) => {
	const [copied, setCopied] = useState("");
	const {data: session} = useSession();
	const pathName = usePathname();

	const handleCopy = () => {
		setCopied(props.post.prompt);
		navigator.clipboard.writeText(props.post.prompt);
		setTimeout(()=>{
			setCopied("");
		}, 3000);
	}

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<Link 
					href={`/profile/${props.post?.creator?.id}`}
				className="flex-1 flex justify-start first-letter:items-center gap-3">
					<Image
						src={
							props.post?.creator?.image ||
							"/assets/images/logo.svg"
						}
						alt="user image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{props?.post?.creator?.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{props?.post?.creator?.email}
						</p>
					</div>
				</Link>

				<div className="copy_btn" onClick={handleCopy}>
					<Image 
					src={copied === props.post.prompt 
						? '/assets/icons/tick.svg' 
						: '/assets/icons/copy.svg'
					}
					width={12}
					height={12}
					alt="Copied" />
				</div>
			</div>

			<p
				className="m-4 font-satoshi text-sm text-gray-700"
			>
				{props.post.prompt}
			</p>

			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => props.handleTagClick && props.handleTagClick(props.post.tag)}
			>
				#{props.post.tag}
			</p>

			{session?.user?.id === props.post.creator.id 
			&& pathName.startsWith("/profile") && (
				<div
					className="mt-5 flex-center gap-4 border-t borger-gray-100 pt-3"
				>
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={props.handleEdit}
					>
						Edit
					</p>

					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={props.handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};
export default PromptCard;
