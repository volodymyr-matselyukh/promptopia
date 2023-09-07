import "../styles/global.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { Session } from "next-auth";
export const dynamic = 'force-dynamic'

export const metadata = {
	title: "Promtopia",
	description: "Discover & share AI prompts",
};

type Props = { children: React.ReactNode, session: Session };
const RootLayout = async ({ children, session }: Props) => {

	return (
		<html lang="en">
			<body>
				<Provider session={session}>
					<div className="main">
						<div className="gradient"></div>
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};
export default RootLayout;
