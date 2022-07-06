import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import './Reservation.css';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {blue,red,orange } from '@material-ui/core/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import BookMySeats from "../SeatBooking/BookMySeats";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {AddToCart} from './../../../Utils/CartUtils'



function Reservation(props) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [movieID, setMovieID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [name, setName] = useState("");
  const [theaters, setTheaters] = useState("");
  const [price, setPrice] = useState("");
  const [time,setTime] = useState([]);
  const [date, setDate] = useState(new Date());
  const history = useHistory()

  const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

  useEffect(() => {

    setTime(localStorage.getItem('time'));

    async function getMovieDetails() {
      axios.get(`http://localhost:8280/movies/${props.match.params.id}`, config).then((res) => {
        setMovieID(res.data._id)
        setCustomerID(user._id)
        setName(res.data.name)
        setTheaters(res.data.theaters)
        setPrice(res.data.price)
      }).catch((error) => {
        console.log(error)
        alert("Failed to fatch details")
      })
    }
    getMovieDetails();

  }, [props])

  const handleSelectDateChange = (date) => {
    setDate(date);
  };

  const startDate = new Date();

  function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }

  function sendData(e) {
    e.preventDefault();
    const newReservation = {
      movieID,
      customerID,
      date,
      time,
      price
    }


    localStorage.setItem("reservation", JSON.stringify(newReservation))
    history.push(`/customer/payment`)

  }

 
  
  return (
    <div className="container" align="center">
      <div className="row"><br/>
        <div className="col-1" style={{width:'400px'}}><br/>
          <form onSubmit={sendData} className="col-6 mt-5">
            <div className="row">
              <h6 className="reservation_text">Customer Name</h6>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group1 ">
                  <OutlinedInput  className="input_reservation"
                    type="text" id="customer" placeholder="Customer Name" readOnly fullWidth
                    value={user.firstname + ' ' + user.lastname}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group2">
                  <h6 className="reservation_text">Movie Name</h6>
                  <OutlinedInput className="input_reservation"
                    type="text" id="movie" placeholder="Movie" required readOnly fullWidth
                    value={name}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group3">
                  <h6 className="reservation_text">Show Time</h6>
                  <OutlinedInput className="input_reservation"
                    type="text" id="time" placeholder="Time" required readOnly fullWidth
                    value={time}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
                </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group4">
                  <h6 className="reservation_text">Date</h6>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack className="input_reservation"   spacing={3}>
                      <DesktopDatePicker
                        shouldDisableDate={disablePrevDates(startDate)}
                        inputFormat="dd/MM/yyyy"
                        value={date}
                        required
                        onChange={handleSelectDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>

            </div>
          </form>
          <div className="film_hall_div">
            <div className="film_hall_div_sub1">

            </div>
            <div className="film_hall_div_sub2">

            </div>
            <div className="film_hall_div_sub3">

            </div>

          </div>

          <button className="mx-2 productBtn add_cart_button"
                                        onClick={()=>AddToCart(movieID, user._id, price)}>
                                           Add To Cart <ShoppingCartIcon/>
         </button> 
          </div>
          <div className='book'>
              <BookMySeats/>
          </div>
        </div>
       
      </div>
      
      
 
  )

}

export default Reservation
