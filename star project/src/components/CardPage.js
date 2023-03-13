import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaAtlassian, FaNimblr, FaFighterJet, FaFreebsd, FaGitkraken, FaOdnoklassniki } from 'react-icons/fa';


const CardPage = ({ peopleData }) => {
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);

    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person) => person.name === decodeURI(cardId));

    const getVehicles = useCallback(async () => {
        let promises = [];
        let vehicles = [];
        if (specificCard) {
            for (let vehicle of specificCard.vehicles) {
                promises.push(
                    await axios.get(vehicle)
                        .then((response) => {
                            vehicles.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(() => setVehicles(vehicles))
        }
    }, [specificCard])

    const getStarships = useCallback(async () => {
        let promises = [];
        let starships = [];
        if (specificCard) {
            for (let starship of specificCard.starships) {
                promises.push(
                    await axios.get(starship)
                        .then((response) => {
                            starships.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(() => setStarships(starships))
        }
    }, [specificCard])

    useEffect(() => {
        getVehicles();
        getStarships();
    }, [peopleData, getVehicles, getStarships])

    return (
        <div>
            {specificCard ?
                <>
                    <p className='homepage-text' style={{ marginBottom: '32px' }}><Link to="/" style={{ textDecoration: 'none' }}>All Cards</Link> {'>'} <span className='header-text-span'>{specificCard.name} Details</span></p>

                    <div className='card-box-individual'>
                        <div className='card-header'>
                            <FaOdnoklassniki/>
                            <p className='card-name-text'>{specificCard.name}</p>
                        </div>
                        <div className='card-info'>
                            <div className='card-info-header-individual'>
                                <p className='card-info-header-text'><FaGitkraken/>{specificCard.birth_year}</p>
                                <p className='card-info-header-text'>{specificCard.species}</p>
                            </div>

                            <div className='card-info-main'>
                                <div className='info-box-individual'>
                                    <p className='info-header-text'><FaAtlassian/>HOMEWORLD</p>
                                    <p className='info-value-text'>{specificCard.homeworld}</p>
                                </div>
                                {specificCard.vehicles.length > 0 ?
                                    vehicles.map((vehicle) => (
                                        <div className='info-box-individual' key={vehicle}>
                                            <p className='info-header-text'><FaNimblr/>VEHICLE</p>
                                            <p className='info-value-text'>{vehicle}</p>
                                        </div>
                                    ))
                                    :
                                    <div className='info-box-individual'>
                                        <p className='info-header-text'><FaFreebsd/>VEHICLE</p>
                                        <p className='info-value-text'>None</p>
                                    </div>
                                }
                                {
                                    specificCard.starships.length > 0 ?
                                        starships.map((starship) => (
                                            <div className='info-box-individual' key={starship}>
                                                <p className='info-header-text'><FaFighterJet/>STARSHIP</p>
                                                <p className='info-value-text'>{starship}</p>
                                            </div>
                                        ))
                                        :
                                        <div className='info-box-individual'>
                                            <p className='info-header-text'><FaFighterJet/>STARSHIP </p>
                                            <p className='info-value-text'>None</p>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                <p className='load-text'></p>
            }

        </div>
    )
}

export default CardPage