import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import './Login.css';

const Login = () => {
  return (
    <div className='background-login'>
      <hr/>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid size={4}>
          <Card className='card'>
            <CardContent>
              <h1>LOGIN</h1>
              <br/><br/>
              <label>E-mail</label>
              <br/><br/>
              <input type='text' placeholder='E-mail'/> 
              <br/><br/>
              <label>Senha</label>
              <br/><br/>
              <input type='text' placeholder='Senha'/>
            </CardContent><br/>
            <Button variant='contained' color='secondary'>Entrar</Button>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card className='card'>
            <CardContent>
              <h1>CADASTRO</h1>
              <div className='card2'>
                <Grid container rowSpacing={4} justifyContent="center" alignItems="center">
                  <Grid size={5}>
                    <label>Nome</label>
                    <input type='text' placeholder='Nome' className='input'/>
                  </Grid>  
                  <Grid size={5}>
                    <label>CPF</label><br/>
                    <input type='text' placeholder='CPF' className='input'/>
                  </Grid>  
                  <Grid size={5}>
                    <label>E-mail</label>
                    <input type='text' placeholder='E-mail' className='input'/>
                  </Grid>
                  <Grid size={5}>
                    <label>Senha</label>
                    <input type='text' placeholder='Senha' className='input'/>
                  </Grid>
                </Grid>
              </div>
            </CardContent><br/>
            <Button variant='contained' color='secondary'>Cadastrar</Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;