import React from "react";

function Episode(props) {
  let { eachEpisode } = props;
  return (
    <div>
      Episode {eachEpisode.number} - {eachEpisode.name}
    </div>
  );
}

export default Episode;
