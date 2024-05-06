import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import { deletePost as delPost } from "../store/postSlice";

export default function Post() {
	const { slug } = useParams();
	const [post, setPost] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (slug && posts.length > 0) {
			const filterPost = posts.filter((post) => slug === post.$id);

			if (filterPost.length > 0) {
				setPost(filterPost[0]);
			} else {
				navigate("/");
			}
		} else {
			navigate("/");
		}
	}, [slug, posts, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				dispatch(delPost(post.$id));
				navigate("/");
			}
		});
	};

	return post ? (
		<div>
			<Container>
				<div className="w-full flex justify-center mb-4 border rounded-xl p-2">
					<img
						src={appwriteService.getFilePreview(post.featuredImage)}
						alt={post.title}
						className="rounded-xl"
					/>
				</div>

				<div className="w-full flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">{post.title}</h1>

					{isAuthor && (
						<div className="top-6 flex gap-2">
							<Link to={`/edit-post/${post.$id}`}>
								<Button>Edit</Button>
							</Link>

							<Button variant="destructive" onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>

				<div className="browser-css">{parse(post.content)}</div>
			</Container>
		</div>
	) : null;
}
