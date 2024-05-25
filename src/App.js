import { useState } from "react";
import InputField from "./InputField";
import "bulma/css/bulma.min.css";

function App() {
  const [info, setInfo] = useState({
    url: "https://api.subdl.com/api/v1/subtitles",
    api: "F5iBg5Fb06tHH-4WFMb49cT1rv-yUFpm",
    movie: "",
    imdbID: "",
    type: "movie",
    language: "fa",
    subsPerPage: 30,
    log: "",
    subtitlesData: [],
  });

  const getSubtitels = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      log: "",
    }));

    fetch(
      `${info.url}?api_key=${info.api}&film_name=${info.movie}&type=${info.type}&languages=fa&imdb_id=${info.imdbID}&subs_per_page=30`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          setInfo((prevInfo) => ({
            ...prevInfo,
            log: "Not Found",
          }));
          return;
        }
        const extractedSubs = data.subtitles.map((sub) => ({
          url: sub.url,
          releaseName: sub.release_name,
          language: sub.lang,
        }));

        setInfo((prevInfo) => ({
          ...prevInfo,
          subtitlesData: extractedSubs,
        }));
        console.log(info.subtitlesData);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((previnfo) => ({
      ...previnfo,
      [name]: value.toLowerCase(),
    }));
  };

  const handleDownloadAll = async () => {
    for (const item of info.subtitlesData) {
      // Construct the full URL
      const fullUrl = `https://dl.subdl.com${item.url}`;
      console.log(fullUrl);

      // Create an anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = fullUrl;
      anchor.download = `${item.releaseName}.zip`; // Use a descriptive name for the downloaded file
      document.body.appendChild(anchor); // Append anchor to body to ensure it works in all browsers
      anchor.click();
      document.body.removeChild(anchor); // Remove anchor after clicking to clean up

      // Add a small delay to ensure the browser processes each download
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="title has-text-centered mt-6">Subdl Downloader ⬇️</h1>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="box">
                <InputField
                  lable="Movie Name"
                  name="movie"
                  value={info.movie}
                  onChange={handleChange}
                  placeholder="Success input"
                />

                <InputField
                  lable="IMDB ID"
                  name="imdbID"
                  value={info.imdbID}
                  onChange={handleChange}
                />

                <InputField
                  lable="Type (Movie or Series)"
                  name="type"
                  value={info.type}
                  onChange={handleChange}
                />

                <div className="buttons is-centered">
                  <button className="button is-primary" onClick={getSubtitels}>
                    Submit
                  </button>
                  <button
                    className="button is-link"
                    onClick={handleDownloadAll}
                  >
                    Download All
                  </button>
                </div>
              </div>

              <div className="results">
                <ul>
                  {info.subtitlesData.map((subtitle) => (
                    <li key={subtitle.url}>
                      <a
                        href={`https://dl.subdl.com${subtitle.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subtitle.releaseName} - {subtitle.language}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>{info.log}</div>
              <br />
              <div className="todo">
                <p>TODO:</p>
                <ul>
                  <li style={{ textDecoration: "line-through" }}>
                    Add download all button
                  </li>
                  <li>Add Cover Image</li>
                  <li>Make Upload to opensubtitle.org work</li>
                  <li>add setting icon to get api</li>
                  <li>Get API from user profile</li>
                  <li>find out a way to save api in browser cookies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;