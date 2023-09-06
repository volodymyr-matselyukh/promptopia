import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/User';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process?.env?.GOOGLE_ID || "",
			clientSecret: process?.env?.GOOGLE_CLIENT_SECRET || ""
		})
	],

	callbacks: {
		async signIn({ profile }): Promise<boolean> {
			try {
				await connectToDB();

				const userExists = await User.findOne({
					email: profile?.email
				});

				if (!userExists) {
					console.log("profile", profile);

					await User.create({
						email: profile?.email,
						username: profile?.name?.replace(" ", "").toLowerCase(),
						image: profile?.picture
					});
				}

				return true;
			}
			catch (error) {
				console.error("sing in error", error);
			}

			return false;
		},

		async session({ session }): Promise<Session> {
			{
				const sessionUser = await User.findOne({
					email: session.user?.email
				});

				if (session && session.user) {

					session.user = {...session.user, id: sessionUser._id.toString()};					
				}

				return session;
			}
		}
	}
});

export { handler as GET, handler as POST }
