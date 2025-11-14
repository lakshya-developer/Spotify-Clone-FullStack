import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoginCheck } from "../../context/LoginContext";
import { Nav } from "../../components";
import { usePlayBarContext } from "../../context/PlayBarContext";
import API_BASE_URL from "../../config";

function YourMusic() {
  const { user } = useLoginCheck();
  const [activeTab, setActiveTab] = useState("songs");
  const [userContent, setUserContent] = useState({ songs: [], albums: [] });
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAddSongForm, setShowAddSongForm] = useState(false);

  const [songForm, setSongForm] = useState({
    title: "",
    audioFile: null,
    coverPhoto: null,
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { PlaySong } = usePlayBarContext();

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const userId = user.id;
        const response = await fetch(`${API_BASE_URL}/api/music/getMusic`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const data = await response.json();
          setUserContent(data);
        }
      } catch (error) {
        console.error("Error fetching user content:", error);
      }
    };

    fetchUserContent();
  }, []);

  // Fetch songs for a specific album
  const fetchAlbumSongs = async (albumId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/music/getMusicInfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: albumId, type: "album" }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedAlbum(data);
      }
    } catch (error) {
      console.error("Error fetching album songs:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "audio") {
      if (!file.type.startsWith("audio/")) {
        alert("Please select a valid audio file");
        return;
      }
      setSongForm((prev) => ({ ...prev, audioFile: file }));
    }

    if (type === "cover") {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      setSongForm((prev) => ({ ...prev, coverPhoto: file }));

      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit song
  const handleSongSubmit = async (e) => {
    e.preventDefault();
    if (!songForm.title || !songForm.audioFile) {
      alert("Please fill all required fields");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", songForm.title);
    formData.append("audioFile", songForm.audioFile);
    if (songForm.coverPhoto) formData.append("coverPhoto", songForm.coverPhoto);
    formData.append("userId", user.id);
    formData.append("albumId", selectedAlbum._id);

    try {
      const response = await fetch(`${API_BASE_URL}/api/music/addToAlbum`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        alert("Song uploaded successfully!");
        setSongForm({ title: "", audioFile: null, coverPhoto: null });
        setCoverPreview(null);
        setShowAddSongForm(false);
        fetchAlbumSongs(selectedAlbum._id); // refresh album songs
      } else {
        alert("Failed to upload song. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="main-content bg-gray-900 flex flex-col flex-1">
      <Nav />

      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Your Music</h1>

          {/* Tabs */}
          {!selectedAlbum && (
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab("songs")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === "songs"
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Songs
              </button>
              <button
                onClick={() => setActiveTab("albums")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === "albums"
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Albums
              </button>
            </div>
          )}

          {/* Album View */}
          {selectedAlbum ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {selectedAlbum.title}
                </h2>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ← Back to Albums
                </button>
              </div>

              {/* Add Song Button */}
              {!showAddSongForm && (
                <button
                  onClick={() => setShowAddSongForm(true)}
                  className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  ➕ Add Song
                </button>
              )}

              {/* Add Song Form */}
              {showAddSongForm && (
                <form
                  onSubmit={handleSongSubmit}
                  className="bg-gray-800 p-6 rounded-xl space-y-4"
                >
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={songForm.title}
                      onChange={(e) =>
                        setSongForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      placeholder="Enter song title"
                      required
                    />
                  </div>

                  {/* Audio File */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Audio File
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileChange(e, "audio")}
                      className="w-full"
                      required
                    />
                  </div>

                  {/* Cover Photo */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Cover Photo (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "cover")}
                      className="w-full"
                    />
                    {coverPreview && (
                      <img
                        src={coverPreview}
                        alt="Preview"
                        className="mt-3 w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-all"
                    >
                      {isUploading ? "Uploading..." : "Upload Song"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddSongForm(false)}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Album Songs List */}
              {selectedAlbum?.songs?.length > 0 ? (
                selectedAlbum.songs.map((song) => (
                  <div
                    key={song._id}
                    className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg flex items-center group"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden mr-4">
                      <img
                        src={song.coverPhoto || "/img/default-song.png"}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-medium">{song.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <button
                      onClick={() => PlaySong(song._id, "song")}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <img className="w-4" src="/img/newplay.svg" alt="Play" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No songs in this album yet.</p>
              )}
            </div>
          ) : activeTab === "songs" ? (
            /* Songs Tab */
            <div className="space-y-4">
              {(userContent?.songs?.length ?? 0) > 0 ? (
                userContent.songs.map((song) => (
                  <div
                    key={song._id}
                    className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg flex items-center group"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden mr-4">
                      <img
                        src={song.coverPhoto || "/img/default-song.png"}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-medium">{song.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <button
                      onClick={() => PlaySong(song._id, "song")}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <img className="w-4" src="/img/newplay.svg" alt="Play" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No songs uploaded yet</p>
                  <Link to="/music/add-music">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                      Upload Your First Song
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            /* Albums Tab */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {(userContent?.albums?.length ?? 0) > 0 ? (
                userContent.albums.map((album) => (
                  <div
                    key={album._id}
                    onClick={() => fetchAlbumSongs(album._id)}
                    className="card-hover bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
                  >
                    <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={album.coverPhoto || "/img/default-album.png"}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">
                      {album.title}
                    </h3>
                    <p className="text-gray-400 text-sm">Your Album</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 mb-4">No albums created yet</p>
                  <Link to="/music/add-music">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                      Create Your First Album
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourMusic;
