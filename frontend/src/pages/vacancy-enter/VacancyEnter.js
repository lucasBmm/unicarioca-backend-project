import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Alert, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import httpClient from "../../shared/http-client/http-client";
import '../vacancy-register/VacancyRegister.css';

const VacancyEnter = () => {
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [positionInput, setPosition] = useState("");
  const [nomeInput, setNome] = useState("");
  const [telefoneInput, setTelefone] = useState("");
  const [emailInput, setEmail] = useState("");
  const [formValid, setFormValid] = useState(null);
  const [open, setOpen] = useState(false);
  const [formValidSuccess, setFormValidSuccess] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    setVacancyTitle(localStorage.getItem('vacancyTitle'));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenSuccess(false);
  };

  const clearFields = () => {
    setPosition('');
    setNome('');
    setEmail('');
    setTelefone('');
  }

  const handleVacancyEnter = async (e) => {
    
    if (!positionInput || !nomeInput || !telefoneInput || !emailInput) {
      setFormValid("Por favor, preencha todos os campos.");
      setOpen(true);
      return;
    }

    const token = localStorage.getItem("token");
    var ownerId = null;

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(atob(base64));
      ownerId = decodedData.user_id; 
    }  
    
    const registerEnterVacancyPayload = {
      owner: ownerId,
      vacancy: vacancyTitle,
      interested: nomeInput,
      position: positionInput,
      phone: telefoneInput,
      email: emailInput
    };

    try {
      await httpClient.post("volunteer/applications", registerEnterVacancyPayload);
      setFormValidSuccess("Inscrição realizada com sucesso!");
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
              <h1>CADASTRO PARA VAGA: {vacancyTitle}</h1>
              <div className='card2'>
                <Grid container rowSpacing={4} justifyContent="center" alignItems="center">
                  <Grid size={5}>
                    <label>Nome</label><br/>
                    <input type="text" placeholder="Nome" className="input" value={nomeInput} onChange={(e) => setNome(e.target.value)}/>
                  </Grid>
                  <Grid size={5}>  
                    <label>Profissão</label>
                    <input type="text" placeholder="Profissão" className="input" value={positionInput} onChange={(e) => setPosition(e.target.value)}/>
                  </Grid>  
                  <Grid size={5}>
                    <label>Telefone</label>
                    <input type="text" placeholder="Telefone" className="input" value={telefoneInput} onChange={(e) => setTelefone(e.target.value)}/>
                  </Grid>
                  <Grid size={5}>
                    <label>E-mail</label>
                    <input type="text" placeholder="E-mail" className="input" value={emailInput} onChange={(e) => setEmail(e.target.value)}/>
                  </Grid>
                </Grid>
              </div>
            </CardContent><br/>
            <Button variant="contained" color="secondary" onClick={(e) => handleVacancyEnter(e.target.value)}>Cadastrar</Button> {/* TODO: ver como fazer para mandar id de um componente a outro */}
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

export default VacancyEnter;