import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/shorten",
        {
          originalUrl: url,
        }
      );

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div className="container">
      <h1>Smart URL Shortener</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Paste your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleShorten}>
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div className="result-box">
          <p>{shortUrl}</p>

          <button onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default App;