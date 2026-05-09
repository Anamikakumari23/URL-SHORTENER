import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://url-shortener-59bb.onrender.com/shorten",
        {
          originalUrl: url,
        }
      );

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container">
      <h1>Smart URL Shortener</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleShorten}>
          {loading ? "Loading..." : "Shorten"}
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