import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginCheck } from "../../context/LoginContext";
import { Nav } from "../../components";
import API_BASE_URL from "../../config";

function AddMusic() {
  const { isLoggedIn, user } = useLoginCheck();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [songForm, setSongForm] = useState({
    title: "",
    artist: "",
    audioFile: null,
    coverPhoto: null,
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [albumForm, setalbumForm] = useState({
    title: "",
    description: "",
    albumCoverPhoto: null,
  });

  const handelSongSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    const userId = await user.id;
    formData.append("title", songForm.title);
    formData.append("audioFile", songForm.audioFile);
      formData.append("coverPhoto", songForm.coverPhoto);
    formData.append("userId", userId);

    try {
      const response = await fetch(`${API_BASE_URL}/api/music/addSong`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        alert("Song added successfully!");
        setSongForm({
          title: "",
          audioFile: null,
          coverPhoto: null,
        });
        setCoverPreview(null);
      } else {
        alert("Failed to add the song. Please try again.");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      alert("An error occurred while adding the song.");
    }finally {
      setIsLoading(false);
    }
  };

  const handelAlbumSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const userId = await user.id;
    formData.append("title", albumForm.title);
    formData.append("description", albumForm.description);
    formData.append("albumCoverPhoto", albumForm.albumCoverPhoto);
    formData.append("userId", userId);

    try {
      const response = await fetch(`${API_BASE_URL}/api/music/addAlbum`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        alert("Album created successfully!");
        setalbumForm({
          title: "",
          description: "",
          albumCoverPhoto: null,
        });
        setCoverPreview(null);
      } else {
        alert("Failed to add the song. Please try again.");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      alert("An error occurred while adding the song.");
    }
  };

  const [albumCoverPreview, setalbumCoverPreview] = useState(null);

  const options = [
    {
      title: "Add a Song",
      description: "Upload your own music track",
      icon: "🎵",
      type: "song",
    },
    {
      title: "Create album",
      description: "Create a collection of songs",
      icon: "📀",
      type: "album",
    },
  ];

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "cover" || type === "albumCover") {
        // Check if file is an image
        if (!file.type.startsWith("image/")) {
          alert("Please select an image file");
          return;
        }

        // Handle both song and album cover photos
        if (type === "albumCover") {
          setalbumForm((prev) => ({ ...prev, albumCoverPhoto: file }));
          // Create preview URL for album cover
          const reader = new FileReader();
          reader.onload = () => {
            setalbumCoverPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          // Existing cover photo handling for songs
          setSongForm((prev) => ({ ...prev, coverPhoto: file }));
          const reader = new FileReader();
          reader.onload = () => {
            setCoverPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      } else if (type === "audio") {
        // Check if file is an audio
        if (!file.type.startsWith("audio/")) {
          alert("Please select an audio file");
          return;
        }
        setSongForm((prev) => ({ ...prev, audioFile: file }));
      }
    }
  };

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Add Music</h1>

          {!selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((option) => (
                <div
                  key={option.type}
                  onClick={() => setSelectedOption(option.type)}
                  className="bg-gray-800 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:bg-gray-700 hover:scale-105 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{option.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500">
                        {option.title}
                      </h3>
                      <p className="text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedOption === "song" ? "Add a Song" : "Create album"}
                </h2>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ← Back
                </button>
              </div>

              {selectedOption === "song" ? (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Song Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                      placeholder="Enter song title"
                      value={songForm.title}
                      onChange={(e) =>
                        setSongForm({ ...songForm, title: e.target.value })
                      }
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                      placeholder="Enter artist name"
                      value={songForm.artist}
                      onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Audio File
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 text-gray-400 rounded-lg tracking-wide border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-sm">
                          Select an audio file
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="audio/*"
                          onChange={(e) => handleFileChange(e, "audio")}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Cover Photo
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 text-gray-400 rounded-lg tracking-wide border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all">
                        {coverPreview ? (
                          <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="w-32 h-32 object-cover rounded-lg mb-2"
                          />
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-sm">
                              Select a Cover Photo
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "cover")}
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handelSongSubmit}
                    className="flex items-center justify-center 
                    shadow-md duration-300 
                    ease-in-out
                     w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    {isLoading ? (
                      <>
                        {/* Spinner Element */}
                        <div className="w-5 h-5 mr-3 border-4 border-gray-300 rounded-full border-t-white animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span>Upload Song</span>
                    )}
                  </button>
                </form>
              ) : (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      album Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                      placeholder="Enter album name"
                      value={albumForm.name}
                      onChange={(e) =>
                        setalbumForm({ ...albumForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                      rows="4"
                      placeholder="Enter album description"
                      value={albumForm.description}
                      onChange={(e) =>
                        setalbumForm({
                          ...albumForm,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      album Cover
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 text-gray-400 rounded-lg tracking-wide border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all">
                        {albumCoverPreview ? (
                          <img
                            src={albumCoverPreview}
                            alt="album cover preview"
                            className="w-32 h-32 object-cover rounded-lg mb-2"
                          />
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-sm">
                              Select a cover image
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "albumCover")}
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handelSongSubmit}
                    className="flex items-center justify-center 
                    shadow-md duration-300 
                    ease-in-out
                     w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    {isLoading ? (
                      <>
                        {/* Spinner Element */}
                        <div className="w-5 h-5 mr-3 border-4 border-gray-300 rounded-full border-t-white animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Album</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMusic;
