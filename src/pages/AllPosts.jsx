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
	const { posts: persistedPosts } = useSelector((state) => state.posts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPostsStart());

		appwriteService
			.getPosts()
			.then((posts) => {
				if (posts) {
					let extractedPosts = posts.documents.map((post) => {
						const {
							$id,
							title,
							content,
							featuredImage,
							status,
							userId,
						} = post;

						return {
							$id,
							title,
							content,
							featuredImage,
							status,
							userId,
						};
					});

					dispatch(fetchPostsSuccess(extractedPosts));
				}
			})
			.catch((error) => {
				console.error(error.message);
				dispatch(fetchPostsFailure(error.message));
			});
	}, []);

	return (
		<div>
			<Container>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
					{persistedPosts.map((post) => (
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
