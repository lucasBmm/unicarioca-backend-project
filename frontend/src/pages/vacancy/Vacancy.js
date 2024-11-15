import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { AxiosError } from "axios";
import httpClient from "../../shared/http-client/http-client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vacancy.css';

const Vacancy = () => {
  const [jobListings, setJobListings] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleInscricao = (vacancyTitle) => {
    if(token) {
      localStorage.setItem('vacancyTitle', vacancyTitle);
      navigate('/vacancy-enter');
    } else {
        localStorage.setItem('showMessage', 'true');
        navigate('/login');
    }
  };

  const filteredJobListings = jobListings.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase()) ||
    job.requirements.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  const getVacancies = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await httpClient.get("vacancies", { token }); 
      setJobListings(result.data); 

    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("Erro ao carregar dados");
      }
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  return (
    <div className='background-vacancy'>
      <hr/>
      <div className='title-vacancy'>
        <span style={{ fontSize: '40px' }}>VAGAS</span>
        <br/><br/>
        <span>{jobListings.length} vagas abertas no momento</span><br/><br/>
        <TextField
          label="Busque por uma vaga, localização, requisitos ou descrição..."
          variant="outlined"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            width: '40%',
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            },
          }}
        />
      </div>
      <Grid container spacing={2} justifyContent="center">
        {filteredJobListings.map((job, index) => (
          <Grid item xs={3} sm={3} md={3} key={index} style={{ display: 'flex' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardContent className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                <div>
                  <h3>{job.title}</h3>
                  <p><strong>Descrição: </strong>{job.description}</p>
                  <p><strong>Requisitos:</strong> {job.requirements}</p>
                  <p><strong>Localização:</strong> {job.location}</p>
                </div>
                <Button variant="contained" color="secondary" onClick={() => handleInscricao(job.title)}>Inscrição</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Vacancy;