import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class CountryDetails extends Component {

    state = {
        country: {},
        neighbors: [],
        neighborNames: []
    }


    getCountry() {

       let fullNames = []
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            for (let element of response.data) {
               if (element.alpha3Code === this.props.countryId) {

                    let newCountry = {
                        name: element.name,
                        id: element.alpha3Code,
                        capital: element.capital,
                        area: element.area,
                        borders: element.borders
                    }
                    
                    // put each neighboring countries code and name in same object
                    for (let i = 0; i < newCountry.borders.length; i++) {
                        for (let element of response.data) {
                            if (element.alpha3Code === newCountry.borders[i]) {
                                fullNames.push({
                                    name: element.name,
                                    code: element.alpha3Code
                                })
                            }
                        }
                    }
                  
                   this.setState({
                       country: newCountry,
                       neighbors: newCountry.borders,
                       neighborNames: fullNames
                   })
               }
            }
        })
        .catch(err => console.log(err))
    }



    componentDidMount() {
        this.getCountry()
    
    }

    componentDidUpdate() {
        let id = this.props.countryId
        if (this.state.country.id !== id) {
            this.getCountry()
        }
    }


    render() {
        
       const { country, neighbors, neighborNames } = this.state
        
        return (
            <div className="country-box">
                <h1>{country.name}</h1>
                <table>
                <tbody>
                    <tr>
                        <td><div>Capital: </div></td>
                        <td><div>
                        {
                            country.capital === '' ? 'none' : country.capital
                            
                            }</div></td>
                    </tr>
                    <tr>
                        <td><div>Area:</div></td>
                        <td><div>{country.area} km<sup>2</sup></div></td>
                    </tr>
                    <tr>
                        <td><div>Borders:</div></td>
                        <td><div>
                        <ul>
                            
                        { // map the object to access both values at once
                            neighbors.length === 0 ? 'none' :
                            Object.keys(neighborNames).map((item, i) => (
                            <li key={i}><Link to={`/country/${neighborNames[item].code}`}><span>{ neighborNames[item].name }</span></Link>
                            </li>
                        ))
                    }  
  
                        </ul>
                        
                        </div></td>
                        </tr>
                    </tbody>
                </table>
     
            </div>
        )
    }
}
