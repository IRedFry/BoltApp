import { useState, useEffect } from "react";

const useAlbum = ({ id }) => {
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);

  const getAlbum = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Album/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setAlbum(data);
        },
        (error) => {
          console.log("Album ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAlbum();
  }, []);

  const refetch = () => getAlbum();

  return { album, loading, refetch };
};

export default useAlbum;
