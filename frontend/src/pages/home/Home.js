import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './Home.css';

const Home = () => {
  return (
    <div className='background-home'>
      <hr/>
      <div className='container-home'>
        <h1 id='home-title'>Oportunidades em todo o Brasil!</h1>
        <p>Conectando pessoas que querem fazer a diferença com causas que precisam de apoio.</p>
        <Button variant="contained" color="secondary" href="../vacancy" id='home-button'>Ver vagas disponíveis</Button>
        <div> 
          <Grid container className='home-container'>
            <Grid size={2}>
              <span className='span-home'>| +200</span><br/>
              <span>voluntários cadastrados</span>
            </Grid>
            <Grid size={2}>
              <span className='span-home'>| +1000 </span><br/>
              <span>vagas de voluntariado</span>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;