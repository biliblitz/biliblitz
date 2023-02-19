import { readdirSync, readFileSync, writeFileSync } from "fs";

const files = readdirSync("src/icons").filter((x) => x.endsWith(".svg"));

const result = [];

for (const file of files) {
  const jsfilename = file.replace(".svg", ".tsx");
  const svg = readFileSync("src/icons/" + file, "utf-8")
    .replace(/ fill="#.*?"/g, "")
    .replace(/ stroke="#.*?"/g, "")
    .replace(/fill:#.*?[;"]/g, "")
    .replace(/stroke:#.*?[;"]/g, "")
    .replace(
      'viewBox="0 0 512 512">',
      'viewBox="0 0 512 512" stroke="currentColor" fill="currentColor" class={props.class}>'
    );

  const componentName =
    "Icon" +
    file
      .slice(0, -12)
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
