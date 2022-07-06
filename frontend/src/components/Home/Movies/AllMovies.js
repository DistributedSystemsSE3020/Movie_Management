import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './AllMovies.css'
import axios from 'axios'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function AllMovies() {

  const [movies, setMovies] = useState([])
  const history = useHistory()
  const location = useLocation()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => { 

    async function getAllMovies() {
      axios.get(`http://localhost:8280/movies/getMovies`).then((res) => {
        setMovies(res.data)  
      }).catch((error) => {
        alert("Failed to fetch the movies")
      })
    }

    getAllMovies()
  }, [location])

  function filterContent(data, searchTerm){
    const result = data.filter((movie) => 
        movie.name.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
    )
    setMovies(result)
  }

  function handleSearch(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8280/movies/getMovies`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch movies")
    })
  }
  
  function Book(id){
    history.push(`/movie/movies`) ///
  }

    return (
      <div className='allMovies_bg'>
        <br/><br/>
        <div className="row ">
          <div className="col-4" >
            <div align="center">
                <h1 className='allMovie_text'>NOW SHOWING</h1>
            </div>
          </div>
          <div className="col-3">
          </div>
          <div className="col-5 ">
            <div className="px-3 search " align="center">
              <input className=''
                type="text" 
                name="search" 
                id="search"
                placeholder="Search" 
                onChange={handleSearch} 
                required 
              />
            </div>
          </div>
        </div>
        <Carousel wipeable={true}  responsive={responsive} autoPlay={true} autoPlaySpeed={2000} infinite={true} className="px-5 py-5 mb-2 "> 
          {movies.map((Movie,key)=>( 
              <div key={key} > 
                  <div className="moviesCard">
                      <div className="moviesImg">
                        {Movie.imgUrl === ""? 
                          <img src="/images/img.jpg" className="moviesImgHeight moviesImgWidth" alt="movies"/>
                        :
                          <img src={`${Movie.imgUrl}`} className="moviesImgHeight moviesImgWidth" alt="movies"/>
                        }
                      </div>
                      <div className="p-3">
                          <h6 className="h6_all1">{Movie.name}</h6>
                          <h6 className="h6_all2">{Movie.genre}</h6>
                          <div align="center">
                              <button className="movBookBtn" onClick={()=>Book(Movie._id)}> Buy Tickets </button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
        </Carousel>
      </div>
    )
}

export default AllMovies
