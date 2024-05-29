import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  width: 30%;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInput = styled.input`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border-radius: 15px;
  font-size: 18px;
`;

const SubmitButton = styled.div`
  margin-top: 40px;
  width: 50%;
  background-color: #0074ff;
  border-radius: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 0;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: inputValue.username,
        password: inputValue.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenTimestamp", new Date().getTime());
      alert("로그인 성공!");
      navigate("/");
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container>
      <h1>로그인 페이지</h1>
      <FormContainer>
        <StyleInput
          type="text"
          placeholder="아이디를 입력해주세요"
          value={inputValue.username}
          onChange={(event) =>
            setInputValue({ ...inputValue, username: event.target.value })
          }
        />

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={inputValue.password}
          onChange={(event) =>
            setInputValue({ ...inputValue, password: event.target.value })
          }
        />
      </FormContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
    </Container>
  );
};

export default LoginPage;
