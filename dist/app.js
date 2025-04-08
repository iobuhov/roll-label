import { jsx, jsxs } from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charset: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=z" }),
      /* @__PURE__ */ jsx("title", { children: "Document" })
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsx("h1", { children: "Hello mom" }) })
  ] });
}
export function renderApp(data) {
  return renderToStaticMarkup(/* @__PURE__ */ jsx(App, {}));
}
