import { useState, useEffect } from "react";

const useArtistsSongs = ({ id }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSongs = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Track/Artist/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setSongs(data);
        },
        (error) => {
          console.log("ArtistsSongs ", error);
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

  return { songs, loading, refetch };
};

export default useArtistsSongs;
