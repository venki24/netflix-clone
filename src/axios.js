import axios from 'axios';
//Base url to make requests to the movie database

const instance=axios.create({
    baseURL:'https://api.themoviedb.org/3'
})


axios.get('/foobar')
//Above one is https://api.themoviedb.org/3/foobar
//We are initailised base url and we attaching what file we want to url


export default instance;