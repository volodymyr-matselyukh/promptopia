import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database"

export const GET = async (request: any, {params }: any) => {
	try {
		await connectToDB();
		let prompts = await Prompt.find({
			creator: params.id
		})
			.populate('creator')
			.lean();

		prompts = prompts.map(prompt => {
			return {...prompt, id: prompt._id, 
				creator: {
					...prompt.creator,
					id: prompt.creator._id
				}
			};
		});

		return new Response(JSON.stringify(prompts),
			{
				status: 200
			}
		);
	}
	catch (err) {
		console.error("Getting posts error", err);
		return new Response("Failed to fetch all prompts", {
			status: 500
		});
	}
}