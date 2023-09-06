import { Post } from "@/app/create-prompt/page";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
	type: string;
	post: Post;
	setPost: Dispatch<SetStateAction<Post>>;
	submitting: boolean;
	handleSubmit: any;
};
const Form = (props: Props) => {
	return (
		<section className="w-full max-w-full flex flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{props.type} Post</span>
			</h1>

			<p className="desc text-left max-w-md">
				{props.type} and share amazing promtps with the world and let
				your imagination run wild with any AI-powered platform
			</p>

			<form
				onSubmit={props.handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>

					<textarea
						title="prompt"
						value={props.post.prompt}
						onChange={(e) =>
							props.setPost({
								...props.post,
								prompt: e.target.value,
							})
						}
						placeholder="Write your prompt here"
						required
						className="form_textarea"
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag {` `}
						<span className="font-normal">
							(#product, #development, #idea)
						</span>
					</span>

					<input
						title="tag"
						value={props.post.tag}
						onChange={(e) =>
							props.setPost({
								...props.post,
								tag: e.target.value,
							})
						}
						placeholder="Write your tag here"
						required
						className="form_input"
					/>
				</label>

				<div
					className="flex-end mx-3 mb-5 gap-4"
				>
					<Link
						href="/"
						className="text-gray-500 text-sm"
					>
						Cancel
					</Link>

					<button
						type="submit"
						disabled={props.submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{props.submitting ? `${props?.type}...` : props?.type}

					</button>
				</div>
			</form>
		</section>
	);
};
export default Form;
