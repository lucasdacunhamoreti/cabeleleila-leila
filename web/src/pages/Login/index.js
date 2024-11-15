import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Message,
  Schema,
  useToaster,
  Container,
  Row,
  Col,
  Panel,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import api from "../../services/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    email: StringType()
      .isEmail("Por favor, insira um email válido.")
      .isRequired("O email é obrigatório."),
    password: StringType().isRequired("A senha é obrigatória."),
  });

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      toaster.push(
        <Message type="success">Login realizado com sucesso!</Message>,
        {
          placement: "topCenter",
        }
      );
      window.location.href = "/agendamentos";
    } catch (error) {
      toaster.push(
        <Message type="error">
          {error.response?.data?.message || "Erro ao realizar login."}
        </Message>,
        { placement: "topCenter" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Row>
        <Col>
          <Panel bordered style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Form model={model} onSubmit={handleLogin}>
              <Form.Group>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" type="email" accepter={Input} />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Senha</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  accepter={Input}
                />
              </Form.Group>
              <Form.Group>
                <Button
                  type="submit"
                  appearance="primary"
                  loading={loading}
                  block
                  style={{ backgroundColor: "#9d4edd", borderColor: "#9d4edd" }}
                >
                  Login
                </Button>
              </Form.Group>
            </Form>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
