import React ,{useState,useEffect}from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const base_url="https://image.tmdb.org/t/p/original";


function Row({title,fetchUrl,isLargeRow}) {
   const[movies,setMovies]= useState([]);
   const [trailerUrl ,setTrailerUrl]=useState('')

    //We need a snippet of code runs based on specific conditions
useEffect(()=>{
    async function fetchData(){
        const request=await axios.get(fetchUrl)
        //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213

        setMovies(request.data.results);
        return request;

    }
    fetchData();

},[fetchUrl]) 

const opts={
    hieght:'390px',
    width:'100%',
    playerVars:{
        autoplay:1,
    }
}

const handleClick=(movie)=>{
    if(trailerUrl){
        setTrailerUrl('');
    }
    else {
        movieTrailer(movie?.name ||'')
        .then((url)=>{
               const urlParams=new URLSearchParams(new URL(url).search);
               setTrailerUrl(urlParams.get('v'));// you will get ths value (XtMThy8QKqU&t=9307s) if we assume below  yt link
               //https://www.youtube.com/watch?v=XtMThy8QKqU&t=9307s
               //By using above code we are extraction a text after ? in youtube link that is the unique link of each youtube video

        })
        .catch((error)=>{
            console.log(error)
        })
    }

}

//If we put [] run once when the Row Comp Loads and dont run again
//Whenever you pulled a varibale from outside useeffect
//Here we pulling fetchUrl we need to put that var in [ftechUrl] like this
//Becaouse it is dependedn on fetchUrl variable and in simple wordswe are telling useEffect  if something change is fetchUrl to rerun the useEffect

console.log(movies)
    return (
        <div className='row'>
            <h1>{title}</h1>
            <div className='row__posters'>
            {/*Container => posters*/} 
            {movies.map(movie=>(
                <img
                key={movie.id}
                onClick={()=>handleClick(movie)}
                className={`row__poster ${isLargeRow &&"row__posterLarge"}`} 
                src={`${base_url}${isLargeRow ?movie.poster_path:movie.backdrop_path}`}
                alt={movie.name}/>
            
            ))}

            </div>
             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            
        </div>
    )
}

export default Row
