
import React,{useState,useEffect} from 'react'
import requests from './requests';
import axios1 from './axios'
import './Banner.css';
function Banner() {
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
async function fetchData(){
   const request=await axios1.get(requests.fetchNetflixOriginals)
   
    setMovie(request.data.results[
        Math.floor(Math.random()*request.data.results.length)
     ]);
     return request;
   
}
fetchData()
    },[])
console.log(movie)

    return (
        <header className='banner'
        style={{backgroundSize:'cover',
        backgroundImage:`url(
           "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition:'center center',
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.name || movie?.title || movie?.original_name}</h1>
            <div className="banner__buttons">
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>

            </div>
            <h1 className='banner__description'>{movie?.overview}</h1>
            
            </div>
            
            
            
            
             {/*Background Image */}
            {/*Titile */}
            {/*Div with two Btn */}
            {/*Description */}
            <div className='banner--fadeBottom'></div>
        </header>
    )
}

export default Banner;
