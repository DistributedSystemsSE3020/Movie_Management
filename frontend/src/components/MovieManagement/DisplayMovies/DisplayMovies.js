import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './DisplayMovies.css'
import axios from 'axios'
import { red,blue } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';



function DisplayMovies() {

  const [isAdmin,setIsAdmin]= useState(false)
  const [movies, setMovies] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }

    async function getAllMovies() {
      axios.get(`http://localhost:8280/movies/getMovies`).then((res) => {
        setMovies(res.data)  
      }).catch((error) => {
        alert("Failed to fetch the movies")
      })
    }
    
    getAllMovies()
  }, [location,isAdmin])

  
  function filterContent(data, searchTerm){
    const result = data.filter((movie) => 
        movie.name.toLowerCase().includes(searchTerm) 
    )
    setMovies(result)
  }

  function handleSearchAll(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8280/movies/getMovies`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Admin Failed to fetch movies")
    })
  }
  function view(id){
    history.push(`/movie/movies/${id}`)
  }
  
  function addMovie(){
    history.push(`/movie/addMovie`)
  }
    return (
        <div className="container  display_movies"><br/><br/>
          <div className="row"> 
              <div className="col-4"> <br/><br/>
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                  <h2 className='h1_displayMovies'>NOW SHOWING</h2>
                </div>
              </div>
              <div className="col-5">
              {isAdmin === true ?
                <div className="px-3 search search1" align="right" style={{ marginTop:55,marginLeft:620 }}>
                  <input style={{ color:'black' }} className="search1"
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                  />
                </div>
                :
                <div className="px-3 search search1" align="right">
                </div> 
              }  
          </div>
        </div><br/><br/>
        <div className="productGrid"  > 
          {isAdmin && 
            <Button  className="productBtn "  style={{ color:'black', backgroundColor:'#0000008a',width:400 }} onClick={()=>addMovie()}>
            <strong>Add Movie</strong> <AddIcon/>
            </Button>  
          }
          {movies.map((Movie,key)=>( 
                <div key={key}> 
                    <div className="productCard" >
                        <div className="imgBx">
                            <img  src={`${Movie.imgUrl}`} alt="movie" className="itemProduct"/>
                        </div>
                        <div className="p-3">
                            <h7>{Movie.name}</h7>
                            <h6>{Movie.genre}</h6>
                            <div align="center">
                              <span> 
                                  <button className="productBtn"  onClick={()=>view(Movie._id)}> Show More </button>
                              </span> 
                            </div>
                        </div>
                    </div>
                </div>
          ))} 
        </div>
      </div>
    )      
}

export default DisplayMovies
