import React,{useState,useEffect} from "react"
import QRCode from 'qrcode';
import { Link } from "react-router-dom";
import './QR.css';

export default function QRcode() {

    const [src, setSrc] = useState("")

    useEffect(() => {
        QRCode.toDataURL("http://localhost:8070/movie/movies/reservation/${id}")
        .then(setSrc)
    },[]);


    return (
      <div className="container">
        <div class="row">
          <div class="column">
            <div class="card">
              <h2>Scan from Here</h2>
              <div className="qrCode">
                <img src={src} />
              </div>

              <h2>OR</h2>

              <Link to="/" className="form-submit-btn">
                Get it from Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }