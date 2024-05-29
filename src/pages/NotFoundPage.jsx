import { Link } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: navy;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const StyleLink = styled(Link)`
  font-size: 30px;
  color: white;
`;

const NotFoundPage = () => {
  return (
    <Background>
      <h1>Oops!</h1>
      <h2>예상치 못한 에러가 발생했습니다!</h2>
      <h2>Not Found</h2>
      <StyleLink to="/">메인으로 이동하기</StyleLink>
    </Background>
  );
};

export default NotFoundPage;
