import { readdirSync, readFileSync, writeFileSync } from "fs";

const files = readdirSync("src/icons").filter((x) => x.endsWith(".svg"));

const result = [];

for (const file of files) {
  const jsfilename = file.replace(".svg", ".tsx");
  const svg = readFileSync("src/icons/" + file, "utf-8")
    .replaceAll(' stroke="#0F172A"', "")
    .replaceAll(' stroke-width="1.5"', "")
    .replaceAll(' stroke-linecap="round"', "")
    .replaceAll(' stroke-linejoin="round"', "")
    .replace(
      'xmlns="http://www.w3.org/2000/svg">',
      'xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width={props.strokeWidth ?? 2} stroke-linecap="round" stroke-linejoin="round" class={props.class}>'
    );

  const componentName =
    "Icon" +
    file
      .slice(0, -4)
      .split("-")
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");

  writeFileSync(
    "src/icons/" + jsfilename,
    `
import { component$ } from '@builder.io/qwik';
import type { IconProps } from '../utils';

export const ${componentName} = component$((props: IconProps) => {
  return (
    ${svg}
  );
})
`
  );
  result.push(
    `export { ${componentName} } from './icons/${file.slice(0, -4)}';`
  );
}

writeFileSync("src/index.ts", result.join("\n"));
