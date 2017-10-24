import React, { Component } from 'react';
import './App.css';

const djangoServer = 'http://localhost:8000';
const actorsUrl = djangoServer + '/actors/';
const moviesUrl = djangoServer + '/movies/';

function Movie(props) {
    return(
        <tr>
            <td>title</td>
            <td>genre</td>
        </tr>
    )
}

class App extends Component {
    renderMovie() {
        return <Movie/>;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movie Tracker</h1>
                </header>
                <br/>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                    </tr>
                    {this.renderMovie()}
                    {this.renderMovie()}
                    {this.renderMovie()}
                    {this.renderMovie()}
                </table>
            </div>
        );
    }
}

export default App;
