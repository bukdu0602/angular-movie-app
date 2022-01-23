import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// Use v3
const baseURL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
const API_KEY  = 'bcc81f6f64d6413280d85014e72e4b15'; 
const dateStartA = '&primary_release_date.gte='
let dateStartB = '2021-11-23'
const dateEndA = '&primary_release_date.lte='
let dateEndB = '2022-01-22'
const genreA     =  '&page=1&with_genres=';
let genreNum   = "18"
let GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';
@Component({
    templateUrl: './app.home.html',
    styleUrls: [ './app.component.css']
})
export class HomeComponent {  _movieArray!: Array<any>;
    _genreArray!: Array<any>;
    _http:HttpClient;
    genreNumSelection!: string;
    pageSelection!: string;
    numOfPage!: number;
    pageArray: Array<number> = [];
    movieArray1: Array<any> = [];
    movieArray2: Array<any> = [];
    movieArray3: Array<any> = [];
    movieArray4: Array<any> = [];
    movieArray5: Array<any> = [];
    _movieArray2!: Array<any>;
    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {
        this.getDateRange();
        this.getMovies();
        this.getGenres();
        
    }
    changePage(){
        if(this.pageSelection == "0"){
            this._movieArray2 = this.movieArray1
        }else if(this.pageSelection == "1"){
            this._movieArray2 = this.movieArray2
        }else if(this.pageSelection == "2"){
            this._movieArray2 = this.movieArray3
        }else if(this.pageSelection == "3"){
            this._movieArray2 = this.movieArray4
        }else if(this.pageSelection == "4"){
            this._movieArray2 = this.movieArray5
        }
        
    }

    changeGenNum(){
        genreNum = this.genreNumSelection.split(" ")[0]

        this.getMovies();
    }

    getDateRange() {
        let today = new Date();
        dateEndB =  today.getFullYear()+ '-'
                    + ('0' + (today.getMonth()+1)).slice(-2) + '-'
                    + ('0' + today.getDate()).slice(-2); 
        let sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate( sixtyDaysAgo.getDate() - 30 );
        dateStartB = sixtyDaysAgo.getFullYear()+ '-'
                    + ('0' + (sixtyDaysAgo.getMonth()+1)).slice(-2) + '-'
                    + ('0' + sixtyDaysAgo.getDate()).slice(-2); 
    }


    getMovies() {    
      this._http.get<any>(baseURL + API_KEY + dateStartA + dateStartB + dateEndA
        + dateEndB + genreA + genreNum)
      .subscribe({
          next: (data) => {
              let page = data.page;
              let totalPages = data.total_pages;
              console.log("Page number: " + page 
                  + " Total Pages: " + totalPages);
              this._movieArray  = data.results;
              this.numOfPage = Math.ceil(this._movieArray.length/4)
              this.pageArray = []
              this.movieArray1 = []
              this.movieArray2 = []
              this.movieArray3 = []
              this.movieArray4 = []
              this.movieArray5 = []

             for(let i=0; i<this.numOfPage; i++ ){
                this.pageArray.push(i)
             }
             for(let i=0; i<this._movieArray.length; i++ ){

                if(i < 4){
                    this.movieArray1.push(this._movieArray[i])
                }else if (i < 8){
                    this.movieArray2.push(this._movieArray[i])
                }
                else if (i < 12){
                    this.movieArray3.push(this._movieArray[i])
                }
                else if (i < 16){
                    this.movieArray4.push(this._movieArray[i])
                }
                else if (i < 20){
                    this.movieArray5.push(this._movieArray[i])
                }
             }
             this._movieArray2 = this.movieArray1
             console.log(this.movieArray5)
             this.pageSelection = "0"


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
            //   console.log(JSON.stringify(this._genreArray));
          },
          error: (er) => {
              // Let user know about the error.
              alert(er);
              console.error(er)
          }
      });
  }}
