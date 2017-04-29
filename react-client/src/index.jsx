import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cities: []
    }
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  search(city) {
    console.log(`${city} was searched`)
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/cities',
      contentType: 'application/JSON',
      data: JSON.stringify({'location': city}),
      success: (data) => {
        console.log('POST sent to Express server!')
      },
      error: () => {
        console.log('Error sending POST to Express server!')
      }
    });
  }

  render () {
    return (<div>
      <h1>Weather</h1>
      <List cities={this.state.cities }/>
      <Search onSearch = {this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));