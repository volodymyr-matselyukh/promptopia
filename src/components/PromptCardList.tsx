import PromptCard from "./PromptCard"
import { Post } from "./models/Post"

type Props = {
	data: Post[],
	handleCardClick: any
	handleTagClick: any
}


const PromptCardList = (props: Props) => {
  return (
	<div className="mt-16 prompt_layout">
		{props.data.map((post: Post) => 
		{ 
			return (
			<PromptCard 
				key={post.id}
				post={post}
				handleTagClick={props.handleTagClick}
			/>
		);
		})}
	</div>
  )
}
export default PromptCardList