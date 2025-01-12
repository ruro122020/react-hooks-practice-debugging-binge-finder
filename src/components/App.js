/*
Core Deliverables:
1. A user should be able to click on a show and have the details show up on the left.(done)
2. A user should be able to search for a show.(done)
3. A user should be able to filter the list of shows by their rating.(done)
4. A user should be able to display seasons and episodes when a show is selected.(done)
All core deliverables are done. 

Bonus:
1.LAZY LOADING!! Your initial fetch only grabbed the most popular 240 shows on the API. Implement lazy loading to have your application do another fetch once it gets to the bottom of the screen.
TIP: change your fetch to reflect the page numbers example:
 */
import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  useEffect(() => {
    Adapter.getShows().then((shows) => setShows(shows));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
    });
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => {
      return s.rating.average >= parseInt(filterByRating);
    });
  }
  displayShows = displayShows.filter(s => {
    if (s.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true
    }
  })
  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        filterByRating={filterByRating}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
