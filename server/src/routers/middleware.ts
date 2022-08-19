import { Request, RequestHandler, Response } from "express";

export function handleError(
	err: any,
	req: Request,
	res: Response,
	next: (a?: any) => void
) {
	res.status(500).send("Error encountered during processing");
}

export const logAllIncomingRequests: RequestHandler = (req, res, next) => {
	console.log({ requestUrl: req.originalUrl });
	next();
};
