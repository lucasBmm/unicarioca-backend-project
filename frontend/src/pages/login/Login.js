import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid2';
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import httpClient from "../../shared/http-client/http-client";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [cpfInput, setCpfInput] = useState("");
  const [registerEmailInput, setRegisterEmailInput] = useState("");
  const [registerPasswordInput, setRegisterPasswordInput] = useState("");
  const [formValid, setFormValid] = useState(null);
  const [open, setOpen] = useState(false);
  const [formValidSuccess, setFormValidSuccess] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const showMessage = localStorage.getItem('showMessage');
    if (showMessage) {
      setFormValid("Por favor, faça o login primeiro.");
      setOpen(true);
      localStorage.removeItem('showMessage'); 
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenSuccess(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!emailInput) {
      setFormValid("Email inválido.");
      setOpen(true);
      return false;
    }

    if (passwordInput.length < 5) {
      setFormValid("A senha precisa ter pelo menos 5 caracteres.");
      setOpen(true);
      return false;
    }
    
    const loginUserPayload = {
      email: emailInput,
      senha: passwordInput,
    };

    try {
      const result = await httpClient.post("volunteers/login", loginUserPayload);
      const username = result.data.username;
      const token = result.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", username);
      navigate('/');
      window.location.reload();
    } catch (e) {
      if (e instanceof AxiosError) {
        setFormValid(e.response.data.error);
        setOpen(true);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerEmailInput) {
      setFormValid("Email inválido.");
      setOpen(true);
      return false;
    }

    if (registerPasswordInput.length < 5) {
      setFormValid("A senha precisa ter pelo menos 5 caracteres.");
      setOpen(true);
      return false;
    }

    if (!nameInput || !cpfInput) {
      setFormValid("Por favor, preencha todos os campos.");
      setOpen(true);
      return;
    }

    const registerUserPayload = {
      username: nameInput,
      cpf: cpfInput,
      email: registerEmailInput,
      senha: registerPasswordInput,
    };

    try {
      await httpClient.post("volunteers", registerUserPayload);
      setFormValidSuccess("Cadastro realizado com sucesso! Faça login.");
      setOpenSuccess(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        setFormValid(e.response.data.error);
        setOpen(true);
      }
    }
  };

  return (
    <div className="background-login">
      <hr/>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Login Card */}
        <Grid size={4}>
          <Card className='card'>
            <CardContent>
              <h1>LOGIN</h1>
              <br/><br/>
              <label>E-mail</label>
              <br/><br/>
              <input type="text" placeholder="E-mail" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
              <br/><br/>
              <label>Senha</label>
              <br/><br/>
              <input type="password" placeholder="Senha" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
            </CardContent><br/>
            <Button variant='contained' color='secondary' onClick={handleLogin}>Entrar</Button>
          </Card>
        </Grid>
        {/* Register Card */}
        <Grid size={4}>
          <Card className='card'>
            <CardContent>
              <h1>CADASTRO</h1>
              <div className='card2'>
                <Grid container rowSpacing={4} justifyContent="center" alignItems="center">
                  <Grid size={5}>
                    <label>Nome</label>
                    <input type="text" placeholder="Nome" className="input" value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>
                  </Grid>  
                  <Grid size={5}>
                    <label>CPF</label><br/>
                    <input type="text" placeholder="CPF" className="input" value={cpfInput} onChange={(e) => setCpfInput(e.target.value)}/>
                  </Grid>  
                  <Grid size={5}>
                    <label>E-mail</label>
                    <input type="text" placeholder="E-mail" className="input" value={registerEmailInput} onChange={(e) => setRegisterEmailInput(e.target.value)}/>
                  </Grid>
                  <Grid size={5}>
                    <label>Senha</label>
                    <input type="password" placeholder="Senha" className="input" value={registerPasswordInput} onChange={(e) => setRegisterPasswordInput(e.target.value)}/>
                  </Grid>
                </Grid>
              </div>
            </CardContent><br/>
            <Button variant="contained" color="secondary" onClick={handleRegister}>Cadastrar</Button>
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

export default Login;
