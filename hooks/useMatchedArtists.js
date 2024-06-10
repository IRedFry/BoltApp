import { useState, useEffect } from "react";

const useMatchedArtists = ({ query }) => {
  const [matchedArtists, setMatchedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArtists = async () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Artist/",
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setMatchedArtists(data);
        },
        (error) => {
          console.log("MatchedArtists ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArtists();
  }, []);

  const refetch = () => getArtists();

  return { matchedArtists, loading, refetch };
};

export default useMatchedArtists;
