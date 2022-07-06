const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


const MovieRouter = require("./routes/movierouter");
const CustomerRouter = require("./routes/customerrouter.js");
const CartRouter = require("./routes/cartrouter");
const CreditCardRouter = require("./routes/creditcardrouter.js");
const MobileRouter = require("./routes/mobilebillrouter.js");

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Popcorn Scope Cinemas db connection success");
}); 


//when http://localhost:8070/movie ran it will execute movierouter.js file
app.use("/movie",MovieRouter);
//when http://localhost:8070/customer ran it will execute customerrouter.js file
app.use("/customer",CustomerRouter);
//when http://localhost:8070/cart ran it will execute cartrouter.js file
app.use("/cart",CartRouter);
app.use("/card",CreditCardRouter);
app.use("/mobile",MobileRouter);


//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
