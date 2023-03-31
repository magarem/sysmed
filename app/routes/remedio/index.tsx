
import { Link, useLoaderData, LoaderFunction, useNavigate } from "@remix-run/react";
import prisma from '~/lib/db.server'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef } from "react";
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

/**
 * check the user to see if there is an active session, if not
 * redirect to login page
 *
 * @param param0
 * @returns
 */
export let loader: LoaderFunction = async ({ request }: any) => {
  console.log(22);
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log(11);
  const data = {
    medicamentos: await prisma.Medicamento.findMany({orderBy: [
      {
        id: 'desc',
      }
    ]}),
  }
  return data
  
};
// export const loader = async () => {
//   const data = {
//     medicamentos: await prisma.Medicamento.findMany(),
//   }
//   return data
// }

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
      </body>
    </html>
  );
}

export default function Index() {
  const { medicamentos } = useLoaderData()
  
  const [open, setOpen] = React.useState(false);
  const [txt, setTxt] = React.useState('dd');
  const [obj, setObj] = React.useState({});
  const [auxVal, setAuxVal] = React.useState(null);
  const handleOpen = (x: any, obj: any) => loadModal(x, obj);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  // const inputRef = useRef(null);
  const focusMe_Ref = useRef(null);
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
  
  // useEffect(() => {
  //   focusMe_Ref.current.focus();  // 2. startup
  // }, []);

  return (
    <div className="text-3xl font-bold underline" style={{ width: '100%', padding: '30px' }}>
       <Modal
          // sx={{width: '100px'}}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {txt} de medicamento<br/>Código: {obj.codigo}<br/>Nome: {obj.nome} <br/>Total: {obj.total}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField  inputRef={focusMe_Ref} size="small" placeholder="Quantidade" type="text" name="valor" id="valor" onChange={handleChange} onKeyDown={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                do_movi(obj.id, txt.toLowerCase(), auxVal)
                ev.preventDefault();
              }
            }}/>
            {/* <Button variant="text" onClick={go}>OK</Button> */}
            {/* <Link onClick={alert(1)} to={`movi?id=${obj.id}&tipo=${txt.toLowerCase()}&qnt=${auxVal}`}> Ok </Link> */}
            <br/><br/><Button variant="contained" onClick={()=>do_movi(obj.id, txt.toLowerCase(), auxVal)}>OK</Button> <Button variant="contained" onClick={handleClose}>Cancelar</Button>
            </Typography>
          </Box>
        </Modal>
        <div >
      <TableContainer component={Paper} >
      
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align="left"><h2>Medicamentos</h2>
            </TableCell>
            <TableCell colSpan={4} align="right">
            <Button variant="contained" onClick={() => navigate("new")}>Incluir novo</Button>

            </TableCell>
          </TableRow>
         
          <TableRow>
            {/* <TableCell>Editar</TableCell> */}
            <TableCell align="center">Código</TableCell>
            <TableCell align="left">Nome</TableCell>
            {/* <TableCell align="right">Unidade</TableCell>  */}
            {/* <TableCell align="right">Fornecedor</TableCell> */}
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Entrada</TableCell>
            <TableCell align="center">Saída</TableCell>
            <TableCell align="center">Movimento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicamentos.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell align="right">
              <Button variant="text" onClick={() => navigate(`/remedio/show?id=${row.id}`)}>Editar</Button>
              </TableCell> */}
              <TableCell component="th" scope="row">
              <Button variant="text" onClick={() => navigate(`/remedio/show?id=${row.id}`)}>
                {row.id}</Button></TableCell>
              <TableCell align="left">
                  {row.nome} 
              </TableCell>
              {/* <TableCell align="right">{row.unidade} </TableCell> */}
              {/* <TableCell align="right">{row.fornecedor}</TableCell> */}
              <TableCell align="left">{row.total}</TableCell>
              <TableCell align="left"><Button variant="text" onClick={()=>handleOpen('Entrada', row)}>Entrada</Button></TableCell>
             <TableCell align="left"><Button variant="text" onClick={()=>handleOpen('Saida', row)}>Saída</Button></TableCell>
             <TableCell align="left"><Button variant="text" onClick={() => navigate("/movimento?medicamento=" + row.id)}>Histórico</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  )
}