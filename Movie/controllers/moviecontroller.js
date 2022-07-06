const Movie = require('../models/Movie');


//add movie
exports.addMovie = async (req, res) => {
 
    //constant variables for the attributes
    const {name, director, genre,cast, languages, description, theaters, price, availableDay, imgUrl } = req.body;

    let to=new Date(req.body.availableTimeTo)
    let from=new Date(req.body.availableTimeFrom)
    
    const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    //object
    const newMovie= new Movie({
      //initializing properties
      name,
      director,
      genre,
      cast, 
      languages, 
      description, 
      theaters,
      price, 
      availableDay,
      availableTimeTo,
      availableTimeFrom,
      imgUrl 
    })
   
    //saving the object to the db 
    newMovie.save().then(() => {
      res.status(200).json({ status: "New Movie Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to Add Movie",error:error.message})
    })
  }



//movie update
exports.updateMovie = async(req,res) => {

    let movieID = req.params.id;
    const { name, director, genre,cast, languages, description, theaters,price, availableDay, } = req.body;

    let to=new Date(req.body.availableTimeTo)
    let from=new Date(req.body.availableTimeFrom)
    
    const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    const updateMovie = {name, director, genre,cast, languages, description, theaters, price, availableDay, availableTimeTo, availableTimeFrom } 
    
    try{
        //find movie by ID  
         await Movie.findByIdAndUpdate(movieID ,this.updateMovie);

        res.status(200).json({message:"movie updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//movie delete
exports.deleteMovie = async(req,res) => {
    
    let movieId = req.params.id;
    
    try{
        await Movie.findByIdAndDelete(movieId);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message: "delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Movie.find().then((movies)=>{
        
        res.status(200).json(movies)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let movieId = req.params.id;

    await Movie.findById(movieId)
    .then( (movie) =>{
        res.status(200).json(movie)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}

