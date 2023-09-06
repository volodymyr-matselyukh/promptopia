import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database"
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
	try {
		const searchString = request.nextUrl.searchParams.get("search");

		await connectToDB();

		let prompts: any[] = [];

		if (searchString) {
			console.log("searching posts", searchString);
			prompts = await getFilteredPosts(searchString);
		}
		else {
			console.log("getting all posts");
			prompts = await getAllPosts();
		}

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

const getFilteredPosts = async (searchString: string) => {

	let prompts = await Prompt.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "creator",
				foreignField: "_id",
				as: "joineddata"
			}
		},
		{
			$match: {
				$or: [
					{ "prompt": { $regex: searchString } },
					{ "tag": { $regex: searchString } },
					{ "joineddata.username": { $regex: searchString } },
				]
			}
		},
		{
			$project: {
				"id": "$_id",
				"prompt": "$prompt",
				"tag": "$tag",
				"creator": {
					"id": { $first: "$joineddata._id" },
					"username": { $first: "$joineddata.username" },
					"image": { $first: "$joineddata.image" },
					"email": { $first: "$joineddata.email" },
				}
			}
		}
	]).exec();

	return prompts;
}

const getAllPosts = async () => {
	let prompts = await Prompt.find({})
		.populate('creator')
		.lean();

	prompts = prompts.map(prompt => {
		return {
			...prompt, id: prompt._id,
			creator: {
				...prompt.creator,
				id: prompt.creator._id
			}
		}
	});

	return prompts;
}