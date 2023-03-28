

import { useLoaderData } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import { redirect } from "@remix-run/node"; 
export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const id = search.get("id");
  const data = {
    medicamentos: await prisma.Medicamento.findUnique({
      where: {
        id: +id,
      },
    })
  }
  const tipo = search.get("tipo");
  const qnt = search.get("qnt");
  if (tipo=="entrada"){
    novoTotal = +data.medicamentos.total + (+qnt)
  }
  if (tipo=="saida"){
    novoTotal = +data.medicamentos.total - (+qnt)
  }
  const updateUser = await prisma.Medicamento.update({
    where: {
      id: +id,
    },
    data: {
      total: +novoTotal,
    },
  })

  

  const data2 = {
    medicamentos: await prisma.Medicamento.findMany(),
  }
  return redirect("/post")
}


// export default function Index() {
//   const { medicamentos } = useLoaderData()
//   return (
//     <>
//       <div>
//         <h1>Medicamentos na farmácia</h1>
//       </div>
//       <ul>
//         {medicamentos.map((item) => (
//           <li key={item.id}>
//             <h1>{item.nome}</h1>
//             <p>{item.total}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }