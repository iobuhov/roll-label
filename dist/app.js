import { jsx, jsxs } from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
export async function renderApp(props) {
  return renderToStaticMarkup(/* @__PURE__ */ jsx(App, { ...props }));
}
function App(props) {
  const mainList = getMainList(props);
  const c2 = getCol2(props);
  const c3 = getCol3(props);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("title", { children: props.rollId })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(PageStyle, {}),
      /* @__PURE__ */ jsx("div", { className: "content", children: /* @__PURE__ */ jsxs("div", { className: "roll-data", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("div", { className: "roll-id", children: props.rollId }),
          /* @__PURE__ */ jsx(DataList, { className: "main dl1", items: mainList })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx(DataList, { className: "sub dl2", items: c2 }) }),
        /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx(DataList, { className: "sub dl3", items: c3 }) })
      ] }) })
    ] })
  ] });
}
function getMainList(props) {
  return [
    li("film stock", "filmStock", props),
    { label: "camera", text: props.camera.join(" ") },
    { label: "lens", text: props.lens.join(" ") }
  ];
}
function getCol2(props) {
  return [
    li("loaded", "loaded", props),
    li("developed", "developed", props),
    li("push/pull", "pullPush", props),
    li("ISO", "iso", props),
    li("developed at", "developedAt", props),
    li("location", "location", props)
  ];
}
function getCol3(props) {
  if (props.developedAt === "Lab") {
    return [];
  }
  const { developer, fixer } = props.process.chemicals;
  return [
    {
      label: "developer",
      text: `${developer.name} (${developer.dilution})`
    },
    {
      label: "fixer",
      text: `${fixer.name} (${fixer.dilution})`
    },
    empty(),
    empty(),
    empty(),
    empty()
  ];
}
function li(label, key, data) {
  return { label, text: data[key] };
}
function empty() {
  return { label: "\xA0", text: "\xA0" };
}
const DataListItem = (props) => /* @__PURE__ */ jsxs("div", { className: "line", children: [
  /* @__PURE__ */ jsx("dt", { children: props.label }),
  /* @__PURE__ */ jsx("dd", { children: props.text })
] });
const DataList = (props) => {
  const items = props.items.map((item) => /* @__PURE__ */ jsx(DataListItem, { ...item }, Math.random()));
  return /* @__PURE__ */ jsx("dl", { className: cn("meta", props.className), children: items });
};
const cn = (...items) => {
  return items.flatMap((x) => x ? [x] : []).join(" ");
};
export const PageStyle = () => /* @__PURE__ */ jsx("style", { children: `
    html {
        font-family: monospace;
      }
      body {
        display: flex;
        margin: 0;
        width: 210mm;
        height: 297mm;
      }

      .content {
        margin: 24px;
        width: 100%;
      }

      .roll-id {
        display: flex;
        justify-content: center;
        font-weight: bold;
        padding: 4px 0;
        border-bottom: 1px solid;
      }

      .roll-data {
        border: 1px solid;
        --h: 18mm;
        height: var(--h);
        display: flex;
        flex-flow: row nowrap;
        box-sizing: content-box;
      }

      .col {
        display: flex;
        flex-flow: column nowrap;
      }

      .meta {
        margin: 0;
        font-size: 8px;
        display: flex;
        flex-flow: column wrap;
        justify-content: stretch;
        flex-grow: 1;
      }

      .line {
        max-width: 100%;
        display: flex;
        flex-flow: row nowrap;
        flex-grow: 1;
      }

      .line dt {
        white-space: nowrap;
        font-weight: bold;
        width: var(--dt-w);
        flex-shrink: 0;
        background: black;
        color: white;
        padding: 0 4px;
        display: flex;
        align-items: center;
      }

      .line dd {
        font-weight: bold;
        width: var(--dd-w);
        max-width: 100%;
        margin-inline-start: 4px;
        margin-inline-end: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-self: center;
      }

      .main dt {
        flex-grow: 1;
      }

      .main {
        --dt-w: 20mm;
        --dd-w: 60mm;
      }

      .dl2 {
        --dt-w: 20mm;
        --dd-w: 30mm;
      }

      .dl3 {
        --dt-w: 20mm;
        --dd-w: 40mm;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
  ` });
