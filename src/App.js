import React, { Component } from 'react'
import Navbar from './components/Navbar'
import CountriesList from './components/CountriesList'


export default class App extends Component {

  render() {
    return (
      <div>
      <Navbar />
      <CountriesList />
      </div>
    )
  }
}
