import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  //   console.log("This is my initializer")
    
  //   const movies = [
  //     {id: 0, poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg", title: "Avengers: Infinity War", overview: "This is a summary of the movie."},
  //     {id: 1, poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg", title: "Avengers: Infinity War", overview: "This is a summary of the movie."},
  //   ]

  //   this.state = {rows:[
  //     <p key="1">Row</p>,
  //     <p key="2">Row</p>,
  //     <p key="3">Row</p>
  //   ]}

  //   var movieRows = []
  //   movies.forEach((movie) => {

  //     console.log(movie.title)
  //     const movieRow = <MovieRow movie={movie}/>
  //     movieRows.push(movieRow)
  //   })

  //   this.state = {rows: movieRows}

  this.performSearch("avengers")
    }

    performSearch(searchTerm){
      console.log("Perform search")
      const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1105e03ad7207ee8bdc4293400c00f19&language=en-US&page=1&include_adult=false&query=" + searchTerm
      $.ajax({
        url: urlString,
        success: (searchResults) => {
          console.log("Fetched data successfully")
          const results = searchResults.results

          var movieRows = []

          results.forEach((movie) =>{
            movie.poster_src="https://image.tmdb.org/t/p/w185" + movie.poster_path
            console.log(movie.title)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)

          })
           
          this.setState({rows: movieRows})
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })

    }

    searchChangeHandler(event){
      console.log(event.target.value)
      const boundObject = this
      const searchTerm = event.target.value
      boundObject.performSearch(searchTerm)
    }

  render() {
    return (
      <div className="App">

        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="movie icon" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Movie-Studio-icon.png" class="movie-icon"/>
              </td>
              <td width="8"/>
              <td>
                <h1>Movies Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input class="inputBar" onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

        {this.state.rows}
      </div>
    );
  }

}

export default App;
