import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  padding: 0 20px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: black;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 2em;

  @media (max-width: 768px) {
    height: 200px;
    font-size: 1.5em;
  }

  @media (max-width: 480px) {
    height: 150px;
    font-size: 1.2em;
  }
`;

const Search = styled.div`
  width: 100%;
  text-align: center;
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 1.5em;
  padding: 50px 0;

  @media (max-width: 768px) {
    font-size: 1.2em;
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    font-size: 1em;
    padding: 20px 0;
  }
`;

const SearchBarContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 1em;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.9em;
  }
`;

const SearchButton = styled.div`
  display: flex;
  margin-left: 15px;
  cursor: pointer;
  font-size: 1.5em;

  @media (max-width: 480px) {
    font-size: 1.2em;
    margin-left: 10px;
  }
`;

const SearchResultContainer = styled.div`
  background-color: black;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  border-radius: 15px;
  margin: 20px auto;
  padding: 10px;
  max-height: 60vh;
  overflow-y: scroll;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const MovieTitle = styled.div`
  font-size: 1em;
  color: white;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 0.9em;
  }
`;

const MainPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchedMovie, setSearchedMovie] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceTimer = setTimeout(async () => {
      setLoading(true);

      if (keyword.trim() === "") {
        setSearchedMovie([]);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
            params: {
              include_adult: false,
              language: "ko-KR",
              page: 1,
            },
          }
        );
        setSearchedMovie(res.data.results);
        console.log("데이터 확인", res.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceTimer);
  }, [keyword]);

  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: {
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        backdrop_path: movie.backdrop_path,
      },
    });
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <Container>
      <Banner>환영합니다.</Banner>
      <Search>
        🎬 Find Your Movies!
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="영화 제목을 입력해주세요"
            value={keyword}
            onChange={handleChange}
          />
          <SearchButton>🔎</SearchButton>
        </SearchBarContainer>
        {loading ? (
          <div>데이터를 받아오는 중 입니다!</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <SearchResultContainer>
            {searchedMovie.map((movie) => (
              <SearchResult key={movie.id} onClick={() => handleClick(movie)}>
                <PosterImage
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </SearchResult>
            ))}
          </SearchResultContainer>
        )}
      </Search>
    </Container>
  );
};

export default MainPage;
