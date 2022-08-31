require("file-loader?name=[name].[ext]!./index.html");

import App from "components/App";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
	worker.start();
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
