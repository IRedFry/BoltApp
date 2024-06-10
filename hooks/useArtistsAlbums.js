import { useState, useEffect } from "react";

const useArtistsAlbums = ({ id }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAlbums = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Album/Artist/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setAlbums(data);
        },
        (error) => {
          console.log("ArtistsAlbums ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const refetch = () => getAlbums();

  return { albums, loading, refetch };
};

export default useArtistsAlbums;
