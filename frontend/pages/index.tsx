// import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import RecognitionCard from "./components/RecognitionCard";
import { HeaderSearch } from "./components/Navbar";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { APIResponse } from "typings/general";

import InfiniteScroll from "react-infinite-scroll-component";
interface ChildComponentProps {
	ResponseData: object[];
	setResponseData: React.Dispatch<React.SetStateAction<object[]>>;
}
const Home: React.FC<ChildComponentProps> = ({ ResponseData, setResponseData }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [FromDateValue, setFromDateValue] = useState<Date | null>(null);
	const [ToDateValue, setToDateValue] = useState<Date | null>(null);
	const defaultLoad = async () => {
		const res = await fetch("http://localhost:8000/api/recognitions/get-all");
		const data: APIResponse = await res.json();
		setResponseData(data.data);
	};

	const searchData = async (search: string) => {
		console.log(search);
		if (search.length === 0) {
			return alert("Put some query to search");
			// defaultLoad();
		}
		const res = await fetch("http://localhost:8000/api/recognitions/get-by", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify({ given_by: search, message: search, value: search, received_by: search }),
		});
		const data: APIResponse = await res.json();
		if (data.results === 0) {
			alert("No results found");
		}
		setResponseData(data.data);
		return data;
	};

	const filterByDate = async () => {
		console.log(FromDateValue, ToDateValue);

		if (FromDateValue === null || ToDateValue === null) {
			notifications.show({
				title: "Error",
				message: "Please select a date range! 🤥",
				color: "red",
			});
			alert("Please select a date range");
			return;
		}

		const res = await fetch("http://localhost:8000/api/recognitions/get-by-date", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify({ startDate: FromDateValue, endDate: ToDateValue }),
		});

		const data: APIResponse = await res.json();
		if (data.results === 0) {
			return alert("No results found");
		}
		setResponseData(data.data);
		alert(data.results + " results found");
	};

	const [IsLoading, setIsLoading] = useState(false);
	const [HasMore, setHasMore] = useState(true);
	const loadMoreData = async () => {
		let newData;
		setIsLoading(true);

		const res = await fetch("http://localhost:8000/api/recognitions/get-all");
		const data: APIResponse = await res.json();

		newData = ResponseData.concat(data.data);
		setResponseData(newData);
		setIsLoading(false);

		if (data.results !== 30) {
			console.log("No results available");

			setHasMore(false);
		}
	};
	useEffect(() => {
		defaultLoad();
	}, []);

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};

	return (
		<>
			<HeaderSearch searchData={searchData} />
			<br />
			<Group position="center">
				<Button onClick={open}>Filters</Button>
			</Group>

			<InfiniteScroll
				dataLength={1000}
				next={loadMoreData}
				hasMore={HasMore} // Replace with a condition based on your data source
				loader={IsLoading && <p className="m-4 text-center font-semibold">Loading...</p>}
				endMessage={<p className="m-4 text-center font-semibold">No more data to load.</p>}
			>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{ResponseData.map((element: any) => {
						return <RecognitionCard data={element} />;
					})}
					{ResponseData.length === 0 && <span>No results found</span>}
				</Masonry>
			</InfiniteScroll>
			{/* MODAL */}
			<Modal opened={opened} onClose={close} title="Filters" centered>
				<div className="relative h-[25rem]">
					<DateInput
						clearable
						value={FromDateValue}
						onChange={setFromDateValue}
						label="From date"
						placeholder="From date"
						maw={400}
						mx="auto"
						style={{ zIndex: 1000 }}
					/>
					<hr />
					<DateInput
						clearable
						value={ToDateValue}
						onChange={setToDateValue}
						label="to date"
						placeholder="From date"
						maw={400}
						mx="auto"
						style={{ zIndex: 1000 }}
					/>
					<hr />

					<Group position="right">
						<Button className="mt-3" onClick={filterByDate}>
							View results
						</Button>
					</Group>
				</div>
			</Modal>
		</>
	);
};

export default Home;
