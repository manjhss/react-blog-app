import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import {
	fetchPostsStart,
	fetchPostsSuccess,
	fetchPostsFailure,
} from "../store/postSlice";

const AllPosts = () => {
	const { status } = useSelector((state) => state.auth);
	const { loading } = useSelector((state) => state.posts);

	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (status) {
			dispatch(fetchPostsStart());

			appwriteService
				.getPosts()
				.then((posts) => {
					if (posts) {
						setPosts(posts.documents);
						dispatch(fetchPostsSuccess(posts.documents));
					}
				})
				.catch((error) => {
					console.error(error.message);
					dispatch(fetchPostsFailure(error.message));
				});
		}
	}, []);

	if (posts.length === 0) {
		return (
			<div className="flex h-screen items-center justify-center text-xl font-medium">
				{loading ? "Loading..." : "Post not found 😟"}
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
