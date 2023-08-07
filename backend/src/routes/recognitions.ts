import { Router } from "express";
import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export const recognitions = Router();

function convertTimeFormat(inputTime: string): string {
	const inputDate = new Date(inputTime);
	const utcDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60 * 1000));
  
	const year = utcDate.getUTCFullYear();
	const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = utcDate.getUTCDate().toString().padStart(2, '0');
	const hours = utcDate.getUTCHours().toString().padStart(2, '0');
	const minutes = utcDate.getUTCMinutes().toString().padStart(2, '0');
	const seconds = utcDate.getUTCSeconds().toString().padStart(2, '0');
	const milliseconds = utcDate.getUTCMilliseconds().toString().padStart(3, '0');
  
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

recognitions.get("/", (_: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "Hello world!",
		code: 200,
		results: 0,
		data: [],
	});
});

recognitions.get("/get-all", async (_: Request, res: Response) => {
	try {
		const allRecognitions = await prisma.recognitions.findMany({
			take: 30,
		});
		res.status(200).json({
			success: true,
			message: "Query successful",
			code: 200,
			results: allRecognitions.length,
			data: allRecognitions,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error,
			code: 400,
			results: 0,
			data: [],
		});
	}
});

recognitions.post("/get-by", async (_: Request, res: Response) => {
	const { given_by, received_by, message, value } = _.body;
	console.log(given_by, received_by, message, value);

	try {
		const filteredRecognitions = await prisma.recognitions.findMany({
			where: {
				OR: [
					given_by ? { giver_alias: given_by } : undefined,
					message ? { message: message } : undefined,
					value ? { value: value } : undefined,
					received_by ? { receiver_names: { hasEvery: received_by } } : undefined,
				].filter(Boolean),
			},
			take: 30,
		});

		res.status(200).json({
			success: true,
			message: "Query successful",
			code: 200,
			results: filteredRecognitions.length,
			data: filteredRecognitions,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error,
			code: 400,
			results: 0,
			data: [],
		});
	}
});

recognitions.post("/get-by-date", async (_: Request, res: Response) => {
	let { startDate, endDate } = _.body;
	startDate = convertTimeFormat(startDate);
	endDate = convertTimeFormat(endDate);
	var query_object: object;
	if (startDate && endDate) {
		query_object = { gte: new Date(startDate), lte: new Date(endDate) };
	} else if (!startDate && endDate) {
		query_object = endDate;
	} else {
		return res.status(200).json({
			success: false,
			message:
				"Provide a valid start date and end date. Or you can provide only end date to get extact date's data.",
			code: 400,
			results: 0,
			data: [],
		});
	}

	try {
		const filteredRecognitions = await prisma.recognitions.findMany({
			where: {
				date_posted: query_object,
			},
			take: 30,
		});
		res.status(200).json({
			success: true,
			message: "Query successful",
			code: 200,
			results: filteredRecognitions.length,
			data: filteredRecognitions,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error,
			code: 400,
			results: 0,
			data: [],
		});
	}
});
