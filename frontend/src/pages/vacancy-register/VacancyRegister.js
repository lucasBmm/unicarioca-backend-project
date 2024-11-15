import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Alert, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import { AxiosError } from 'axios';
import httpClient from "../../shared/http-client/http-client";
import './VacancyRegister.css';

const VacancyRegister = () => {
  const [positionInput, setPositionInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [formValid, setFormValid] = useState(null);
  const [open, setOpen] = useState(false);
  const [formValidSuccess, setFormValidSuccess] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenSuccess(false);
  };

  const clearFields = () => {
    setPositionInput('');
    setDescriptionInput('');
    setLocationInput('');
    setRequirementsInput('');
  }

  const handleVacancyRegister = async (e) => {
    e.preventDefault();
    
    if (!positionInput || !descriptionInput || !requirementsInput || !locationInput) {
      setFormValid("Por favor, preencha todos os campos.");
      setOpen(true);
      return;
    }
    
    const registerVacancyPayload = {
      title: positionInput,
      requirements: requirementsInput,
      description: descriptionInput,
      location: locationInput,
    };

    try {
      await httpClient.post("vacancies", registerVacancyPayload);
      setFormValidSuccess("Vaga cadastrada com sucesso!");
      setOpenSuccess(true);

      clearFields();
    } catch (e) {
      if (e instanceof AxiosError) {
        setFormValid(e.response.data.error);
        setOpen(true);
      }
    }
  };

  return (
    <div className="background-vacancy-register">
      <hr/>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid size={4}>
          <Card className='card'>
            <CardContent>
              <h1>CADASTRE UMA VAGA</h1>
              <div className='card2'>
                <Grid container rowSpacing={4} justifyContent="center" alignItems="center">
                  <Grid size={5}>
                    <label>Profissão</label>
                    <input type="text" placeholder="Profissão" className="input" value={positionInput} onChange={(e) => setPositionInput(e.target.value)}/>
                  </Grid>  
                  <Grid size={5}>
                    <label>Descrição</label><br/>
                    <input type="text" placeholder="Descrição" className="input" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}/>
                  </Grid>  
                  <Grid size={5}>
                    <label>Requisitos</label>
                    <input type="text" placeholder="Requisitos" className="input" value={requirementsInput} onChange={(e) => setRequirementsInput(e.target.value)}/>
                  </Grid>
                  <Grid size={5}>
                    <label>Localização</label>
                    <input type="text" placeholder="Localização" className="input" value={locationInput} onChange={(e) => setLocationInput(e.target.value)}/>
                  </Grid>
                </Grid>
              </div>
            </CardContent><br/>
            <Button variant="contained" color="secondary" onClick={handleVacancyRegister}>Cadastrar</Button>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {formValid && <span className="error-message">{formValid}</span>}
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {formValidSuccess && <span className="error-message">{formValidSuccess}</span>}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VacancyRegister;