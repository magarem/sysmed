import { useLoaderData } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import { redirect } from "@remix-run/node"; 
export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const id = search.get("id");
  const tipo = search.get("tipo");
  const qnt = search.get("qnt");
  console.log(id, tipo, qnt);
  let novoTotal
  const data = {
    medicamentos: await prisma.Medicamento.findUnique({
      where: {
        id: +id,
      },
    })
  }
 
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
  console.log(data2);

  const post = await prisma.Movimento.create({ data: {
    medicamentoId: +id,
    tipo: tipo,
    qnt: +qnt
  } });
   
  
  return data2
}