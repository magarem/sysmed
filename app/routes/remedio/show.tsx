
   import { redirect } from "@remix-run/node";
   import { useLoaderData, useSubmit } from "@remix-run/react";
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
   import {  Stack } from "@mui/material";
import { useState } from "react";

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
  
  export const action = async ({ request }: any) => {
    const form = await request.formData();
    console.log(form.get("intent"))
    
    if (form.get("intent")=='save') {
      const id = form.get("id");
      const codigo = form.get("codigo");
      const nome = form.get("nome");
      const unidade = form.get("unidade");
      const fornecedor = form.get("fornecedor")||'';
      const descricao = form.get("descricao");
      const total = +form.get("total");
      const fields = { codigo, nome, unidade, descricao, fornecedor, total };
    
      await prisma.Medicamento.update({
          where: {
            id: +id,
          },
          data: fields
        })
      }

      if (form.get("intent")=='delete') {
        await prisma.Movimento.deleteMany({
          where: {
            medicamentoId: +form.get("id")
          }
      })
        await prisma.Medicamento.delete({
        where: {
          id: +form.get("id")
        }
      })
      console.log("deleted!");
      
    }

    return redirect(`/remedio`);
  };
  
   
   function ShowItem() {
    const { medicamento } = useLoaderData()
    let submit = useSubmit();
   
     return (
      <div style={{marginLeft: "20px"}}>
      <form method="POST">
    <TableContainer component={Paper} sx={{ width: 350 }}>
      <Table sx={{ width: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan="2" align="center"><h2>Novo medicamento</h2></TableCell>
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
            <TableCell colSpan={2} align="center">
            <Stack spacing={2} direction="row">
              <Button  variant="contained" type="submit" name="intent" value="save">
                Salvar
              </Button>
              <Button variant="contained" type="submit" name="intent" value="delete"  onClick={(event) => {
                  event.preventDefault();
                  if (confirm('Confirma exclusão?')){
                    submit(event.target)
                  }
                }}>
                Excluir
              </Button>
              
              <Button href="/remedio" variant="contained" >
                Cancelar
              </Button>
              </Stack>
           </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
           </form>
       </div>
       
     );
   }
   
   export default ShowItem;