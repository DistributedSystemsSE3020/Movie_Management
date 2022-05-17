const MovieRouter=require("express").Router();
const { addMovie, updateMovie, deleteMovie } =require('../controllers/moviecontroller.js');
const { fetchAll, fetchOne} =require('../controllers/moviecontroller.js');

MovieRouter.post('/addM',addMovie);

MovieRouter.put('/movies/update/:id',updateMovie);

MovieRouter.delete('/movies/delete/:id', deleteMovie);

MovieRouter.post('/',fetchAll);

MovieRouter.get('/movies/:id',fetchOne);

module.exports = MovieRouter;