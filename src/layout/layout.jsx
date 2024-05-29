import React from "react";
import styled from "styled-components";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;
