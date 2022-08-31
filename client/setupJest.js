require("whatwg-fetch");

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
