import React, { useState, useEffect } from "react";
import "./AddPayment.css";
import { Link } from "react-router-dom";


export default function SelectPayment() {


  return (
    <div className="container" align="center">
        <div class="text">
            <h3>Select Your Payment Method</h3>
        </div>
        <div class="box">
            <div className="card-form">
                <div class="row payment_div">

                    <div class="column">
                        <div class="card">
                            <h3>Credit Card</h3>
                            <img src="/images/payment.png" height="100px" width="400px" alt="payment" />
                            <Link to="/customer/card/addCardPayment" className="form-submit-btn button_booking">Pay with Card</Link>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card">
                            <h3>Mobile Bill</h3>
                            <img src="/images/mobile.png" height="100px" width="180px" alt="payment" />
                            <Link to="/customer/mobile/addmobile" className="form-submit-btn button_booking">Pay with Mobile</Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
