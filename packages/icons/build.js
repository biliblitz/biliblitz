import { writeFileSync } from "fs";
import { result as result1 } from "./scripts/heroicons.build.js";
import { result as result2 } from "./scripts/ionicons.build.js";

writeFileSync("src/index.ts", [...result1, ...result2].join("\n"));
