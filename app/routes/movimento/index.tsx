
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import prisma from '~/lib/db.server'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react";
import { useRevalidator } from 'react-router-dom';

import authenticator from "~/services/auth.server";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const loader = async ({ request }: any) => {

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const medicamento = search.get("medicamento")
  let data
  if (medicamento){
     data = {
      movimentos: await prisma.Movimento.findMany({
        where: {
          medicamentoId: +medicamento,
        },
        include: {
                  medicamento: true,
                }
      })
    }
  }else{
     data = {
      movimentos: await prisma.Movimento.findMany({
        include: {
                  medicamento: true,
                }
      })
    }
}
 
  return data
}



// export const loader = async () => {
//   const data = {
//     movimentos: await prisma.Movimento.findMany({
//       // bring back the related B's
//       include: {
//         medicamento: true,
//       },
//     }),
//   }
//   return data
// }


const go_movi = (id, op, val) => {
  router.navigate("/page")
}


export default function Index() {
  const { movimentos } = useLoaderData()
  
  const [open, setOpen] = React.useState(false);
  const [txt, setTxt] = React.useState('dd');
  const [obj, setObj] = React.useState({});
  const [auxVal, setAuxVal] = React.useState(null);
  const handleOpen = (x: any, obj: any) => loadModal(x, obj);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const do_movi = async (id, tipo, qnt) => {
    console.log(id, tipo, qnt);
    let res = await fetch(`/api/movi?id=${id}&tipo=${tipo}&qnt=${qnt}`)
    console.log(11, await res.json());
    // revalidator.revalidate()
    setOpen(false)
    navigate('.', { replace: true })
  }
  const loadModal = (val: any, obj: any) => {
      setObj(obj)
      setTxt(val)
      setOpen(true)
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setAuxVal(event.target.value);
  };
  
  

const mudaData = (d) => {
  let options = {     
    dateStyle: ('full' || 'long' || 'medium' || 'short' ), 
    timeStyle: ('full' || 'long' || 'medium' || 'short' ), 
}
  return new Date(d).toLocaleDateString('pt-br')
}
  return (
    <div className="text-3xl font-bold underline">
      
      <TableContainer component={Paper}>
     
      <Table sx={{ width: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right">Data</TableCell>
          <TableCell align="right">Medicamento</TableCell>
            <TableCell align="right">Movimento</TableCell>
            <TableCell align="right">Quantidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movimentos.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{mudaData(row.createdAt)}</TableCell>

              <TableCell align="right">{row.medicamento.codigo} - {row.medicamento.nome}</TableCell>
              {/* <TableCell align="right">{row.descricao}</TableCell> */}
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.qnt}</TableCell>
              {/* <TableCell align="right"><Button variant="text" onClick={()=>handleOpen('Entrada', row)}>Entrada</Button></TableCell>
              <TableCell align="right"><Button variant="text" onClick={()=>handleOpen('Saida', row)}>Saída</Button></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}