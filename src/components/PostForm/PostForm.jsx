import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import appwriteService from "../../appwrite/config";
import { FormWrapper, InputField, RTE } from "..";
import { Select } from "../index";
import { Button } from "../ui/button";
import { addPost, updatePost, deletePost } from "../../store/postSlice";

const PostForm = ({ post }) => {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.$id || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.auth);

	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await appwriteService.uploadFile(data.image[0])
				: null;

			if (file) {
				appwriteService.deleteFile(post.featuredImage);
			}

			if (post.$id !== data.slug) {
				const dbPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
					featuredImage: file ? file.$id : post.featuredImage,
				});

				if (dbPost) {
					appwriteService.deletePost(post.$id).then((status) => {
						if (status) {
							if (file) {
								appwriteService.deleteFile(post.featuredImage);
							}
							dispatch(deletePost(post.$id));
						}
					});

					console.log("create and delete");
					dispatch(addPost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			} else {
				const dbPost = await appwriteService.updatePost(post.$id, {
					...data,
					featuredImage: file ? file.$id : undefined,
				});

				if (dbPost) {
					console.log("update");
					dispatch(updatePost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			}
		} else {
			const file = await appwriteService.uploadFile(data.image[0]);

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
				});

				if (dbPost) {
					dispatch(addPost(dbPost));
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");

		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title), {
					shouldValidate: true,
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	return (
		<div className="w-full min-h-screen">
			<FormWrapper title={post ? "Edit Post" : "Add Post"}>
				<form
					onSubmit={handleSubmit(submit)}
					className="grid lg:grid-cols-3 gap-3"
				>
					<div className="col-span-2 space-y-4">
						<InputField
							type="text"
							label="Title: "
							placeholder="e.g. Blog"
							{...register("title", {
								required: true,
							})}
						/>

						<InputField
							type="text"
							label="Slug: "
							{...register("slug", {
								required: true,
							})}
							onInput={(e) => {
								setValue(
									"slug",
									slugTransform(e.currentTarget.value),
									{ shouldValidate: true }
								);
							}}
						/>

						<RTE
							label="Content: "
							name="content"
							control={control}
							defaultValue={getValues("content")}
						/>
					</div>

					<div className="space-y-4">
						<InputField
							type="file"
							label="Featured Image: "
							accept="image/png, image/jpg, image/jpeg, image/gif"
							placeholder="e.g. Blog"
							{...register("image", {
								required: !post,
							})}
						/>

						{post && (
							<div>
								<img
									src={appwriteService.getFilePreview(
										post.featuredImage
									)}
									alt={post.title}
								/>
							</div>
						)}

						<Select
							options={["active", "inactive"]}
							label="Status"
							{...register("status", { required: true })}
						/>

						<Button type="submit" className="w-full">
							{post ? "Update" : "Create"}
						</Button>
					</div>
				</form>
			</FormWrapper>
		</div>
	);
};

export default PostForm;
