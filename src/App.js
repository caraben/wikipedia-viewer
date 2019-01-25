import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    searchFor: "",
    data: null,
    isLoading: false
  };
  componentDidMount() {}

  handleChange = event => {
    this.setState({
      searchFor: event.target.value
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      console.log(this.state.searchFor);
      this.getData();
      this.setState({
        searchFor: ""
      });
    }
  };
  //https://en.wikipedia.org/?curid=   +pageid

  getData = () => {
    this.setState({ isLoading: true });

    let proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl =
        "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
        this.state.searchFor +
        "&format=json";
    fetch(proxyUrl + targetUrl)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data: data.query.search,
          isLoading: false
        });
        console.log(this.state.data);
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };

  render() {
    return (
      <div className="wikipedia">
        <h1>Wikipedia viewer</h1>
        <p>Search for:</p>
        <input
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.searchFor}
        />

        {this.state.isLoading === "true" && <p>Loading</p>}

        <h3>Results:</h3>
        <ul>
          {this.state.data &&
            this.state.data.map((data, i) => (
              <li key={i}>
                <a
                  href={
                    "https://en.wikipedia.org/?curid=" +
                    this.state.data[i].pageid
                  }
                  target="_blank"
                >
                  {this.state.data[i].title} <i className="fas fa-link" />
                </a>
                <p>{this.state.data[i].snippet.replace(/<(.*?)>/g, "")}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
