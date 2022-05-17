import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import './Reservation.css';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import BookMySeats from "../SeatBooking/BookMySeats";




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
    async function getMovieDetails() {
      axios.get(`http://localhost:8070/movie/movies/${props.match.params.id}`, config).then((res) => {
        setMovieID(res.data._id)
        setCustomerID(user._id)
        setName(res.data.name)
        setTheaters(res.data.theaters)
        setTime(res.data.time)
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
    console.log(price)

    localStorage.setItem("reservation", JSON.stringify(newReservation))
    history.push(`/customer/payment`)

  }

  return (
    <div className="container" align="center">
      <div className="row">
        <div className="col-1" style={{width:'400px'}}>
          <form onSubmit={sendData} className="col-6 mt-5">
            <div className="row">
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group1">
                  <OutlinedInput
                    type="text" id="customer" placeholder="Customer Name" readOnly fullWidth
                    value={user.firstname + ' ' + user.lastname}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group2">
                  <OutlinedInput
                    type="text" id="movie" placeholder="Movie" required readOnly fullWidth
                    value={name}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group3">
                  <OutlinedInput
                    type="text" id="time" placeholder="Time" required readOnly fullWidth
                    value={time}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
                </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
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
              <div className="col-12">
                <div className="form-group1">
                  <input className="form-submit-btn mb-0" type="submit" value="Book" />
                  
                </div>
              </div>
            </div>
          </form>
   
          </div>
          <div className='book'>
   <BookMySeats/>
          </div>
        </div>
      </div>
      
 
  )

}

export default Reservation
