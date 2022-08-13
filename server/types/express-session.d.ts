import "express-session";

declare namespace Express {
	interface Request {
		user: {
			username: string;
			user_id: number;
		};
	}
}

declare module "express-session" {
	interface Session {
		user_id?: number;
	}
}
