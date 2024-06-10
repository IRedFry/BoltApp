import { useState, useEffect } from "react";

const usePlaylistSongs = ({ id }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSongs = async () => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Playlist/${id}/track`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setSongs(data);
        },
        (error) => {
          console.log("PlaylistSongs ", error);
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

export default usePlaylistSongs;
