import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleVoiceSearch = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} width="100%">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 20,
          border: "1px solid #e3e3e3",
          boxShadow: "none",
          px: 2,
          py: 1,
          minWidth: 500,
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        <InputBase
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, ml: 1, fontSize: "16px" }}
        />
        <IconButton
          onClick={handleVoiceSearch}
          sx={{ color: "black", mr: 1 }}
          aria-label="voice search"
        >
          <MicIcon />
        </IconButton>
        <IconButton type="submit" sx={{ color: "red" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
