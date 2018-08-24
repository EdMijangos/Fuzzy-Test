import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import transactions from './transactions';

class App extends Component {
  state = {
    searchTerm: '',
    data: transactions,
    results: transactions, //by default, all transactions should show up on load
  }

  render() {

    let data = this.state.results;
    //sort results by date
    data.sort(function(a,b){return new Date(b.date).getTime() - new Date(a.date).getTime()})
    //add results to the variable to render
    const items = data.map(item=>{
      return ( 
        <div className="card" key={item.date + item.amount}>
          <p>Amount: <span>{item.amount}</span></p>
          <p>Date: <span>{item.date}</span></p>
          <p>Last four digits of the card: <span>{item.card_last_four}</span></p>
        </div>)
    });

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Try searching for a transaction</h1>
          </header>
          <input type="text" name="query" className="searchBar" onChange= {(event) => this.handlerInput(event)} />
        </div>
        <div className="results">
          {items}
        </div>
      </div>
    );
  }

  handlerInput(event){
    //changes state and runs filter functions
    const input = event.target.value;
    this.setState({searchTerm: input}, () => {
      this.searchAmount(this.state.searchTerm);
    });
  }

  //filter functions
  searchAmount(term){
    //if no input, return all transactions
    if(term.length === 0) return this.setState({results: this.state.data});
    //else, empty results state
    else return this.setState({results: []}, ()=>{
      //filter data
      const preResults = [];
      this.state.data.map(item=>{
        if(item.amount.toString().includes(term)) return preResults.push(item);
      })
      //update results state with the filtered data and run next filter function
      this.setState({results: preResults}, ()=>{
        this.searchDate(term);
      })
    })
  }

  searchDate(term){
    const preResults = [];
    this.state.data.map(item=>{
      if(item.date.toString().includes(term) && !this.state.results.includes(item)) return preResults.push(item);
    })
    //adding new filtered data to the results state and run next filter function
    this.setState({results: this.state.results.concat(preResults)}, ()=>{
      this.searchDigits(term);
    })
  }

  searchDigits(term){
    const preResults = [];
    this.state.data.map(item=>{
      if(item.card_last_four.toString().includes(term) && !this.state.results.includes(item)) return preResults.push(item);
    })
    //adding new filtered data to the results state
    this.setState({results: this.state.results.concat(preResults)})
  }

  //attempt at making a fuzzy search algorithm 
  //does not work
  fuzzyAlg(term, transaction){
    //split the terms to make a digit by digit comparison
    let termArr = term.split('');
    let transArr = transaction.toString().split('');
    let matches = 0;
    let matchedItems = [];
    //check how many elements in the search query are included in the potential result
    termArr.forEach(element => {
      if (transArr.includes(element)) {
        matchedItems.push(element);
        matches++
      };
    });
    //if at least 70% of the searched elements are a match, the result is relevant
    let relevance = function () {
      if ((matches/termArr.length * 100) >= 70) return true;
      else return false;
    }
    //the matched elements cannot be too far away from each other, otherwise the result is not relevant
    let distance = function () {
      if (matchedItems.length > 1){
        matchedItems.forEach(elem =>{
          for(var i = 1; i < matchedItems.length; i++){
            if (transArr.indexOf(elem) - transArr.indexOf(matchedItems[i]) <= 2 
            && transArr.indexOf(elem) - transArr.indexOf(matchedItems[i]) >= -2)
            return true;
            else return false;
          }
        })
      } else return true;
    }
    //if the result is relevant, return it
    if (relevance && distance) return true;
    else return false
  }
}

export default App;


