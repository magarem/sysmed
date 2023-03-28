

import { useLoaderData } from "@remix-run/react";
import  prisma from '~/lib/db.server'

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const nome = search.get("nome");
  const user = await prisma.Medicamento.create({
      data: {
        codigo: 'sd3f',
        nome: nome,
        fornecedor: 'magalabs',
        descricao: 'ttt',
        total: 10000,
      },
    })
  const data = {
    medicamentos: await prisma.Medicamento.findMany(),
  }
  return data
}


export default function Index() {
  const { medicamentos } = useLoaderData()
  return (
    <>
      <div>
        <h1>Medicamentos na farmácia</h1>
      </div>
      <ul>
        {medicamentos.map((item) => (
          <li key={item.id}>
            <h1>{item.nome}</h1>
            <p>{item.total}</p>
          </li>
        ))}
      </ul>
    </>
  )
}