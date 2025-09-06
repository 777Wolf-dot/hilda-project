import React, { useState, useEffect } from "react";
import "../Styles/MusicPlayer.css";

function MusicPlayer({ darkMode }) {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const clientId = "9919c386"; // Your Jamendo Client ID

  // Fetch tracks from Jamendo
  const fetchTracks = async (query = "") => {
    try {
      const res = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=${query}`
      );
      const data = await res.json();
      setTracks(data.results || []);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // Search songs
  const handleSearch = () => {
    fetchTracks(searchTerm);
  };

  // Add to playlist
  const addToPlaylist = (track) => {
    if (!playlist.find((t) => t.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  // Like / Unlike song
  const toggleLike = (track) => {
    if (likedTracks.find((t) => t.id === track.id)) {
      setLikedTracks(likedTracks.filter((t) => t.id !== track.id));
    } else {
      setLikedTracks([...likedTracks, track]);
    }
  };

  // Play track
  const playTrack = (track, index, inPlaylist = false) => {
    setCurrentTrackIndex(inPlaylist ? index : null);
    setIsPlaying(true);

    const audio = document.getElementById("audio-player");
    if (audio) {
      audio.src = track.audio;
      audio.play();
    }
  };

  // Pause track
  const pauseTrack = () => {
    setIsPlaying(false);
    const audio = document.getElementById("audio-player");
    if (audio) audio.pause();
  };

  // Stop track
  const stopTrack = () => {
    setIsPlaying(false);
    const audio = document.getElementById("audio-player");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  // Next track
  const nextTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex < playlist.length - 1) {
      const newIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex);
      playTrack(playlist[newIndex], newIndex, true);
    }
  };

  // Previous track
  const prevTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      const newIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
      playTrack(playlist[newIndex], newIndex, true);
    }
  };

  return (
    <div className={`music-player-container ${darkMode ? "dark" : "light"}`}>
      <h1>🎵 Hilda Music Player</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* Recommended Songs */}
      <div className="recommended">
        <h2>🔥 Recommended Songs</h2>
        <div className="songs-grid">
          {tracks.map((track, index) => (
            <div key={track.id} className="song-card">
              <img
                src={track.album_image || "https://via.placeholder.com/150"}
                alt={track.name}
              />
              <h4>{track.name}</h4>
              <p>{track.artist_name}</p>
              <div className="card-actions">
                <button onClick={() => playTrack(track, index)}>▶ Play</button>
                <button onClick={pauseTrack}>⏸ Pause</button>
                <button onClick={stopTrack}>⏹ Stop</button>
                <button onClick={() => toggleLike(track)}>
                  {likedTracks.find((t) => t.id === track.id)
                    ? "❤️ Liked"
                    : "🤍 Like"}
                </button>
                <button onClick={() => addToPlaylist(track)}>➕ Playlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlist */}
      <div className="playlist">
        <h2>🎶 My Playlist</h2>
        <div className="songs-grid">
          {playlist.map((track, index) => (
            <div key={track.id + "-pl"} className="song-card">
              <img
                src={track.album_image || "https://via.placeholder.com/150"}
                alt={track.name}
              />
              <h4>{track.name}</h4>
              <p>{track.artist_name}</p>
              <div className="card-actions">
                <button onClick={() => playTrack(track, index, true)}>
                  ▶ 
                </button>
                <button onClick={pauseTrack}>⏸ </button>
                <button onClick={stopTrack}>⏹ </button>
              </div>
            </div>
          ))}
        </div>

        {/* Playlist Controls */}
        {playlist.length > 0 && currentTrackIndex !== null && (
          <div className="playlist-controls">
            <button onClick={prevTrack}>⏮ </button>
            {isPlaying ? (
              <button onClick={pauseTrack}>⏸ </button>
            ) : (
              <button
                onClick={() =>
                  playTrack(playlist[currentTrackIndex], currentTrackIndex, true)
                }
              >
                ▶ 
              </button>
            )}
            <button onClick={stopTrack}>⏹ </button>
            <button onClick={nextTrack}>⏭</button>
          </div>
        )}
      </div>

      {/* Hidden Audio Player */}
      <audio id="audio-player" />
    </div>
  );
}

export default MusicPlayer;
