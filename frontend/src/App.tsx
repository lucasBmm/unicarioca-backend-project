import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

function App() {
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState("");
  const [formValid, setFormValid] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUserName(storedUsername);

    }
  }, []);

  const handleLogin = () => {
    setFormValid("Por favor, faça o login primeiro.");
    setOpen(true);
  }
  
  const handleLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <nav>
        {token ? (
          <Grid container>
            <Grid size={2.5}>
              <Link to='/' className='title'>Impacto Solidário</Link>
            </Grid>
            <Grid size={1}>
              <Link to='/'>Home</Link>
            </Grid>
            <Grid size={1.5}>
              <Link to='/vacancy-register'>Cadastrar vaga</Link>
            </Grid>
            <Grid size={2}>
              <Link to='/vacancy'>Vagas para voluntários</Link>
            </Grid> 
            <Grid size={2.5}>
            </Grid>
            <Grid size={1}>
              <Link to='/profile'>
                {userName}
              </Link>
              <Link to='/profile'>
                <img src='https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png' alt='login' className='img'/>
              </Link>
            </Grid>
            <Grid size={1}>
              <Link to='/' onClick={handleLogout}>
                Logout
              </Link>
              <Link to='/' onClick={handleLogout}><img src='https://e7.pngegg.com/pngimages/685/81/png-clipart-computer-icons-encapsulated-postscript-others-miscellaneous-cdr-thumbnail.png' alt='logout' className='img'/></Link>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid size={2.5}>
              <Link to='/' className='title'>Impacto Solidário</Link>
            </Grid>
            <Grid size={1}>
              <Link to='/'>Home</Link>
            </Grid>
            <Grid size={1.5}>
              <Link to='/login' onClick={handleLogin}>Cadastrar vaga</Link>
            </Grid>
            <Grid size={2}>
              <Link to='/vacancy'>Vagas para voluntários</Link>
            </Grid> 
            <Grid size={2.5}>
            </Grid>
            <Grid size={2}>
              <Link to='/login'>
                Faça login ou cadastre-se 
                <img src='https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png' alt='login' className='img'/>
              </Link>
            </Grid>
          </Grid>
        )}
      </nav>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {formValid && <span className="error-message">{formValid}</span>}
        </Alert>
      </Snackbar>
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
