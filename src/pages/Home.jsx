import React, { useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPostsStart,
	fetchPostsSuccess,
	fetchPostsFailure,
} from "../store/postSlice";

const Home = () => {
	const { status, userData } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.posts);

	const userPosts = posts.filter((post) => post.userId === userData.$id);

	const dispatch = useDispatch();

	useEffect(() => {
		if (status && posts.length === 0) {
			dispatch(fetchPostsStart());

			appwriteService
				.getPosts()
				.then((posts) => {
					if (posts) {
						dispatch(fetchPostsSuccess(posts.documents));
					}
				})
				.catch((error) => {
					console.error(error.message);
					dispatch(fetchPostsFailure(error.message));
				});
		}
	}, []);

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

	console.log(posts[0]);

	return (
		<div>
			<Container>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
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
