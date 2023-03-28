// import Button from 'react-bootstrap/Button';
// export default function Index() {
//     return (
//      <div>
//         <h2>Novo medicamento</h2>
//         <form action="/post/new" method="GET">
//         Nome: <input type="string" name="nome" />
//         <input type="submit" value="Get Posts" />
//         <Button variant="primary">Primary</Button>{' '}
//         </form>
//      </div>
//     );
//    }



   import { redirect } from "@remix-run/node";
   import { Link } from "@remix-run/react";
   import  prisma from '~/lib/db.server'
   import Button from '@mui/material/Button';


   import Table from '@mui/material/Table';
   import TableBody from '@mui/material/TableBody';
   import TableCell from '@mui/material/TableCell';
   import TableContainer from '@mui/material/TableContainer';
   import TableHead from '@mui/material/TableHead';
   import TableRow from '@mui/material/TableRow';
   import Paper from '@mui/material/Paper';
   import TextField from '@mui/material/TextField';

   export const action = async ({ request }) => {
     const form = await request.formData();
     const codigo = form.get("codigo");
     const nome = form.get("nome");
     const fornecedor = form.get("fornecedor");
     const descricao = form.get("descricao");
     const unidade = form.get("unidade");
     const total = +form.get("total");
     const fields = { codigo, nome, descricao, unidade, fornecedor, total };
   
     const post = await prisma.Medicamento.create({ data: fields });
   
     return redirect(`/remedio`);
   };
   
   function NewItem() {
     return (
      <div style={{marginLeft: "20px"}}>
        <form method="POST">
    <TableContainer component={Paper} sx={{ width: 350 }}>
      <Table sx={{ width: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colspan="2" align="center"><h2>Novo medicamento</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Código</TableCell>
            <TableCell align="left">
              <TextField  size="small"id="outlined-basic" name="codigo" id="codigo"  variant="outlined" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Nome</TableCell>
            <TableCell align="left">
              <TextField  size="small"id="outlined-basic" name="codigo" id="codigo"   name="nome" id="nome" />
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Descrição</TableCell>
            <TableCell align="left">
              <TextField  size="small"id="outlined-basic" name="descricao" id="descricao"   />
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Unidade</TableCell>
            <TableCell align="left">
              <TextField  size="small"id="outlined-basic" name="unidade" id="unidade"   />
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Fornecedor</TableCell>
            <TableCell align="left">
            <TextField  size="small"id="outlined-basic" name="fornecedor" id="fornecedor"    />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Total</TableCell>
            <TableCell align="left">
            <TextField  size="small"id="outlined-basic" name="total" id="total" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colspan="2" align="center"><Button  variant="contained" type="submit" className="btn btn-success">
             Salvar
           </Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>


        
      
           </form>
       </div>
       
     );
   }
   
   export default NewItem;