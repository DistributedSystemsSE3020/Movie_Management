import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './UpdateProfile.css';

function UpdateProfile(props) {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [userImg, setUserImg] = useState("");

    const history = useHistory();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/customer/${props.match.params.id}`).then((res)=>{
                setFirstName(res.data.result.firstname)
                setLastName(res.data.result.lastname)
                setEmail(res.data.result.email)
                setPhone(res.data.result.phone)
                setAddress(res.data.result.address)
                setUserImg(res.data.result.imgUrl)
            }).catch((error)=>{
                alert("Failed to fetch user data")
            })
        }
        fetchUser()
    },[props]);

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };


    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    //update the user
    async function Update(event){

        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "customer_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updatedCustomer = {firstname,lastname,email,phone,address,imgUrl}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("customerAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/customer/updateprofile/${props.match.params.id}`,updatedCustomer, config);
                alert("Updated Successfully")
                history.push('/customer/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/customer/signin')
            } else{
                alert("Updating Failed")
            }
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>Update Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput
                                            type="text" id="firstname" placeholder="First Name" required fullWidth
                                            value={firstname}
                                            onChange={(event)=> {setFirstName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput  
                                            type="text" id="lastname" placeholder="Last Name" required fullWidth
                                            value={lastname}
                                            onChange={(event)=> {setLastName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput 
                                            type="tel" id="phone" placeholder="phone" required fullWidth
                                            value={phone}
                                            onChange={(event)=> {setPhone(event.target.value)}}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{10}" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput  
                                            type="email" id="email" placeholder="Email" required fullWidth
                                            value={email}
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group5">
                                        <OutlinedInput 
                                            type="text" id="address" placeholder="Address" required fullWidth
                                            value={address}
                                            onChange={(event)=> {setAddress(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                { previewSource  ?
                                    <img src={previewSource} alt="preview" className="previewImg"/>
                                : userImg === ""? 
                                    <img src="/images/avatar.jpg" alt="preview" className="previewImg"/>
                                :
                                    <img src={`${userImg}`} className="previewImg" alt="profile pic"/>
                                }
                                <div className="form-group5">
                                    <label htmlFor="profilepic">
                                        <input
                                            style={{ display: 'none' }}
                                            id="profilepic"
                                            name="profilepic"
                                            type="file"
                                            onChange={handleFileInputChange}
                                            value={fileInputState}
                                        />

                                        <Button color="primary" variant="contained" component="span">
                                            <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group5">
                                <input className="form-submit-btn mb-1" type="submit" value="Update" />
                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default UpdateProfile
