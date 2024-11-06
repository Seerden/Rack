import { rest } from "msw";

export const handlers = [
	rest.get("/test", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ message: "Hello, world" }));
	}),
	// rest.post(`${baseUrl}/exercise/workout`, async (req, res, ctx) => {
	// 	console.log({ req: await req.json() });
	// 	return res(ctx.status(200), ctx.json({ message: "Success" }));
	// }),
];
