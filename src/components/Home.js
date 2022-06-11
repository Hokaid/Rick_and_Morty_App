import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

function Home() {
  const [results, setResults] = useState({});
  const makeSearch = async (text, type) => {
    var requestOptions = { method: 'GET', redirect: 'follow' };
    let response = {}; let characters = {};
    if (type == "1") {
      response = await fetch("https://rickandmortyapi.com/api/character/?name="+text, requestOptions);
    } else if (type == "2") {
      response = await fetch("https://rickandmortyapi.com/api/location/?name="+text, requestOptions);
    } else if (type == "3") {
      response = await fetch("https://rickandmortyapi.com/api/episode/?name="+text, requestOptions);
    } else if (type == "4") {
      response = await fetch("https://rickandmortyapi.com/api/character/?name="+text, requestOptions);
      let character2 = (Math.floor(Math.random() * 825) + 1); let character3 = (Math.floor(Math.random() * 825) + 1);
      characters = await fetch("https://rickandmortyapi.com/api/character/"+character2+","+character3, requestOptions);
    }
    if (type != "4") {
      const data = await response.json();
      let episodeDetail = [];
      if (type == "3") {
        for (let i = 0; i < data.results.length; i++) {
          let episodeObject = {};
          episodeObject.info = false;
          episodeDetail.push(episodeObject);
        }
      }
      setResults({results:data.results,type:type,episodeDetail:episodeDetail});
    } else {
      const data_character1 = await response.json();
      const data_characters = await characters.json();
      const results = [data_character1.results[0], data_characters[0], data_characters[1]]
      setResults({results:results,type:type});
    }
  }
  const activateInfo = async (index) => {
    results.episodeDetail[index].info = !results.episodeDetail[index].info;
    results.episodeDetail[index].characters_info = [];
    for (let j = 0; j < results.results[index].characters.length; j++) {
      let character = await fetch(results.results[index].characters[j]);
      character = await character.json();
      results.episodeDetail[index].characters_info.push(character);
    }
    setResults({results:results.results,type:results.type,episodeDetail:results.episodeDetail});
  }
  return (
    <section className="App-content">
      <div className="w-100 row">
        <div className="col-4">
          <SearchBar makeSearch={makeSearch}></SearchBar>
        </div>
        <div className="col-8">
          <Results results={results} activateInfo={activateInfo}></Results>
        </div>
      </div>
    </section>
  );
}

export default Home;