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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const PageButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? "gray" : "#36d7b7")};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "gray" : "#2db295")};
    color: white;
  }
`;

const PopularPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(process.env.REACT_APP_ACCESS_TOKEN);
  const getMovieData = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KO&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setMovieData(res.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getMovieData(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  return (
    <Background>
      {isLoading ? (
        <LoadingBackground>
          <PacmanLoader color="#36d7b7" loading={isLoading} size={150} />
        </LoadingBackground>
      ) : (
        <>
          <MovieComponent movieData={movieData} />
          <Pagination>
            <PageButton onClick={handlePrevPage} disabled={page === 1}>
              &lt; 이전
            </PageButton>
            <span>{page}</span>
            <PageButton onClick={handleNextPage}>다음 &gt;</PageButton>
          </Pagination>
        </>
      )}
    </Background>
  );
};

export default PopularPage;
