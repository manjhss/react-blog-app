import React from "react";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const AllPosts = () => {
	const { posts } = useSelector((state) => state.posts);

	if (posts.length === 0) {
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
					{posts.map((post) => (
						<div key={post.$id}>
							<PostCard
								id={post.$id}
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

export default AllPosts;
