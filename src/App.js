import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tweets: [],
    };
  }
  componentDidMount () {
    axios ('http://localhost:3000/api/hashtags').then (res => {
      this.setState ({tweets: res.data});
      console.log (this.state.tweets);
    });
  }
  render () {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title ">
              Treading Hashtags#
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Hashtag#Time</th>
                  <th>US</th>
                  <th>Germany</th>
                  <th>Uk</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tweets.map (tweet => (
                  <tr>
                    <td>{tweet.date}</td>
                    <td>{tweet.tweets}</td>
                    <td>{tweet.tweets}</td>
                    <td>{tweet.tweets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
