
   import { redirect } from "@remix-run/node";
   import { Link, useLoaderData } from "@remix-run/react";
   import prisma from '~/lib/db.server'
   import Button from '@mui/material/Button';

   import TextField from '@mui/material/TextField';

   import Table from '@mui/material/Table';
   import TableBody from '@mui/material/TableBody';
   import TableCell from '@mui/material/TableCell';
   import TableContainer from '@mui/material/TableContainer';
   import TableHead from '@mui/material/TableHead';
   import TableRow from '@mui/material/TableRow';
   import Paper from '@mui/material/Paper';

   export const loader = async ({ request }: any) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const data = {
      medicamento: await prisma.Medicamento.findUnique({
        where: {id: +id}
      })
    }
    return data
  }
  
  export const action = async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");
    const codigo = form.get("codigo");
    const nome = form.get("nome");
    const unidade = form.get("unidade");
    const fornecedor = form.get("fornecedor")||'';
    const descricao = form.get("descricao");
    const total = +form.get("total");
    const fields = { codigo, nome, unidade, descricao, fornecedor, total };
   

    // const post = await prisma.Medicamento.create({ data: fields });
  

    const updateUser = await prisma.Medicamento.update({
      where: {
        id: +id,
      },
      data: fields,
    })


    return redirect(`/remedio`);
  };
  
   
   function ShowItem() {
    const { medicamento } = useLoaderData()
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
              <input type="hidden" name="id" id="id" defaultValue={medicamento.id} />
              <TextField  size="small" id="outlined-basic" name="codigo" id="codigo"  variant="outlined" defaultValue={medicamento.codigo}/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Nome</TableCell>
            <TableCell align="left">
              <TextField  size="small" id="outlined-basic" name="nome" id="nome"   defaultValue={medicamento.nome} />
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Unidade</TableCell>
            <TableCell align="left">
              <TextField  size="small" id="outlined-basic" name="unidade" id="unidade"   defaultValue={medicamento.unidade}/>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Descrição</TableCell>
            <TableCell align="left">
              <TextField  size="small" id="outlined-basic" name="descricao" id="descricao"   defaultValue={medicamento.descricao}/>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Fornecedor</TableCell>
            <TableCell align="left">
            <TextField  size="small"    id="outlined-basic" name="fornecedor" id="fornecedor"  defaultValue={medicamento.fornecedor}/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Total</TableCell>
            <TableCell align="left">
            <TextField  size="small" id="outlined-basic" name="total" id="total" defaultValue={medicamento.total}/>
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
   
   export default ShowItem;