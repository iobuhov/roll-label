#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { renderApp } from "./dist/app.js";
import { format } from "prettier";
import * as YAML from "yaml";
import { description } from "./desciption.js";

const [file] = process.argv.slice(2);

if (!file) {
  console.log("Usage: roll-label meta.yaml");
  process.exit(0);
}

let data = await readFile(file, { encoding: "utf-8" });
data = YAML.parse(data);

let page = `<!DOCTYPE html>\n${await renderApp(data)}`;
page = await format(page, { tabWidth: 2, parser: "html" });
await writeFile(`${data.rollId}.html`, page);
await writeFile(`flickr-note.txt`, description(data));
