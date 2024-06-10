import { useState, useEffect } from "react";

const useRecommendations = ({ songId }) => {
  const [recommendationTracks, setRecommendationTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecommendationTracks = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Recognition/${songId}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setRecommendationTracks(data.tracks);
        },
        (error) => {
          console.log("RecommendationTracks ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRecommendationTracks();
  }, []);

  const refetch = () => getRecommendationTracks();

  return { recommendationTracks, loading, refetch };
};

export default useRecommendations;
