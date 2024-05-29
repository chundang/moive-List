import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  border: 1px solid #ccc;
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: red;
  margin-bottom: 10px;
  text-align: start;
`;

const SubmitButton = styled.div`
  margin-top: 30px;
  width: 50%;
  background-color: ${(props) => (props.$allValid ? "#0074ff" : "gray")};
  border-radius: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 0;
  cursor: ${(props) => (props.$allValid ? "pointer" : "not-allowed")};
`;

const AlreadyHasId = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 30px;
`;

const StyleLink = styled(Link)`
  color: #0074ff;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    age: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [validationState, setValidationState] = useState({
    nameError: "",
    emailError: "",
    ageError: "",
    usernameError: "",
    passwordError: "",
    passwordCheckError: "",
    nameAvailable: false,
    emailAvailable: false,
    ageAvailable: false,
    usernameAvailable: false,
    passwordAvailable: false,
    passwordCheckAvailable: false,
  });

  const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const ageRegex = /^[0-9]+$/;
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/;

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (value === "") {
          return { nameError: "이름을 입력해주세요!", nameAvailable: false };
        } else if (!nameRegex.test(value)) {
          return {
            nameError: "올바른 이름을 입력해주세요!",
            nameAvailable: false,
          };
        } else {
          return { nameError: "", nameAvailable: true };
        }
      case "email":
        if (value === "") {
          return {
            emailError: "이메일을 입력해주세요!",
            emailAvailable: false,
          };
        } else if (!emailRegex.test(value)) {
          return {
            emailError: "올바른 이메일 형식을 입력해주세요!",
            emailAvailable: false,
          };
        } else {
          return { emailError: "", emailAvailable: true };
        }
      case "age":
        if (value === "") {
          return { ageError: "나이를 입력해주세요!", ageAvailable: false };
        } else if (!ageRegex.test(value)) {
          return { ageError: "숫자를 입력해주세요!", ageAvailable: false };
        } else if (parseInt(value) < 1) {
          return { ageError: "나이는 양수여야 합니다!", ageAvailable: false };
        } else if (isNaN(parseInt(value))) {
          return {
            ageError: "나이는 실수로 입력할 수 없습니다!",
            ageAvailable: false,
          };
        } else if (parseInt(value) < 19) {
          return {
            ageError: "19세 이상만 가입이 가능합니다!",
            ageAvailable: false,
          };
        } else {
          return { ageError: "", ageAvailable: true };
        }
      case "username":
        if (value === "") {
          return {
            usernameError: "아이디를 입력해주세요!",
            usernameAvailable: false,
          };
        } else if (!usernameRegex.test(value)) {
          return {
            usernameError: "올바른 아이디 형식을 입력해주세요!",
            usernameAvailable: false,
          };
        } else {
          return { usernameError: "", usernameAvailable: true };
        }
      case "password":
        if (value === "") {
          return {
            passwordError: "비밀번호를 입력해주세요!",
            passwordAvailable: false,
          };
        } else if (!passwordRegex.test(value)) {
          return {
            passwordError:
              "비밀번호는 4-12자의 영소문자, 숫자, 특수문자를 모두 조합해서 입력해주세요!",
            passwordAvailable: false,
          };
        } else {
          return { passwordError: "", passwordAvailable: true };
        }
      case "passwordCheck":
        if (value === "") {
          return {
            passwordCheckError: "비밀번호를 입력해주세요!",
            passwordCheckAvailable: false,
          };
        } else if (value !== inputValue.password) {
          return {
            passwordCheckError: "비밀번호가 일치하지 않습니다!",
            passwordCheckAvailable: false,
          };
        } else {
          return { passwordCheckError: "", passwordCheckAvailable: true };
        }
      default:
        return {};
    }
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setInputValue((prev) => ({ ...prev, [field]: value }));
    setValidationState((prev) => ({
      ...prev,
      ...validateField(field, value),
    }));
  };

  const SignUpClick = useCallback(async () => {
    if (
      validationState.nameAvailable &&
      validationState.emailAvailable &&
      validationState.ageAvailable &&
      validationState.usernameAvailable &&
      validationState.passwordAvailable &&
      validationState.passwordCheckAvailable
    ) {
      try {
        const response = await axios.post("http://localhost:8080/auth/signup", {
          name: inputValue.name,
          email: inputValue.email,
          age: inputValue.age,
          username: inputValue.username,
          password: inputValue.password,
          passwordCheck: inputValue.passwordCheck,
        });

        if (response.status === 201) {
          alert("회원가입에 성공하였습니다.");
          localStorage.setItem("token", JSON.stringify(response.data));
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 409) {
          alert("이미 존재하는 아이디입니다.");
        } else if (error.response.status === 400) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          console.error("회원가입 중 오류 발생:", error);
          alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
        }
      }
    } else {
      console.log("회원가입에 실패하였습니다.");
    }
  }, [inputValue, validationState, navigate]);

  return (
    <Container>
      <h1>회원가입 페이지</h1>
      <FormContainer>
        <StyleInput
          type="text"
          placeholder="이름을 입력해주세요"
          value={inputValue.name}
          onChange={handleChange("name")}
        />
        {validationState.nameError && (
          <ErrorMessage>{validationState.nameError}</ErrorMessage>
        )}

        <StyleInput
          type="email"
          placeholder="이메일을 입력해주세요"
          value={inputValue.email}
          onChange={handleChange("email")}
        />
        {validationState.emailError && (
          <ErrorMessage>{validationState.emailError}</ErrorMessage>
        )}

        <StyleInput
          type="text"
          placeholder="나이를 입력해주세요"
          value={inputValue.age}
          onChange={handleChange("age")}
        />
        {validationState.ageError && (
          <ErrorMessage>{validationState.ageError}</ErrorMessage>
        )}

        <StyleInput
          type="text"
          placeholder="아이디를 입력해주세요"
          value={inputValue.username}
          onChange={handleChange("username")}
        />
        {validationState.usernameError && (
          <ErrorMessage>{validationState.usernameError}</ErrorMessage>
        )}

        <StyleInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={inputValue.password}
          onChange={handleChange("password")}
        />
        {validationState.passwordError && (
          <ErrorMessage>{validationState.passwordError}</ErrorMessage>
        )}

        <StyleInput
          type="password"
          placeholder="비밀번호 확인"
          value={inputValue.passwordCheck}
          onChange={handleChange("passwordCheck")}
        />
        {validationState.passwordCheckError && (
          <ErrorMessage>{validationState.passwordCheckError}</ErrorMessage>
        )}
      </FormContainer>

      <SubmitButton
        onClick={SignUpClick}
        $allValid={
          validationState.nameAvailable &&
          validationState.emailAvailable &&
          validationState.ageAvailable &&
          validationState.usernameAvailable &&
          validationState.passwordAvailable &&
          validationState.passwordCheckAvailable
        }
      >
        제출하기
      </SubmitButton>
      <AlreadyHasId>
        <div>이미 아이디가 있으신가요?</div>
        <StyleLink to={"/login"}>로그인 페이지로 이동하기</StyleLink>
      </AlreadyHasId>
    </Container>
  );
};

export default SignUpPage;
