import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { transform } from "./transform";

yargs(hideBin(process.argv))
  .command<{ file: string }>(
    "transform <file>",
    "parse and generate variants for video",
    () => {},
    (argv) => {
      transform(argv.file);
    }
  )
  .strictCommands()
  .demandCommand(1)
  .parse();
