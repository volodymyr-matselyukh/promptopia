import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database"

export const GET = async (request: any, {params}: any) => {
	try {
		await connectToDB();
		let prompt = await Prompt.findById(params.id)
			.populate('creator')
			.lean();

		if(!prompt){
			return new Response("Prompt not found",
			{
				status: 404
			})
		}

		return new Response(JSON.stringify(prompt),
			{
				status: 200
			}
		);
	}
	catch (err) {
		console.error("Getting post error", err);
		return new Response(`Failed to fetch prompt with id ${params.id}`, {
			status: 500
		});
	}
}

export const PATCH = async (req: any, {params}: any) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);

		if(!prompt){
			return new Response("Prompt not found",
			{
				status: 404
			})
		}
		
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt),
		{
			status: 200
		});
	} catch (err) {
		return new Response("Failed to patch a prompt", {
			status: 500
		});
	}
}

export const DELETE = async (req: any, {params}: any) => {

	try {
		await connectToDB();
		await Prompt.findByIdAndDelete(params.id);

		return new Response(JSON.stringify({
			"Message": "Prompt deleted"
		}),
		{
			status: 204
		});
	} catch (err) {
		return new Response("Failed to delete prompt", {
			status: 500
		});
	}
}