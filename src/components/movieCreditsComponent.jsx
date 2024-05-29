import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(26, 15, 114);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0 40px;
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-row-gap: 50px;
  grid-column-gap: 12px;
  align-self: flex-start;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const MovieCreditsComponent = ({ movieCreditsData }) => {
  return (
    <Background>
      <h2>출연진 및 제작진</h2>
      <Container>
        {movieCreditsData.map((credit) => (
          <ProfileWrapper key={credit.id}>
            <ProfileImage
              src={
                credit.profile_path
                  ? `https://image.tmdb.org/t/p/w1280${credit.profile_path}`
                  : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s`
              }
            />
            <div>{credit.name}</div>
          </ProfileWrapper>
        ))}
      </Container>
    </Background>
  );
};

export default MovieCreditsComponent;
