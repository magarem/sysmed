import {
    Form,
    useLoaderData,
  } from "@remix-run/react";

  import { json, ActionFunction,
    LoaderFunction } from "@remix-run/node"
  import authenticator from "~/services/auth.server";
  import { sessionStorage } from "~/services/session.server";
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';
  /**
   * called when the user hits button to login
   *
   * @param param0
   * @returns
   */
  export const action: ActionFunction = async ({ request, context }) => {
    // call my authenticator
    const resp = await authenticator.authenticate("form", request, {
      successRedirect: "/remedio",
      failureRedirect: "/login",
      throwOnError: true,
      context,
    });
    console.log(resp);
    return resp;
  };
  
  /**
   * get the cookie and see if there are any errors that were
   * generated when attempting to login
   *
   * @param param0
   * @returns
   */
  export const loader: LoaderFunction = async ({ request }) => {
  
    await authenticator.isAuthenticated(request, {
      successRedirect : "/"
    });
  
    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
  
    const error = session.get("sessionErrorKey");
    return json<any>({ error });
  };
  
  /**
   *
   * @returns
   */
  export default function LoginPage() {
    // if i got an error it will come back with the loader data
    const loaderData = useLoaderData();
    console.log(loaderData);
    return (

      <div style={{ margin: '20px', fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Bem vindo</h1>
        
          <h2>Identificação</h2><br/>
        
        <Form method="post">
          <TextField size="small" name="email" placeholder="email" required /><br/><br/>
          <TextField size="small" 
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          /><br/><br/>
          <Button variant="contained" type="submit">Entrar</Button>
        </Form>
        <div><br/>
          {loaderData?.error ? <p>Erro de Identificação: {loaderData?.error?.message}</p> : null}
        </div>
      </div>
    );
  }