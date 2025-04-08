import { renderToStaticMarkup } from "react-dom/server";

function App(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=z" />
        <title>Document</title>
      </head>
      <body>
        <h1>Hello mom</h1>
      </body>
    </html>
  );
}

export function renderApp(props) {
  return renderToStaticMarkup(<App {...props} />);
}
