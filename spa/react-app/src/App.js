import React, { Component } from 'react';
import './App.css';

const djangoServer = 'http://localhost:8000';
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

    filterMovies() {
        const filter = document.getElementById('filter').value.toLowerCase();
        if(filter === ''){
            for (let movie of this.state.movies) {
                movie.show = true;
            }
        }
        for (let movie of this.state.movies) {
            if(movie.title.toLowerCase().includes(filter)){
                movie.show = true;
            } else {
                movie.show = false;
            }
        }
        this.forceUpdate();
    }

    render() {
        const filteredMovies = this.state.movies.filter(movie => (movie.show !== false));
        const movies = filteredMovies.map((movie, i) => (
            <Movie title={movie.title} genre={movie.genre} year={movie.year}/>
        ));
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movie Catalogue</h1>
                </header>
                <br/>
                <input id='filter' type='text' size='50' onChange={this.filterMovies.bind(this)}/>
                <br/>
                <br/>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                    </tr>
                    {movies}
                </table>
                <button>Add Actor</button> <button>Add Movie</button>
            </div>
        );
    }
}

export default App;
