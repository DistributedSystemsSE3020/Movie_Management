import React,{useState,useEffect} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddPayment.css';
import { OutlinedInput } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function CardPayment(){
    const user=JSON.parse(localStorage.getItem('user'));
    const customerID=user._id;
    const [creditCardNumber,setCreditCardNumber]= useState("");
    const history=useHistory();
    const amount=JSON.parse(localStorage.getItem('total'));
    const cartItem=JSON.parse(localStorage.getItem('selectedItem'));
    const [itemList,setItemList]=useState([])
   
    useEffect(()=> {
        const List=[...itemList]
        cartItem.map((Cart)=>
            getCartItems(Cart)   
        ) 
        async function getCartItems(Cart){

            await axios.get(`http://localhost:8070/cart/${Cart}`).then((res) => {
                let movieid=res.data.result.movieid
                let quantity=res.data.result.quantity
                List.push({movieid,quantity})
            }).catch((error) => {
                alert("Failed to fetch Items")
            })

        }
       setItemList(List)
    },[])
     //header with authorization token
     const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`,
        }
    };

    async function sendData(e){
        e.preventDefault();
        const newPayment={
            customerID,
            amount,
            creditCardNumber,
              
        }
        //getting data from backend
        await axios.post("http://localhost:8280/payment/makePayment",newPayment).then((res)=>{
            alert("payment successful")
            const paymentID=res.data.payment._id
    
            const newOrder={
                paymentID,
                itemList,
                customerID
            }
      
    
           
        }).catch((error)=>{
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/customer/signin')
            }
            else{
                 alert("Payment unsuccessful")   
            }
        })  
      
    }
   
    
    return(
        <div className="container" align="center">
            <div className="card_pay_div">
            <div className="card-form">
                <form onSubmit={sendData} className="boxAddPayment">
                    <div className="row">
                        <div className="col-12">
                            <div div className="row">
                                <h3>Pay with Credit Card</h3>
                                <div className="col-12">
                                <img src="/images/payment.png" height="50px" width="180px" alt="payment" />
                                </div>
                                <br></br>
                                <div className="col-md-12 mb-4 mt-4">
                                    <div className="form-group5">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Name on card" 
                                            required fullWidth
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput 
                                            type="text" id="creditCardNumber" placeholder="Credit Card Number"
                                            required fullWidth
                                            onChange={(event)=> {setCreditCardNumber(event.target.value)}}
                                            
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput  
                                            type="text" id="cvv" placeholder="CVV" 
                                            required fullWidth
                                            
                                        />
                                    </div>
                                </div> 
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput  
                                            type="text" id="Expire Date" placeholder="Expiry Date" 
                                            required fullWidth  
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div> 
                                <div className="col-md-12 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput  
                                            type="text" id="amount" placeholder="Total Amount" 
                                            required fullWidth
                                            value={amount}
                                            readOnly 
                                         
                                            inputProps={{style: {padding: 12}}}
                                            startAdornment={

                                                <InputAdornment position="start">

                                                    LKR

                                                </InputAdornment>

                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>                       
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group5">
                                <input className="form-submit-btn button_booking " type="submit" value="Add payment " />
                            </div>
                        </div>
                    </div>       
                </form>                  
            </div></div>
        </div>               
    )
}
 
    
    

