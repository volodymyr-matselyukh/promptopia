import PromptCard from "./PromptCard";
import { Post } from "./models/Post";

type Props = {
	name: string;
	description: string;
	data: Post[];
	handleEdit: any;
	handleDelete: any;
};
const Profile = (props: Props) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{props.name} Profile</span>
			</h1>

			<p className="desc text-left">{props.description}</p>

			<div className="mt-10 prompt_layout">
				{props.data.map((post: Post) => {
					return (
						<PromptCard
							key={post.id}
							post={post}
							handleEdit={() => props.handleEdit && props.handleEdit(post)}
							handleDelete={() => props.handleDelete && props.handleDelete(post)}
						/>
					);
				})}
			</div>
		</section>
	);
};
export default Profile;
