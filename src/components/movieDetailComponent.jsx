import React from "react";

import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(26, 15, 114, 0.8); /* 배경색과 투명도 조절 */
`;

const PosterImage = styled.img`
  width: 400px;
  height: 600px;
`;

const Information = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 50px;
`;

const MovieDetailComponent = ({ movieDetailData }) => {
  const calScore = (vote_average) => {
    const stars = "⭐️".repeat(Math.floor(vote_average));
    return stars;
  };

  return (
    <Background
      background={`https://image.tmdb.org/t/p/w1280${movieDetailData.backdrop_path}`}
    >
      <Container>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500/${movieDetailData.poster_path}`}
          alt={movieDetailData.title}
        />
        <Information>
          <h1>| {movieDetailData.title}</h1>
          <h3>평점 {calScore(movieDetailData.vote_average)}</h3>
          <h3>개봉일 {movieDetailData.release_date}</h3>
          <h3>줄거리</h3>
          <div>
            {movieDetailData.overview
              ? movieDetailData.overview
              : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}
          </div>
        </Information>
      </Container>
    </Background>
  );
};

export default MovieDetailComponent;
