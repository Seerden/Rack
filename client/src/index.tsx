require("file-loader?name=[name].[ext]!./index.html");

import App from "components/App";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { worker } from "./mocks/browser";

// eslint-disable-next-line
if (process.env.NODE_ENV === "development" && 0) {
	worker.start();
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
