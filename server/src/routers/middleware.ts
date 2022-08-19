import { Request, Response } from "express";

export function handleError(
	err: any,
	req: Request,
	res: Response,
	next: (a?: any) => void
) {
	res.status(500).send("Error encountered during processing");
}
