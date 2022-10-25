import { nodeFileTrace } from "@vercel/nft";
import { inspect } from "util";

const non = await nodeFileTrace(["./src/main.js"]);
console.log("Non-obfuscated\n", inspect(non, false, null, true));

const obf = await nodeFileTrace(["./src/main-obfuscated.js"]);
console.log("Obfuscated\n", inspect(obf, false, null, true));
