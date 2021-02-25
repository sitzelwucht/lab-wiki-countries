import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import CountryDetails from './CountryDetails'
import '../App.css'
export default class CountriesList extends Component {


    state = {
        countries: []
    }


    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            this.setState({
                countries: response.data
            })
        })
        .catch(err => console.log(err))
    }


    render() {

        const { countries } = this.state

        return (
            <div>
                <div className="columns">
                    <div className="column left">
                {
                    countries.map((item, i) => {
                        return <div key={i}><img src={item.flag} width="75" alt="flag"/> <Link to={`/country/${item.alpha3Code}`}> {item.name} </Link></div>
                    })
                }      
            </div>
          
                <div className="column right">
                    <Route path={`/country/:countryId`} render={(routeProps) => {
                        return <CountryDetails countryId={routeProps.match.params.countryId} />
                    }} />
                </div>
          </div>

            </div>
        )
    }
}
