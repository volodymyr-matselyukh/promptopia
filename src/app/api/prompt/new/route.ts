import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req: any) => {
	const { userId, prompt, tag } = await req.json();

	try {
		console.log("userId on back end", userId);

		await connectToDB();
		const newPrompt = new Prompt({
			creator: userId, 
			prompt,
			tag
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt),
		{
			status: 201
		});
	} catch (err) {
		return new Response("Failed to create a new prompt", {
			status: 500
		});
	}
}