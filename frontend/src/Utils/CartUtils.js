import axios from "axios";

export const AddToCart = (movieID,id,Price) => {

    const movieid = movieID
    const customerID = id
    const quantity = 1
    const type = "shopping"
    const price = Price
    let total = quantity*price;

    const cartItem = {movieid, customerID, quantity, type, price, total}
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`
        }
    };


    axios.post("http://localhost:8280/cart/addCart", cartItem , config).then((res)=>{
        alert("Ticket Added to Cart")
    }).catch((error)=>{         
        if(error.response.status === 409){
            alert("This movie name already exists in your cart")
         }else if(error.response.status === 401){
            alert("Please login")
        }
        else{
            alert("Can't add ticket to your cart")
            console.log(error)     
        }        
    })

  
}