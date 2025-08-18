import { renderToStaticMarkup } from "react-dom/server";

export async function renderApp(props) {
  return renderToStaticMarkup(<App {...props} />);
}

function App(props) {
  const mainList = getMainList(props);
  const c2 = getCol2(props);
  const c3 = getCol3(props);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.rollId}</title>
      </head>
      <body>
        <PageStyle />
        <div className="content">
          <div className="roll-data">
            <div className="col">
              <div className="roll-id">{props.rollId}</div>
              <DataList className="main dl1" items={mainList} />
            </div>
            <div className="col">
              <DataList className="sub dl2" items={c2} />
            </div>
            <div className="col">
              <DataList className="sub dl3" items={c3} />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

function getMainList(props) {
  return [
    li("film stock", "filmStock", props),
    { label: "camera", text: props.camera.join(" ") },
    { label: "lens", text: props.lens.join(" ") },
  ];
}

function getCol2(props) {
  return [
    li("loaded", "loaded", props),
    li("developed", "developed", props),
    li("EL", "exposureIndex", props),
    li("box speed", "iso", props),
    li("developed at", "developedAt", props),
    li("location", "location", props),
  ];
}

function getCol3(props) {
  if (props.developedAt === "Lab") {
    return [];
  }

  const { developer } = props.process;
  return [
    {
      label: "developer",
      text: `${developer.name}`,
    },
    {
      label: "",
      text: `(${developer.dilution}, ${developer.time}, ${developer.t}°C)`,
    },
    empty(),
    empty(),
    empty(),
  ];
}

function li(label, key, data) {
  return { label, text: data[key] };
}

function empty() {
  return { label: "\xA0", text: "\xA0" };
}

const DataListItem = (props) => (
  <div className="line">
    <dt>{props.label}</dt>
    <dd>{props.text}</dd>
  </div>
);

const DataList = (props) => {
  const items = props.items.map((item) => (
    <DataListItem key={Math.random()} {...item} />
  ));

  return <dl className={cn("meta", props.className)}>{items}</dl>;
};

const cn = (...items) => {
  return items.flatMap((x) => (x ? [x] : [])).join(" ");
};

export const PageStyle = () => (
  <style>{`
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
        --dd-w: 20mm;
      }

      .dl3 {
        --dt-w: 20mm;
        --dd-w: 50mm;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
  `}</style>
);
