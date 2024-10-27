import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import Grid from '@mui/material/Grid2'

function App() {
  return (
    <Router>
      <nav>
        <Grid container>
          <Grid size={2.5}>
            <Link to="/" className='title'>Impacto Solidário</Link>
          </Grid>
          <Grid size={1}>
            <Link to="/">Home</Link>
          </Grid>
          <Grid size={2}>
            <Link to="/">Cadastrar iniciativa</Link>
          </Grid>
          <Grid size={2}>
            <Link to="/vacancy">Vagas para voluntários</Link>
          </Grid> 
          <Grid size={2.5}>
            <img src='https://cdn-icons-png.flaticon.com/512/2866/2866321.png' alt='lupa' className='img'/> 
            <input type='text' placeholder='Busque por uma vaga...' /> 
          </Grid>
          <Grid size={2}>
            <Link to='/login'>
              Faça login ou cadastre-se 
              <img src='https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png' alt='login' className='img'/>
            </Link>
          </Grid>
        </Grid>
      </nav>
      <body>
        <AppRoutes />
      </body>
      <footer>
        <div>
          <Grid container spacing={4}>
            <Grid size={2}>
              <b>SOBRE NÓS</b> <br/><br/>
              Nossa missão é conectar voluntários e ONGs para fortalecer causas e promover um impacto positivo, para assim construir um mundo mais justo.
            </Grid>
            <Grid size={1}></Grid>
            <Grid size={3}>
              <b>NAVEGAÇÃO</b> <br/><br/>
              <Link to=''>Início</Link> <br/>
              <Link to=''>Cadastrar Iniciativa</Link> <br/>
              <Link to=''>Vagas para Voluntários</Link> 
            </Grid>
            <Grid size={3}>
              <b>PARA ONGS</b> <br/><br/>
              <Link to=''>Cadastre sua ONG</Link> <br/>
              <Link to=''>Como atrair voluntários</Link> <br/>
              <Link to=''>Parcerias</Link> <br/>
              <Link to=''>Suporte técnico</Link> 
            </Grid>
            <Grid size={3}>
              <b>TERMOS E POLÍTICAS</b> <br/><br/>
              <Link to=''>Termos de uso</Link> <br/>
              <Link to=''>Política de privacidade</Link> <br/>
              <Link to=''>Política de cookies</Link> 
            </Grid>
          </Grid>
        </div>
      </footer>
    </Router>
  );
}

export default App;
