import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";

const files = readdirSync("ionicons/src/svg").filter((x) =>
  x.endsWith("-outline.svg")
);

const result = [];

mkdirSync("src/icons/ionicons", { recursive: true });

for (const file of files) {
  const jsfilename = file.replace(".svg", ".tsx");
  const svg = readFileSync("ionicons/src/svg/" + file, "utf-8")
    .replace(/ fill="#.*?"/g, "")
    .replace(/ stroke="#.*?"/g, "")
    .replace(/fill:#.*?[;"]/g, "")
    .replace(/stroke:#.*?[;"]/g, "")
    .replace(
      'viewBox="0 0 512 512">',
      'viewBox="0 0 512 512" stroke="currentColor" fill="currentColor" class={props.class}>'
    );

  const componentName =
    "Io" +
    file
      .slice(0, -12)
      .split("-")
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");

  writeFileSync(
    "src/icons/ionicons/" + jsfilename,
    `
import type { IoIconProps } from "../../utils";

export const ${componentName} = (props: IoIconProps) => {
  return (
    ${svg}
  );
}
`
  );
  result.push(
    `export { ${componentName} } from './icons/ionicons/${file.slice(0, -4)}';`
  );
}

export { result };
