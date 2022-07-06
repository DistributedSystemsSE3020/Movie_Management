import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Routes/PrivateRoute';
import CustomerPrivateRoute from './Routes/CustomerPrivateRoute';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './components/Home/Homepage';
import CustomerSignIn from './components/CustomerManagement/SignIn/SignIn';
import CustomerSignUp from './components/CustomerManagement/SignUp/SignUp';
import AdminSignIn from './components/AdminManagement/AdminLogin';
import CustomerForgotPassword from './components/CustomerManagement/ForgotPassword/ForgotPassword';
import CustomerResetPassword from './components/CustomerManagement/ResetPassword/ResetPassword';
import CustomerProfile from './components/CustomerManagement/Profile/Profile';
import CustomerUpdateProfile from './components/CustomerManagement/UpdateProfile/UpdateProfile';
import AddMovie from './components/MovieManagement/AddMovie/AddMovie';
import DisplayMovies from './components/MovieManagement/DisplayMovies/DisplayMovies';
import MovieDetails from './components/MovieManagement/SingleMovie/SingleMovie';
import UpdateMovies from './components/MovieManagement/UpdateMovies/UpdateMovies';
import Reservation from './components/ReservationManagement/Reservation/Reservation';
import BookMySeats from './components/ReservationManagement/SeatBooking/BookMySeats';
import Cart from './components/CartManagement/Cart';
import CardPayment from './components/PaymentManagement/CardPayment';
import MobilePayment from './components/PaymentManagement/MobilePayment';
import SelectPayment from './components/PaymentManagement/SelectPayment';
import QRcode from './components/QRCode/QR';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            <Route path="/" exact component={Homepage} />
            <Route path="/customer/signin" exact component={CustomerSignIn} />
            <Route path="/customer/signup" exact component={CustomerSignUp} />
            <Route path="/admin/signin" exact component={AdminSignIn} />
            <Route path="/customer/forgotpassword" exact component={CustomerForgotPassword} />
            <Route path="/customer/passwordreset/:token" exact component={CustomerResetPassword} />
            <CustomerPrivateRoute path="/customer/profile" exact component={CustomerProfile} />
            <CustomerPrivateRoute path="/customer/updateprofile/:id" exact component={CustomerUpdateProfile} />
            <Route path="/movie/addMovie" exact component={AddMovie}/>
            <Route path="/movie/movies" exact component={DisplayMovies}/> 
            <Route path="/movie/movies/:id" exact component={MovieDetails}/>
            <Route path="/movie/movies/update/:id" exact component={UpdateMovies}/>
            <Route path="/movie/movies/reservation/:id" exact component={Reservation}/> 
            <Route path="/seat" exact component={BookMySeats}/>
            <Route path="/cart/:id/:type" exact component={Cart}/>
            <Route path="/customer/card/addCardPayment" exact component={CardPayment}/>
            <Route path="/customer/mobile/addmobile" exact component={MobilePayment}/>
            <Route path="/customer/select" exact component={SelectPayment}/>
            <Route path="/qr/:id" exact component={QRcode}/>
            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
