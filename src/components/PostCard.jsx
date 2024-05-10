import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

const PostCard = ({ id, title, featuredImage }) => {
	return (
		<Link to={`/post/${id}`}>
			<Card className="bg-transparent flex flex-col items-center overflow-hidden">
				<div className="h-60 w-60 flex items-center justify-center">
					<img
						src={appwriteService.getFilePreview(featuredImage)}
						alt={title}
					/>
				</div>

				<CardHeader className="w-full">
					<CardTitle className="text-xl">{title}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default PostCard;
