import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar"; // 새로 만든 Sidebar 컴포넌트

const Container = styled.div`
  width: 100%;
  height: 8%;
  background-color: #0c0c41;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  padding: 0 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const HomeLogo = styled(Link)`
  text-decoration: none;
  padding: 15px;
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  padding: 15px;
  color: ${({ active }) => (active ? "skyblue" : "white")};
  font-weight: ${({ active }) => (active ? "700" : "initial")};

  &:hover {
    transform: scale(1.1);
    color: skyblue;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  height: 20px;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const TOKEN_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 7;

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  const tokenTimestamp = localStorage.getItem("tokenTimestamp");
  if (!token || !tokenTimestamp) return false;

  const currentTime = new Date().getTime();
  return currentTime - parseInt(tokenTimestamp, 10) < TOKEN_EXPIRY_TIME;
};

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const mainLocation = location.pathname === "/";

  useEffect(() => {
    const checkToken = async () => {
      console.log("Checking token validity...");
      if (isTokenValid()) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:8080/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Token is valid, setting user info");
          setUsername(response.data.username);
          setLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user info", error);
          localStorage.removeItem("token");
          localStorage.removeItem("tokenTimestamp");
          setLoggedIn(false);
        }
      } else {
        console.log("Token is not valid");
      }
    };

    checkToken();
  }, [mainLocation]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTimestamp");
    setLoggedIn(false);
    setUsername("");
  };

  const links = [
    { path: "/signup", label: "회원가입" },
    { path: "/popular", label: "Popular" },
    { path: "/nowplaying", label: "Now Playing" },
    { path: "/toprated", label: "Top Rated" },
    { path: "/upcoming", label: "Upcoming" },
  ];

  return (
    <Container>
      <ContentContainer>
        <HomeLogo to="/">UMC Movie</HomeLogo>
      </ContentContainer>
      <ContentContainer>
        <HamburgerMenu onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div />
          <div />
          <div />
        </HamburgerMenu>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          links={links}
          username={username}
          onLogout={handleLogout}
        />
        {links.map((link) => (
          <StyleLink
            key={link.path}
            to={link.path}
            active={location.pathname === link.path}
          >
            {link.label}
          </StyleLink>
        ))}
        {loggedIn ? (
          <>
            <div style={{ color: "blue", padding: "15px" }}>{username}</div>
            <StyleLink as="button" onClick={handleLogout}>
              로그아웃
            </StyleLink>
          </>
        ) : (
          <StyleLink to="/login" active={location.pathname === "/login"}>
            로그인
          </StyleLink>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Header;
