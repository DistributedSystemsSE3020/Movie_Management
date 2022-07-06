import React, { useState } from "react";
import classes from "./BookMySeats.css";
import Seats from "./Seats";
import "./print.css";

const createSeats = (rows, startIndex) => {
  let i = 0;
  let j = startIndex;
  let k = "A";
  const section = [];
  while (i < 6 && j <= rows) {
    if (k > "F") {
      k = "A";
      j++;
    }
    if (j < rows + 1) {
      section.push(j + k);
      k = String.fromCharCode(k.charCodeAt(0) + 1);
    }
  }
  return section;
};

const BookMySeats = () => {
  const premiumSeats = createSeats(4, "1");
  const normalSeats = createSeats(8, "5");
  const [availableSeats, setAvailableSeats] = useState([
    "1A",
    "1B",
    "2D",
    "2B",
    "2F",
    "2E",
    "3C",
    "3B",
    "3F",
    "3E",
    "4B",
    "4F",
    "4E",
    "5B",
    "5D",
    "6A",
    "6C",
    "7D",
    "7E",
    "8A",
    "8C",
    "6F",
    "7F",
    "8F",
  ]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");
  const addSeat = (ev) => {
    if (numberOfSeats && !ev.target.className.includes("disabled")) {
      const seatsToBook = parseInt(numberOfSeats, 10);
      if (bookedSeats.length <= seatsToBook) {
        if (bookedSeats.includes(ev.target.innerText)) {
          const newAvailable = bookedSeats.filter(
            (seat) => seat !== ev.target.innerText
          );
          setBookedSeats(newAvailable);
        } else if (bookedSeats.length < numberOfSeats) {
          setBookedSeats([...bookedSeats, ev.target.innerText]);
        } else if (bookedSeats.length === seatsToBook) {
          bookedSeats.shift();
          setBookedSeats([...bookedSeats, ev.target.innerText]);
        }
      }
    }
  };

  const confirmBooking = () => {
    setBookedStatus("You have successfully booked the following seats:");
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + " ";
      });
    });
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    setAvailableSeats(newAvailableSeats);
    setBookedSeats([]);
    setNumberOfSeats(0);
  };

  const [numberOfSeats, setNumberOfSeats] = useState(0);

  return (
    <React.Fragment>
      <div className="seat_booking_div1">
        <div className="seat_booking_div2">
          <div
            style={{ width: 1200, zIndex: 5 }}
            className="alert alert-warning"
            role="alert"
          >
            Notice - Booking of tickets is subject to cinema hall occupancy
            following the government’s guidelines on cinemas operational
            capacity of 75%. Our system will automatically suspend bookings
            beyond our 75% cinema hall capacity. Thank you for your cooperation.
          </div>

          <div className="seats_div_all">
            <p className="main_text_booing">
              How many seats would you like to book?
            </p>
            <input
              className="input"
              value={numberOfSeats}
              onChange={(ev) => setNumberOfSeats(ev.target.value)}
            />
            <div style={{ width: 300, height: 300 }}>
              <Seats
                values={premiumSeats}
                availableSeats={availableSeats}
                bookedSeats={bookedSeats}
                addSeat={addSeat}
              />
              <Seats
                values={normalSeats}
                availableSeats={availableSeats}
                bookedSeats={bookedSeats}
                addSeat={addSeat}
              />

              <button className="button_booking" onClick={confirmBooking}>
                Book seats
              </button>
              <p>{bookedStatus}</p>
            </div>
          </div>
          <div className="homeimg_screen"></div>
        </div>

        <div className="homeimg_img">
          <div className="homeimg_img1"></div>
        </div>

        <div>
          <dl className="list_booking">
            <dt className="list_booking1">
              <div className="circle1"></div>
              Selected
            </dt>
            <dt className="list_booking1">
              <div className="circle2"></div>
              Available
            </dt>
            <dt className="list_booking1">
              <div className="circle3"></div>
              Reserved
            </dt>
          </dl>
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default BookMySeats;
