import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import "./Login.css";
import { AxiosError } from "axios";
import httpClient from "../../shared/http-client/http-client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [cpfInput, setCpfInput] = useState("");
  const [registerEmailInput, setRegisterEmailInput] = useState("");
  const [registerPasswordInput, setRegisterPasswordInput] = useState("");
  const [formValid, setFormValid] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailInput) {
      setFormValid("Email inválido.");
      return;
    }

    if (passwordInput.length < 5) {
      setFormValid("A senha precisa ter pelo menos 5 caracteres.");
      return;
    }

    const loginUserPayload = {
      email: emailInput,
      password: passwordInput,
    };

    try {
      const result = await httpClient.post("login", loginUserPayload);
      const { token } = result.data;

      localStorage.setItem("token", token);
      setFormValid(null);

      navigate('/home');
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = e.response?.data;
        setFormValid(error?.message || "Erro no login");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !nameInput ||
      !cpfInput ||
      !registerEmailInput ||
      registerPasswordInput.length < 5
    ) {
      setFormValid("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const registerUserPayload = {
      username: nameInput,
      cpf: cpfInput,
      email: registerEmailInput,
      password: registerPasswordInput,
    };

    try {
      await httpClient.post("register", registerUserPayload);

      setFormValid("Cadastro realizado com sucesso! Faça login.");
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = e.response?.data;
        setFormValid(error?.message || "Erro no cadastro");
      }
    }
  };

  return (
    <div className="background-login">
      <hr />
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Login Card */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <h1>LOGIN</h1>
              <label>E-mail</label>
              <input
                type="text"
                placeholder="E-mail"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <br />
              <br />
              <label>Senha</label>
              <input
                type="password"
                placeholder="Senha"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              {formValid && <p className="error-message">{formValid}</p>}
            </CardContent>
            <Button variant="contained" color="secondary" onClick={handleLogin}>
              Entrar
            </Button>
          </Card>
        </Grid>

        {/* Register Card */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <h1>CADASTRO</h1>
              <div className="card2">
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Nome"
                      className="input"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>CPF</label>
                    <input
                      type="text"
                      placeholder="CPF"
                      className="input"
                      value={cpfInput}
                      onChange={(e) => setCpfInput(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>E-mail</label>
                    <input
                      type="text"
                      placeholder="E-mail"
                      className="input"
                      value={registerEmailInput}
                      onChange={(e) => setRegisterEmailInput(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>Senha</label>
                    <input
                      type="password"
                      placeholder="Senha"
                      className="input"
                      value={registerPasswordInput}
                      onChange={(e) => setRegisterPasswordInput(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
