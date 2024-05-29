import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieComponent from "../components/movieComponent";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";

const Background = styled.div`
  background-color: navy;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const NowPlayingPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getMovieData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
          params: {
            language: "ko-KR",
            page: page,
          },
        }
      );
      setMovieData((prevData) => [...prevData, ...res.data.results]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Background>
      <MovieComponent movieData={movieData} />
      {isLoading && (
        <LoaderWrapper>
          <ClimbingBoxLoader color="#36d7b7" loading={isLoading} size={50} />
        </LoaderWrapper>
      )}
    </Background>
  );
};

export default NowPlayingPage;
