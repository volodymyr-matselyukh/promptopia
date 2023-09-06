import Feed from "@/components/Feed";

type Props = {};

const Home = (props: Props) => {

	return (
		<section className="flex flex-center flex-col w-full">
			<h1 className="head_text text-center">
				Discover & share
				<br className="max-md:hidden" />
				<span className="orange_gradient text-center">
					AI-Powered Prompts
				</span>
			</h1>
			<p className="desc text-center">
				Promptopia is a na open-source AI prompting tool for modern world to discover, create and share creative prompts.
			</p>

			<Feed />
		</section>
	);
};
export default Home;
