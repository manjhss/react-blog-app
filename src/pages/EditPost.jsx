import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
	const { slug } = useParams();
	
	const [post, setPost] = useState(null);
	const { posts } = useSelector((state) => state.posts);
	
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			try {
				const filteredPost = posts.filter(
					(post) => slug === post.$id
				)[0];
				setPost(filteredPost);
			} catch (error) {
				console.log(error);
			}
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return post ? (
		<div>
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
};

export default EditPost;
