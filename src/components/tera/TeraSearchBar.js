import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function TeraSearchBar() {
  return (
    <div className="relative ">
      <SearchIcon className="text-slate-500 absolute top-1 left-1" />
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="px-8 self-center border border-slate-300 border-solid w-72 h-9 z-10 rounded-md"
      />
    </div>
  );
}

export default TeraSearchBar;
