import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailComponent from "../components/movieDetailComponent";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import MovieCreditsComponent from "../components/movieCreditsComponent";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieDetailPage = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);

  const [movieDetailData, setMovieDetailData] = useState({});
  const [movieCreditsData, setMovieCreditsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const [detailResponse, creditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
            },
            params: {
              language: "ko-KR",
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
            },
            params: {
              language: "en-US",
            },
          }),
        ]);

        setMovieDetailData(detailResponse.data);
        setMovieCreditsData(creditsResponse.data.cast);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(parsedId);
  }, [parsedId]);

  return loading ? (
    <Container>
      <HashLoader size="120px" color="#0075ff" loading={loading} />
    </Container>
  ) : (
    <>
      <MovieDetailComponent movieDetailData={movieDetailData} />
      <MovieCreditsComponent movieCreditsData={movieCreditsData} />
    </>
  );
};

export default MovieDetailPage;
