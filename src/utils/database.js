import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if(isConnected)
	{
		console.log("mongo db already connected");
		return;
	}

	try{
		await mongoose.connect(process.env.MONGODB_URI,
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
		
		isConnected = true;
		console.log("mongo db connected");
	}
	catch(error){
		console.log("mongo db connection error", error);
	}
}