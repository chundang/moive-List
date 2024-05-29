import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieComponent from "../components/movieComponent";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const Background = styled.div`
  background-color: navy;
`;

const LoadingBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const UpcomingPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
          }
        );
        setIsLoading(true);
        setMovieData(res.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieData();
  });

  return (
    <Background>
      {isLoading ? (
        <LoadingBackground>
          <PacmanLoader color="#36d7b7" loading={isLoading} size={150} />
        </LoadingBackground>
      ) : (
        <MovieComponent movieData={movieData} />
      )}
    </Background>
  );
};

export default UpcomingPage;
