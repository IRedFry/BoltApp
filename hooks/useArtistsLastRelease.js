import { useState, useEffect } from "react";

const useArtistsLastRelease = ({ id }) => {
  const [lastRelease, setLastRelease] = useState({});
  const [loading, setLoading] = useState(true);

  const getLastRelease = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Track/Artist/LastRelease/${id}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 404) return {};
        return response.json();
      })
      .then(
        (data) => {
          setLastRelease(data);
        },
        (error) => {
          console.log("ArtistsLastRelease ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getLastRelease();
  }, []);

  const refetch = () => getLastRelease();

  return { lastRelease, loading, refetch };
};

export default useArtistsLastRelease;
