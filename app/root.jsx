import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";
import Error from "~/components/util/Error";
export const links = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: sharedStyles }]),
];

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "";
  let message = "";

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    title = error.statusText;
    message = error.data;
  } else {
    title = "something went wrong";
    message = error.message;
  }

  return (
    <Document title={title}>
      <main>
        <Error title={title}>
          <p>{message}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}
