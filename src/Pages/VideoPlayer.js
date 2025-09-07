import React, { useState, useEffect, useRef } from "react";
import "../Styles/VideoPlayer.css";

function VideoPlayer({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const videoRef = useRef(null);

  const API_KEY = "96J10g8IestN5jgwWCFXZu2MxE7kuRbrH74YWcKY8v0K1ye3Kjl62Z8N";

  // Load saved videos from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setSavedVideos(stored);
  }, []);

  // Fetch videos from Pexels
  const fetchVideos = async (query = "nature") => {
    try {
      const res = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=10`, {
        headers: { Authorization: API_KEY },
      });
      const data = await res.json();
      setVideos(data.videos || []);
      if (data.videos?.length > 0) setCurrentVideo(data.videos[0]);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = () => {
    fetchVideos(searchTerm);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const selectVideo = (video) => {
    setCurrentVideo(video);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.load();
  };

  const saveVideo = (video) => {
    if (!savedVideos.find((v) => v.id === video.id)) {
      const updated = [...savedVideos, video];
      setSavedVideos(updated);
      localStorage.setItem("savedVideos", JSON.stringify(updated));
    }
  };

  const removeSavedVideo = (videoId) => {
    const updated = savedVideos.filter((v) => v.id !== videoId);
    setSavedVideos(updated);
    localStorage.setItem("savedVideos", JSON.stringify(updated));
  };

  // Advanced controls: volume and playback speed
  const changeVolume = (e) => {
    if (videoRef.current) videoRef.current.volume = e.target.value;
  };

  const changeSpeed = (e) => {
    if (videoRef.current) videoRef.current.playbackRate = e.target.value;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        isPlaying ? pauseVideo() : playVideo();
      }
      if (e.code === "ArrowRight") {
        if (videoRef.current) videoRef.current.currentTime += 5;
      }
      if (e.code === "ArrowLeft") {
        if (videoRef.current) videoRef.current.currentTime -= 5;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  return (
    <div className={`video-player-container ${darkMode ? "dark" : "light"}`}>
      <h1>🎬 Hilda Video Player</h1>

      {/* Search */}
      <div className="video-search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* Current Video */}
      {currentVideo && (
        <div className="video-wrapper">
          <video ref={videoRef} controls width="100%" src={currentVideo.video_files[0].link} />
          <div className="video-controls">
            {isPlaying ? (
              <button onClick={pauseVideo}>⏸ Pause</button>
            ) : (
              <button onClick={playVideo}>▶ Play</button>
            )}
            <button onClick={stopVideo}>⏹ Stop</button>
            <button onClick={() => saveVideo(currentVideo)}>💾 Save</button>
            <span>{currentVideo.user.name}</span>
          </div>

          <div className="advanced-controls">
            <label>
              Volume: <input type="range" min="0" max="1" step="0.05" onChange={changeVolume} />
            </label>
            <label>
              Speed:{" "}
              <select onChange={changeSpeed} defaultValue={1}>
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {/* Recommended Videos */}
      <h2>🔥 Recommended Videos</h2>
      <div className="video-thumbnails">
        {videos.map((video) => (
          <div key={video.id} className="thumbnail" onClick={() => selectVideo(video)}>
            <img src={video.image} alt="video thumbnail" />
          </div>
        ))}
      </div>

      {/* Saved Videos */}
      {savedVideos.length > 0 && (
        <>
          <h2>💾 Saved Videos</h2>
          <div className="video-thumbnails">
            {savedVideos.map((video) => (
              <div key={video.id} className="thumbnail">
                <img src={video.image} alt="saved video" onClick={() => selectVideo(video)} />
                <button className="remove-btn" onClick={() => removeSavedVideo(video.id)}>
                  ❌
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VideoPlayer;
