import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #0c0c41;
  z-index: 2;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 15px;
  color: white;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: skyblue;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
  color: white;
`;

const Sidebar = ({ isOpen, onClose, links, username, onLogout }) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {links.map((link) => (
        <SidebarLink key={link.path} to={link.path} onClick={onClose}>
          {link.label}
        </SidebarLink>
      ))}
      {username ? (
        <>
          <div style={{ color: "blue", padding: "15px" }}>{username}</div>
          <SidebarLink as="button" onClick={onLogout}>
            로그아웃
          </SidebarLink>
        </>
      ) : (
        <SidebarLink to="/login" active={location.pathname === "/login"}>
          로그인
        </SidebarLink>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
