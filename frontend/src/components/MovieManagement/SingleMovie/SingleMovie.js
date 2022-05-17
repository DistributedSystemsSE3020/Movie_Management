import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../DisplayMovies/DisplayMovies.css";
import "./SingleMovie.css";
import axios from "axios";
import { blue, red } from "@material-ui/core/colors";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import MovieIcon from '@mui/icons-material/Movie';
import PaymentIcon from '@mui/icons-material/Payment';

function MovieDetails(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [id, setID] = useState();
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [cast, setCast] = useState("");
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [theaters, setTheater] = useState([]);
  const [price, setPrice] = useState("");
  const [availableDay, setAvailableDay] = useState([]);
  const [availableTimeTo, setAvailableTimeTo] = useState("");
  const [availableTimeFrom, setAvailableTimeFrom] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const history = useHistory();
  const [user, setUser] = useState("");

  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }
    async function getMovieDetails() {
      axios
        .get(`http://localhost:8070/movie/movies/${props.match.params.id}`)
        .then((res) => {
          setName(res.data.name);
          setDirector(res.data.director);
          setGenre(res.data.genre);
          setCast(res.data.cast);
          setLanguages(res.data.languages);
          setDescription(res.data.description);
          setTheater(res.data.theaters);
          setPrice(res.data.price);
          setAvailableDay(res.data.availableDay);
          setAvailableTimeTo(res.data.availableTimeTo);
          setAvailableTimeFrom(res.data.availableTimeFrom);
          setImgUrl(res.data.imgUrl);
          setID(res.data._id);
        })
        .catch((err) => {
          alert("Failed to Fetch Movie");
        });
    }
    getMovieDetails();
  }, [props]);

  async function deleteMovie(id) {
    await axios
      .delete(`http://localhost:8070/movie/movies/delete/${id}`, config)
      .then(() => {
        alert("Movie deleted successfully");
        history.push("/movie/movies");
      })
      .catch((error) => {
        alert(`Failed to delete the movie\n${error.message}`);
      });
  }

  function updateMovie(id) {
    history.push(`/movie/movies/update/${id}`);
  }

  function Book() {
    history.push(`/movie/movies/reservation/${id}`);
  }

  console.log(price);

  return (
    <div className="main_div1" align="center">
      <img src={`${imgUrl}`} className="one_movie_img1" alt="profile pic" />

      <br />
      <br />
      <br />
      <div className="row "></div>

      <div className="boxUpdate px-5 main_div2">
        <div className="row">
          <div className="">
            <div>
              <img
                src={`${imgUrl}`}
                className="one_movie_img2"
                alt="profile pic"
              />
              <div className="form-group">
                <label htmlFor="profilepic">
                  <input
                    style={{ display: "none" }}
                    id="profilepic"
                    name="profilepic"
                    type="file"
                  />
                </label>
              </div>
            </div>
            <div className="row">
              

              <div className="positon_left">
              <h4 className="single_movie_topic1"> {name}</h4>
              <h5 className="single_movie_topic2">{genre}</h5><br/>
               <p className="mb-0"><strong>Directors : </strong> {director}</p><br/>
                
                <p className="mb-0"><strong>Theaters :</strong> {theaters}</p><br/>
                <h6><strong>Available Days and time</strong></h6><br/>
                
              <p className="mb-0">
                {" "}
                {availableDay.map((Day) => (
                  <span> {Day} </span>
                ))}
              </p>
              <p className="mb-0">
                {" "}
                {availableTimeTo} - {availableTimeFrom}
              </p>

              <table className="singleItemBtn">
          <div>
            {isAdmin === true ? (
              <div>
                <button
                  className="mx-2 productBtn button2"
                  style={{ backgroundColor: blue[400] }}
                  onClick={() => updateMovie(id)}
                >
                  Update <EditIcon />
                </button>
                <button
                  className="mx-2 productBtn button2"
                  style={{ backgroundColor: red[500] }}
                  onClick={() => deleteMovie(id)}
                >
                  Delete <DeleteForeverIcon />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="mx-2 productBtn button2"
                  style={{ backgroundColor: red[500] }}
                  onClick={() => Book()}
                >
                  Make a Booking
                </button>
              </div>
            )}
          </div>
        </table>


              </div>




              <div className="positon_right">
                {" "}
                <p><MovieIcon fontSize="small"/>  Watch Trailer  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<PaymentIcon fontSize="small"/>  Buy Ticket Online</p>
                <p></p><br/><br/>
                <p className="mb-0"><strong>Languages : </strong>{languages}</p><br/>
                <p className="mb-0"><strong>Cast & Crew :</strong> {cast}</p><br/>
                <p className="mb-0">{description}</p>
                
             
                
              </div>



            </div>
          </div>
        </div>
 
      </div>
      <br></br>

      <div></div>
    </div>
  );
}

export default MovieDetails;
