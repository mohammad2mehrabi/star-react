import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAtlassian, FaNimblr, FaFighterJet, FaCheck } from 'react-icons/fa';


const HomePage = ({ peopleData }) => {
    const [search, setSearch] = useState('');

    const [peopleData2, setPeopleData2] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await axios.get(`https://swapi.dev/api/people/?search=${search}`)
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
                Promise.all(promises).then(() => { setPeopleData2(peopleCopy) });
            })
            .catch((error) => {
                alert('error loading data')
            })
    }

    useEffect(() => {
        setPeopleData2(peopleData)
    }, [peopleData]);

    return (
        <div style={{ marginBottom: '80px' }}>
            <p className='homepage-text'>All Cards {'>'} <span className='header-text-span'>Select a card</span></p>

            <div className='main-search-box'>
                <form onSubmit={handleSearch}>
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                        <FaCheck/>
                    </div>
                </form>
            </div>

            <div className='main-card-box'>
                {peopleData2.length > 0 ?
                    peopleData2.map((person) => (
                        <li key={person.name} style={{ listStyleType: "none" }}>
                            <div className='card-box'>
                                <div className='card-header'>
                                    <Link to={`/${person.name}`}>
                                    <p className='card-name-text'>{person.name}</p>
                                    </Link>
                                </div>
                                <div className='card-info'>
                                    <div className='card-info-header'>
                                        <p className='card-info-header-text'>{person.birth_year}</p>
                                        <p className='card-info-header-text'>{person.species}</p>
                                    </div>
                                    <div className='card-info-main'>
                                        <div className='info-box'>
                                            <p className='info-header-text'><FaAtlassian/>HOMEWORLD</p>
                                            <p className='info-value-text'>{person.homeworld}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><FaNimblr/>VEHICLES</p>
                                            <p className='info-value-text'>{person.vehicles.length}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><FaFighterJet/>STARSHIPS</p>
                                            <p className='info-value-text'>{person.starships.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    <p className='load-text'></p>
                }
            </div>
        </div>
    )

    
}

export default HomePage