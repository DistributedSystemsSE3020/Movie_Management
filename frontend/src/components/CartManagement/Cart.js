import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SubIcon from '@material-ui/icons/Remove';
import { Button, IconButton } from '@material-ui/core';
import { red , orange, green} from '@material-ui/core/colors';
import './cart.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckRound from '@material-ui/icons/TripOrigin';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Aos from "aos";
import "aos/dist/aos.css"


function Cart(props) {
    const [movies, setMovies] = useState([])
    const [isShopping, setIsShopping] = useState(true)
    const history = useHistory()
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    let finalTotal = 0;
    
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`
        }
    };
    Aos.init({duration:2000})

    useEffect(() => {
        //check Cart type
        if (props.match.params.type === "shopping") {
            setIsShopping(true)
        }
        else if(props.match.params.type === "wishlist"){
            setIsShopping(false)
        }
        
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8280/cart/${props.match.params.id}&${props.match.params.type}`,config).then((res) => {
                setMovies(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Items")
            })
        }
        getData();        
    }, [props])

    
    //select all checkbox
    const handleSelectAll = event => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(movies.map(movie => movie._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    //one checkbox
    function handleClick(event) {
        const id = event.currentTarget.id;
        const checked = event.currentTarget.checked;
        setIsCheck([...isCheck, id]);

        if (!checked) {
            setIsCheck(isCheck.filter(movie => movie !== id));
        }
    };

    isCheck.map(movieID => (                                              
        getTotal(movieID)

    ))

    localStorage.setItem("selectedItem",JSON.stringify(isCheck))

    async function getTotal(id) {
        let iTotal
        await axios.get(`http://localhost:8070/cart/${id}`,config).then((res) => {
            iTotal = res.data.result.total 
            finalTotal = finalTotal + iTotal            
            
            
        }).catch((error) => {
          alert("Failed to fetch cal")
        })
        localStorage.setItem("total",finalTotal)
    }

    //Update Item
    async function updateQuantity(id,quantity,price) {
        
        try {
            await axios.put(`http://localhost:8280/cart/${id}`,{quantity,price},config)
            history.push(`/cart/${props.match.params.id}/${props.match.params.type}`)
        } catch (error) {            
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/customer/signin')
                } 
                else{
                    alert("Update failed")
                }
        }  
                     
    }

    //Increment Quantity
    function increment(id,Price) {
        movies.forEach(Movie => {
            if(Movie._id === id){
                if(Movie.quantity<10){
                    Movie.quantity++
                    updateQuantity(Movie._id,Movie.quantity,Price)
                }
            }
        })       
    }

    //Decrease Item
    function decrease(id,Price) {
        movies.forEach(Movie => {
            if(Movie._id === id){
                if(Movie.quantity>1){
                    Movie.quantity--
                    updateQuantity(Movie._id,Movie.quantity,Price)
                }
            }
        })       
    }

    //delete Item
    async function deleteItem(id){        
        await axios.delete(`http://localhost:8070/cart/delete/${id}`, config).then(() => {
            alert("Item deleted successfully")
            setMovies(movies.filter(element => element._id !== id))
        }).catch((error) => {
            alert(`Failed to delete the item\n${error.message}`)
        }) 
    } 

    // search
    function filterContent(data, searchTerm){
        const result = data.filter((movies) => 
            movies.movieid.name.toLowerCase().includes(searchTerm)
        )
        setMovies(result)
      }
    
      function handleSearch(event){
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8280/cart/${props.match.params.id}&${props.match.params.type}`).then((res) => {
          filterContent(res.data.result, searchTerm.toLowerCase())
        }).catch((error) => {
          alert("Failed to fetch item")
        })
      }

      function checkout() {
          history.push(`/customer/select/`)
      }

   
     
    return (
        <div>
            <div className="container">
                {/* check cart type */}
                <div className = "row">
                    <div className="col-4">
                        <div className="dropdown">
                            <span>{isShopping ? <h2>Shopping Cart</h2> : <h2>Wishlist</h2> }</span>
                            <div className="dropdown-content">
                                {isShopping ? <a href={`/cart/${props.match.params.id}/withlist`}><h5 className="linkColor">Wishlist</h5></a> : <a href={`/cart/${props.match.params.id}/shopping`}><h5 className="linkColor">Cart</h5></a>}
                            </div>
                        </div>
                    </div>                    
                    <div className="col-3">
                    </div>
                    <div className="col-5">
                        <div className="px-3 search" align="center">
                            <input 
                                type="text" 
                                name="search" 
                                id="search"
                                placeholder="Search" 
                                onChange={handleSearch} 
                                required 
                            />
                        </div>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-12 exp"> <br/>
                    {/* select all check box*/}
                        <FormControlLabel
                            control={<Checkbox icon={<CheckRound/>}
                            checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}
                            id="selectAll" 
                            name="checkedH" />}
                            onChange={handleSelectAll}
                            checked={isCheckAll}
                            label="Select All"
                        />            
                        <br/><br/>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-xl-8"data-aos="slide-up">
                        {/* map */}
                        {movies.map((Movie, key) => ( 
                            <div key={key} >                                
                                <div className="cart-box mb-3 shadow">                        
                                    <div className="row align-items-center ">
                                        <div className="col-sm-1">
                                            {/* Check box for item */}
                                            <FormControlLabel                                                    
                                                checked={isCheck.includes(Movie._id)}
                                                control={
                                                    <Checkbox icon={<CheckRound />} 
                                                        checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}  name="checkedH" 
                                                        id = {Movie._id}
                                                        onChange={handleClick}
                                                    />
                                                }
                                            />
                                        </div>
                                        {/* Product Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="product-Img" src={Movie.movieid.imgUrl} alt="product"></img></div>
                                        </div>
                                        {/* Product Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4>{Movie.movieid.name}</h4>
                                            <p className="textShort mb-1">{Movie.movieid.description}</p>   
                                        </div>
                                        <div className="col-sm-2">
                                            <div>
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>decrease(Movie._id,Movie.movieid.price)}>
                                                    <SubIcon style={{fontSize:"small"}}></SubIcon>
                                                </IconButton>

                                                {/* Quantity */}
                                                <Input type="text" name="quantity" className="quantity" disableUnderline margin="dense" readOnly value={(Movie.quantity)}/>
                                                
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>increment(Movie._id,Movie.movieid.price)}>
                                                    <AddIcon style={{fontSize:"small"}}></AddIcon>
                                                </IconButton>
                                            </div>
                                        </div>
                                        {/* Price */}
                                        <div className="col-sm-2">
                                            LKR&nbsp;{Movie.total}.00
                                            {}
                                        </div>
                                        <div className="col-sm-1">
                                            <IconButton onClick={()=>deleteItem(Movie._id)}>
                                                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary Card */}
                    <div className="col-xl-4" >
                        <div className="cardSummary shadow">
                            <h5>Reservation Summary</h5>
                                <br/>
                                <div className="row">
                                    {/* Address
                                    <div className="col-xl-12 mb-3">
                                        <h6>Address:</h6>
                                        <OutlinedInput  
                                            type="text" id="lastname" placeholder="Address" 
                                            required fullWidth
                                            value={user.address}
                                        />                                   
                                    </div> */}
                                    <hr/>                                                                  
                                    {/* Checkout Button */}
                                    <Button disableElevation style={{backgroundColor:red[500]}} variant="contained" color="secondary" onClick={checkout}>
                                    <b>Checkout</b>
                                    </Button>
                                </div>                                
                        </div>
                    </div>
                </div>        
            </div>               
        </div>
    )
}
export default Cart
