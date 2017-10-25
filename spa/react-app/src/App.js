import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';

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
        this.state = {movies: [], filtered: [], addMovieModalOpen: false};
    }

    componentDidMount() {
        fetch(moviesUrl)
        .then(results => {return results.json()})
        .then(data => {
            this.setState({ movies: data, filtered: data})
        })
    }

    filterMovies() {
        const filter = document.getElementById('filter').value.toLowerCase();
        if(filter === ''){
            this.setState({filtered: this.state.movies})
        } else {
            let filtered = []
            for (let movie of this.state.movies) {
                if(movie.title.toLowerCase().includes(filter) || movie.genre.toLowerCase().includes(filter)){
                    filtered.push(movie);
                }
            }
            this.setState({filtered: filtered})
        }
    }

    addMovieModalOpen(){
        this.setState({addMovieModalOpen: true});
    }

    addMovieModalClose(){
        this.setState({addMovieModalOpen: false});
    }

    submitNewMovie(){
        let form = new FormData(document.getElementById('addMovieForm'));
        let movies = this.state.movies;
        movies.push({title: form.get('title'), genre: form.get('genre'), year: form.get('year'), actors: []})
        fetch(moviesUrl, {method: "POST", body: form})
        this.setState({movies: movies})
        this.addMovieModalClose();
    }

    render() {
        const movies = this.state.filtered.map((movie, i) => (
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
                <button onClick={this.addMovieModalOpen.bind(this)}>Add Movie</button>
                <Modal isOpen={this.state.addMovieModalOpen} onRequestClose={this.addMovieModalClose.bind(this)}>
                    <h1>Add Movie</h1>
                    <form id='addMovieForm'>
                        <label>Title</label> <input name='title' type='text'/><br/>
                        <label>Genre</label> <input name='genre' type='text'/><br/>
                        <label>Year</label> <input name='year' type='text'/><br/>
                    </form>
                    <br/>
                    <br/>
                    <button onClick={this.submitNewMovie.bind(this)}>Submit</button>
                </Modal>
            </div>
        );
    }
}

export default App;
