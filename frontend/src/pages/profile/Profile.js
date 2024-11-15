import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { AxiosError } from "axios";
import httpClient from "../../shared/http-client/http-client";
import { useEffect, useState } from 'react';
import '../vacancy/Vacancy.css';

const Profile = () => {
  const [jobListings, setJobListings] = useState([]);

  const token = localStorage.getItem("token");
    var ownerId = null;

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(atob(base64));
      ownerId = decodedData.user_id; 
    }  

  const getVacancies = async () => {
    try {
      const result = await httpClient.get("/volunteer/applications/" + ownerId); 
      setJobListings(result.data.applications); 

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
        <span style={{ fontSize: '40px' }}>Inscrições</span>
        <br/><br/>
        <span>{jobListings.length} Inscrições recebidas no momento</span>
      </div>
      <Grid container spacing={2} justifyContent="center">
        {jobListings.map((job, index) => (
          <Grid item xs={3} sm={3} md={3} key={index} style={{ display: 'flex' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardContent id="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                <div>
                  <h3>{job.vacancy}</h3>
                  <p><strong>Pessoa inscrita:</strong> {job.interested}</p>
                  <p><strong>Profissão:</strong> {job.position}</p>
                  <p><strong>Telefone:</strong> {job.phone}</p>
                  <p><strong>E-mail:</strong> {job.email}</p>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;