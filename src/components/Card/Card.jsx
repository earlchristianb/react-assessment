/** @format */

import React, { useState } from "react";
import { formatDistance, subDays } from "date-fns";

const Card = ({
	missionName,
	status,
	date,
	details,
	videoLink,
	articleLink,
}) => {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const getStatusBackground = (status) => {
		switch (status) {
			case "upcoming":
				return "bg-green-400";
			case "success":
				return "bg-sky-400";
			case "failed":
				return "bg-red-500";
		}
	};

	const handleClick = () => {
		setIsDetailsOpen((prevData) => !prevData);
	};

	const formatDate = (date) => {
		const newData = new Date(date);
		return formatDistance(subDays(newData, 3), new Date(), {
			addSuffix: true,
		});
	};

	return (
		<div className='w-full shadow-md  bg-white p-4 rounded space-y-5 mt-3'>
			<div className='flex space-x-1'>
				<p className='text-lg font-medium'>{missionName}</p>
				<p
					className={`items-start  text-sm h-5 ${getStatusBackground(
						status
					)} px-1`}>
					{status}
				</p>
			</div>
			<div className='flex space-x-3 divide-x-2 divide- p-1 justify-start items-center'>
				<p className='capitalize'>{formatDate(date)}</p>

				{videoLink && (
					<a className='text-blue-900 cursor-pointer px-2' href={videoLink}>
						Video
					</a>
				)}
				{articleLink && (
					<a className='text-blue-900 cursor-pointer px-2' href={articleLink}>
						Article
					</a>
				)}
			</div>
			<article
				className={`${
					isDetailsOpen ? "block" : "hidden"
				} grid grid-cols-3 place-items-center`}>
				<div className='rounded-full bg-red-400 h-20 w-20'></div>
				{details !== null ? (
					<div className='col-span-2 p-2'>{details}</div>
				) : (
					"No Details"
				)}
			</article>
			<button
				onClick={handleClick}
				className='text-lg text-white bg-blue-500 p-2 rounded-md'>
				{isDetailsOpen ? "Hide" : "View"}
			</button>
		</div>
	);
};

export default Card;
