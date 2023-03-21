import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";

const files = readdirSync("heroicons/optimized/24/outline").filter((x) =>
  x.endsWith(".svg")
);

mkdirSync("src/icons/heroicons", { recursive: true });

const result = [];

for (const file of files) {
  const jsfilename = file.replace(".svg", ".tsx");
  const svg = readFileSync("heroicons/optimized/24/outline/" + file, "utf-8")
    .replaceAll(' stroke="#0F172A"', "")
    .replaceAll(' stroke-width="1.5"', "")
    .replaceAll(' stroke-linecap="round"', "")
    .replaceAll(' stroke-linejoin="round"', "")
    .replace(
      'aria-hidden="true">',
      'aria-hidden="true" stroke-width={props.strokeWidth ?? 2} stroke-linecap="round" stroke-linejoin="round" class={props.class}>'
    );

  const componentName =
    "Hi" +
    file
      .slice(0, -4)
      .split("-")
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");

  writeFileSync(
    "src/icons/heroicons/" + jsfilename,
    `
import type { HiIconProps } from "../../utils";

export const ${componentName} = (props: HiIconProps) => {
  return (
    ${svg}
  );
}
`
  );
  result.push(
    `export { ${componentName} } from './icons/heroicons/${file.slice(0, -4)}';`
  );
}

export { result };
