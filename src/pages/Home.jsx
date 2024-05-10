import React from "react";

import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const Home = () => {
	const { status, userData } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.posts);

	const userPosts = posts?.filter((post) => post.userId === userData.$id);

	if (!status) {
		return (
			<div className="flex h-screen items-center justify-center text-xl font-medium">
				Login to read posts 🐸
			</div>
		);
	}

	if (status && userPosts.length === 0) {
		return (
			<div className="flex h-screen items-center justify-center text-xl font-medium">
				Add Post ✍️
			</div>
		);
	}

	return (
		<div>
			<Container>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
					{userPosts?.map((post) => (
						<div key={post.$id}>
							<PostCard
								id={post.$id}
								description={post.content}
								title={post.title}
								featuredImage={post.featuredImage}
							/>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Home;
