import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEY  = 'bcc81f6f64d6413280d85014e72e4b15'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY

                // Hint: You will need a function to change this URL to 
                // dynamically modify the start and end date range.
                + '&primary_release_date.gte=2019-01-01'
                + '&primary_release_date.lte=2019-02-25'
                
                // Hint: You will want to dynamically change the page number 
                // and genre number.
                + '&page=1&with_genres=16';

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';
   
@Component({
    selector: 'app-root',
    template: `
    <a href="">HOME</a>
    <a href="">ABOUT</a>
                <h1>Genres</h1>
                <select>
                    <option *ngFor="let genre of _genreArray">
                    {{genre.id}} {{genre.name}}
                   
                    </option>
                </select>
                <h1>Movies</h1>
                <ul>
                    <li *ngFor="let movie of _movieArray">
                    Title: {{movie.title}} 
                    <br>
                    Genre ID: {{movie.genre_ids}}
                    <br>
                    Overview: {{movie.overview}}
<!--Hint: You need to modify this line dynamically to show the proper image -->
                    <img src='https://image.tmdb.org/t/p/w500/{{movie.poster_path}}'/> 
                    </li>
                </ul>
              `
})
export class AppComponent {
    _movieArray!: Array<any>;
    _genreArray!: Array<any>;
    _http:HttpClient;

    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {
        this.getMovies();
        this.getGenres();
        this.getDateRange();
    }

    getDateRange() {
        let today = new Date();
        this.getFormattedDate(today);

        let sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate( sixtyDaysAgo.getDate() - 60 );
        this.getFormattedDate(sixtyDaysAgo);
    }

    // Hint.
    // Months and days less than 10 you may want to 
    // create some kind of string formater that appends a 0 
    // before the day or month number.
    getFormattedDate(dt:Date) {
        // alert("Current Day: " + dt.getDate() 
        //     // The month count starts at 0 so Janaury is month number 0.
        //     + " Month: " + (Number(dt.getMonth()) + 1) 
        //     + " Year: "  + dt.getFullYear());
    }

    getMovies() {        
      this._http.get<any>(BASE_URL)
      .subscribe({
          next: (data) => {
              let page = data.page;
              let totalPages = data.total_pages;
              console.log("Page number: " + page 
                  + " Total Pages: " + totalPages);

              this._movieArray  = data.results;
              console.log(this._movieArray);
          },
          error: (er) => { 
              // Let user know about the error.
              alert(er);
              console.error(er);
          }
      });
  }

  getGenres() {
      this._http.get<any>(GENRE_URL)
      .subscribe({
          next: (data) => {
              this._genreArray = data.genres;
              console.log(JSON.stringify(this._genreArray));
          },
          error: (er) => {
              // Let user know about the error.
              alert(er);
              console.error(er)
          }
      });
  }
}
