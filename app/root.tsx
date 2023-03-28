import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "./components/nav";

import type { MetaFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import authenticator from "~/services/auth.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        
      </head>
      <body>
      <NavBar /><br/>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        </ThemeProvider>
      </body>
    </html>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
      // href: "https://getbootstrap.com/docs/5.0/dist/css/bootstrap.min.css"
      
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      
    }



  ]; 
} 



// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: stylesheet },
// ];