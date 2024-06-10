import { useState, useEffect } from "react";

const useSong = ({ id }) => {
  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSong = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Track/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setSong(data);
        },
        (error) => {
          console.log("Song ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSong();
  }, []);

  const refetch = () => getSong();

  return { song, loading, refetch };
};

export default useSong;
