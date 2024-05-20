//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "./ui/button";

const ImageCanvas = ({ imageUrls }) => {
	const canvasRef = useRef(null);
	const fabricCanvasRef = useRef(null);

	useEffect(() => {
		const canvasElement = canvasRef.current;
		const canvas = new fabric.Canvas(canvasElement);
		fabricCanvasRef.current = canvas;

		return () => {
			if (fabricCanvasRef.current) {
				fabricCanvasRef.current.dispose();
				fabricCanvasRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		loadImage(imageUrls);
	}, [imageUrls]);

	const loadImage = (imageUrls: string) => {
		if (fabricCanvasRef.current && imageUrls.length > 0) {
			const url = imageUrls[imageUrls.length - 1]; 
			fabric.Image.fromURL(
				url,
				(img) => {
					const canvas = fabricCanvasRef.current;
					const scaleFactor = Math.min(
						canvas.width / 2 / img.width,
						canvas.height / 2 / img.height
					);
					img.set({
						crossOrigin: "anonymous",
						scaleX: scaleFactor,
						scaleY: scaleFactor,
						left: (canvas.width - img.width * scaleFactor) / 2,
						top: (canvas.height - img.height * scaleFactor) / 2,
					});
					canvas.add(img);
					canvas.renderAll();
				},
				{ crossOrigin: "anonymous" }
			);
		}
	};

	const saveImage = () => {
		if (fabricCanvasRef.current) {
			const dataURL = fabricCanvasRef.current.toDataURL({
				format: "png",
				quality: 1,
			});
			const link = document.createElement("a");
			link.href = dataURL;
			link.download = "canvas-image.png";
			link.click();
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<canvas
				ref={canvasRef}
				width={400}
				height={600}
				className="border-2 rounded-lg"
			/>
			<Button onClick={saveImage}>Save Image</Button>
		</div>
	);
};

export default ImageCanvas;
