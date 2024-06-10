import { useState, useEffect } from "react";

const useArtist = ({ id }) => {
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArtist = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Artist/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setArtist(data);
        },
        (error) => {
          console.log("Artist ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArtist();
  }, []);

  const refetch = () => getArtist();

  return { artist, loading, refetch };
};

export default useArtist;
