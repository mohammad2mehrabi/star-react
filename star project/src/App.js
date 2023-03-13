import './App.css';
import Header from "./components/Header";
import './components/Header.css';
import HomePage from './components/HomePage';
import './components/HomePage.css';
import CardPage from './components/CardPage';
import './components/CardPage.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [peopleData, setPeopleData] = useState([]);


  const loadAllPeople = async () => {
    await axios.get('https://swapi.dev/api/people')
      .then((response) => {
        var peopleCopy = response.data.results;
        let promises = [];
        for (let person of peopleCopy) {
          promises.push(
            axios.get(person.homeworld)
              .then((response) => {
                person.homeworld = response.data.name;
              }),
            person.species.length > 0 ?
              axios.get(person.species[0])
                .then((response) => {
                  person.species = response.data.name;
                })
              : person.species = 'Human'
          )
        }
        Promise.all(promises).then(() => { setPeopleData(peopleCopy) });
      })
      .catch((error) => {
        alert('error loading data')
      })
  }

  useEffect(() => {
    loadAllPeople();
  }, []);

  return (
    <BrowserRouter>
      <div className='page-body'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage peopleData={peopleData} />} />
          <Route path="/:id" element={<CardPage peopleData={peopleData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

}



export default App;
