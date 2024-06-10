import { useState, useEffect } from "react";

const useUsersPlaylists = ({ id }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaylists = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Playlist/User/${id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setPlaylists(data);
        },
        (error) => {
          console.log("UsersPlaylists ", error);
        }
      )
      .then(async () => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const refetch = () => getPlaylists();

  return { playlists, loading, refetch };
};

export default useUsersPlaylists;
