/** @format */
import React, { useEffect, useState } from "react";
import { API } from "./api/axios";
import Card from "./components/Card/Card";
import Searchbar from "./components/SearchBar/Searchbar";
import Spinner from "./components/Spinner/Spinner";
import axios from "axios";

function App() {
	const [searchFilter, setSearchFilter] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [launches, setLaunches] = useState([]);
	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const { data } = await API.get();
			setIsLoading(false);
			setLaunches(data);
		};
		getData();
	}, []);

	const handleSearch = (e) => {
		setSearchFilter(e.target.value);
	};

	return (
		<div className='bg-gray-200 w-full flex flex-col justify-start items-center h-screen m-auto p-4'>
			<div className='w-full max-w-lg space-y-2 h-screen '>
				<Searchbar onSearch={handleSearch} />
				<div className='h-5/6 overflow-auto scroll-smooth scroll-m-2'>
					{isLoading ? (
						<Spinner color='blue' />
					) : (
						launches
							.filter((val) => {
								if (searchFilter === "") {
									return val;
								} else if (
									val?.mission_name
										.toLowerCase()
										.includes(searchFilter.toLowerCase())
								) {
									return val;
								}
							})
							.map((launches, index) => {
								let status;
								if (launches.upcoming) {
									status = "upcoming";
								} else if (launches.launch_success) {
									status = "success";
								} else {
									status = "failed";
								}

								return (
									<Card
										key={index}
										missionName={launches.mission_name}
										status={status}
										details={launches.details}
										videoLink={launches.links.video_link}
										articleLink={launches.links.article_link}
										date={launches.launch_date_utc}
									/>
								);
							})
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
