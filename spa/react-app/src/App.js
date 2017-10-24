import React, { Component } from 'react';
import './App.css';

const djangoServer = 'http://localhost:8000';
const actorsUrl = djangoServer + '/actors/';
const moviesUrl = djangoServer + '/movies/';

function Movie(props) {
    return(
        <tr>
            <td>{props.title}</td>
            <td>{props.genre}</td>
            <td>{props.year}</td>
        </tr>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: []};
    }

    componentDidMount() {
        fetch(moviesUrl)
        .then(results => {return results.json()})
        .then(data => {
            this.setState({ movies: data })
        })
    }

    render() {
        const movies = this.state.movies.map((item, i) => (
            <Movie title={item.title} genre={item.genre} year={item.year}/>
        ));
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movie Catalogue</h1>
                </header>
                <br/>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                    </tr>
                    {movies}
                </table>
            </div>
        );
    }
}

export default App;
