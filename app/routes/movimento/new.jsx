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

   export const action = async ({ request }) => {
     const form = await request.formData();
     const codigo = form.get("codigo");
     const nome = form.get("nome");
     const fornecedor = form.get("fornecedor");
     const descricao = form.get("descricao");
     const total = +form.get("total");
     const fields = { codigo, nome, fornecedor, descricao, total };
   
     const post = await prisma.Medicamento.create({ data: fields });
   
     return redirect(`/post`);
   };
   
   function NewItem() {
     return (
      <div style={{marginLeft: "20px"}}>
   <form method="POST">
         <div className="card-header">
           <h1>New Post</h1>
           <Link to="/posts" className="btn btn-danger">
             Back
           </Link>
         </div>
   
         
   


    <TableContainer component={Paper} sx={{ width: 350 }}>
      <Table sx={{ width: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Código</TableCell>
            <TableCell align="right"><input type="text" name="codigo" id="codigo" /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Nome</TableCell>
            <TableCell align="right"><input type="text" name="nome" id="nome" /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">descricao</TableCell>
            <TableCell align="right"><textarea name="descricao" id="descricao" /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Title</TableCell>
            <TableCell align="right"><input type="text" name="fornecedor" id="fornecedor" /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right"><textarea name="total" id="total" /></TableCell>
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