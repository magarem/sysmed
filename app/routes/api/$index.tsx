import { LoaderFunction } from "@remix-run/node"

// $name.tsx
export const loader: LoaderFunction = async ({request, params}) => {
  // url = /some_internal_id/some_name
  console.log(request);
  return <h1>{JSON.stringify(request)}</h1>
}