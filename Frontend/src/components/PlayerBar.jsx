import React from "react";

export default function PlayerBar() {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 bg-gray-800 rounded-lg p-4 z-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <div className="songinfo text-sm">
            <div className="text-white font-medium">Song Title</div>
            <div className="text-gray-400 text-sm">Artist Name</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              className="invert w-5 h-5 cursor-pointer"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExIDVMNiA5SDJWMTVINkwxMSAxOVY1WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTkuMDcgNC45M0MyMC41IDYuMzYgMjEuNSA4LjM2IDIxLjUgMTJTMjAuNSAxNy42NCAxOS4wNyAxOS4wNyIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
              alt="Volume"
            />
            <input
              className="w-20 cursor-pointer"
              type="range"
              name="volume"
              defaultValue="100"
            />
          </div>
          <div className="flex items-center gap-4">
            <img
              className="invert w-5 h-5 cursor-pointer"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDEyTDggMTlWNUwxOSAxMloiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTUgMTlWNSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
              alt="Previous"
            />
            <img
              className="invert w-6 h-6 cursor-pointer"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggNUwxOSAxMkw4IDE5VjVaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo="
              alt="Play"
            />
            <img
              className="invert w-5 h-5 cursor-pointer"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMTJMMTYgNVYxOUw1IDEyWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMTkgNVYxOSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
              alt="Next"
            />
          </div>
          <div className="songtime text-sm text-gray-400">1:23 / 3:45</div>
        </div>
      </div>
      <div className="relative w-full h-0.5 bg-white rounded cursor-pointer">
        <div className="seekbar-circle w-3 h-3 bg-white rounded-full cursor-pointer absolute left-0 -bottom-1"></div>
      </div>
    </div>
  );
}