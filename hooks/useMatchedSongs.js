import { useState, useEffect } from "react";

const useMatchedSongs = ({ query }) => {
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSongs = async () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Track/",
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setMatchedSongs(data);
        },
        (error) => {
          console.log("MatchedSongs ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSongs();
  }, []);

  const refetch = () => getSongs();

  return { matchedSongs, loading, refetch };
};

export default useMatchedSongs;
