#!/usr/bin/env node

import { renderApp } from "./dist/app.js";

console.log(`<!DOCTYPE html>\n${renderApp()}`);
