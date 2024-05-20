"use client";

import { useState } from "react";
import ImageCanvas from "@/components/ImageCanvas";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [imageUrls, setImageUrls] = useState<string[]>([
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7mSQiZGZbYFDv6NDbRyWba8HPciC5y1_uzw&usqp=CAU",
		"https://images.urbndata.com/is/image/FreePeople/86272564_066_a/?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1314",
		"https://images.ctfassets.net/udk41sh7kfzj/4n0Y2fNAwuHr0vUyOi9CAW/6a6e3061e5a4b175b7cd746457e612c8/Flare.jpg?w=690&q=80&fm=webp",
		"https://images.urbndata.com/is/image/FreePeople/85737294_001_0/?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1314",
		"https://images.urbndata.com/is/image/FreePeople/88897442_102_c/?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1314",
	]);

	const [newUrl, setNewUrl] = useState("");
	const [selectedImages, setSelectedImages] = useState<string[]>([]);

	const handleAddUrl = () => {
		if (newUrl) {
			setImageUrls((prevUrls) => [...prevUrls, newUrl]);
			setNewUrl(""); // Clear the input field after adding the URL
		}
	};

	const handleImageClick = (url: string) => {
		setSelectedImages((prevSelected) => [...prevSelected, url]);
    console.log(selectedImages)
	};

	return (
		<div className="max-w-screen min-h-screen flex justify-center items-center">
			<div className="w-full h-full flex flex-col items-center justify-center">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddUrl();
					}}
          className="flex gap-2 w-full p-8"
				>
					<Input
						type="text"
						value={newUrl}
						onChange={(e) => setNewUrl(e.target.value)}
						placeholder="Enter image URL"
					/>
					<Button type="submit">Add Image</Button>
				</form>
				<div className="grid grid-cols-4 gap-2 w-full p-8">
					{imageUrls.map((url, index) => (
						<Image
							key={index}
							src={url}
							alt={`Preview ${index}`}
							width={300}
							height={300}
							onClick={() => handleImageClick(url)}
							className="cursor-pointer"
						/>
					))}
				</div>
			</div>
			<div className="h-full w-full">
				<ImageCanvas imageUrls={selectedImages} />
			</div>
		</div>
	);
}
