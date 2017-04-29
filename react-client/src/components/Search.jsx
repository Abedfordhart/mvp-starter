import React from 'react'
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  onChange(e) {
    this.setState({
      city: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.city);
  }

  render() {
    return (<div>
      <h4>Add more cities!</h4>
      Enter the name of a location: <input value={this.state.city} onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}>Search</button>
    </div>)
  }
}

export default Search;