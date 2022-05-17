import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {OutlinedInput} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DateFnsUtils from '@date-io/date-fns';
import './AddMovie.css';
import axios from "axios";


function AddMovie() {

    const [name, setName] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [cast, setCast] = useState("");
    const [languages, setLanguages] = useState([]);
    const [description, setDescription] = useState("");
    const [theaters, setTheater] = useState([]);
    const [price, setPrice] = useState("");
    const [availableDay, setDay] = useState([]);
    const [availableTimeFrom, setTimeFrom] = useState(new Date('2021-09-10T14:20:00'));
    const [availableTimeTo, setTimeTo] = useState(new Date('2021-09-10T14:20:00'));
    const [previewSource, setPreviewSource] = useState();
    const history = useHistory();

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

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


    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        let imgUrl

        if (previewSource) {
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "movie_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) => {
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }


        const newMovie = {
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
        }

        try {

            await axios.post("http://localhost:8070/movie/addM", newMovie, config);
            alert("movie added successfully")
            event.target.reset();
        } catch (error) {
            alert("failed to add the movie!");

        }


    }


    const dates = [
        '10.30 AM' , '2.30 PM' , '5.30 PM' , '7.30 PM'
    ]

    const language = [
        'Sinhala', 'English', 'Tamil'
    ]

    const theater = [
        'Gold Class', 'Digital 2D', 'Digital 3D', 'ATMOS'
    ]


    //handling the image uploading


    const handleLanguageChange = (event) => {
        setLanguages(event.target.value);
    };

    const handleTheaterChange = (event) => {
        setTheater(event.target.value);
    };

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    const handleTimeToChange = (timeTo) => {
        setTimeTo(timeTo);
    };

    const handleTimeFromChange = (timeFrom) => {
        setTimeFrom(timeFrom);
    };


    return (
        <div className="bg_signup" align="center">

            <img
                className="homeimg"
                src="../images/downloadApp1.jpg"
                alt="download from store"
            />
            <br/><br/>


            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2 className='h2_signup' align="center">Add Movie</h2>
                    </div>
                </div>
            </div>
            <div className="form_signUp">
                <form style={{height: 800, width:1100, marginLeft:200}} onSubmit={add} className="boxSignUp"><br/><br/> <br/><br/>
                    <div className="row">

                        <div style={{marginLeft:100}} className="col-10 ">
                            <div className="row">

                                <div className="col-xl-6 mb-4">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="name"
                                                   id="name"
                                                   placeholder="Movie Name"
                                                   onChange={(e) => setName(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                                <br/>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="director"
                                                   id="director"
                                                   placeholder="Director"
                                                   onChange={(e) => setDirector(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="genre"
                                                   id="genre"
                                                   placeholder="Genre"
                                                   onChange={(e) => setGenre(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="cast"
                                                   id="cast"
                                                   placeholder="Cast & Crew"
                                                   onChange={(e) => setCast(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label"><strong>Languages</strong></InputLabel>
                                    <Select className='form_input'
                                            id="demo-mutiple-chip"
                                            multiple fullWidth
                                            value={languages}
                                            onChange={handleLanguageChange}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value}/>
                                                    ))}
                                                </div>
                                            )}
                                    >
                                        {language.map((language) => (
                                            <MenuItem key={language} value={language}>
                                                {language}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                                <br/>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="description"
                                                   id="description"
                                                   placeholder="Description"
                                                   onChange={(e) => setDescription(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>


                                <div className="col-xl-6 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label"><strong>Theaters</strong></InputLabel>
                                    <Select className='form_input'
                                            id="demo-mutiple-chip"
                                            multiple fullWidth
                                            value={theaters}
                                            onChange={handleTheaterChange}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value}/>
                                                    ))}
                                                </div>
                                            )}
                                    >
                                        {theater.map((theater) => (
                                            <MenuItem key={theater} value={theater}>
                                                {theater}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>


                                <br/>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input'
                                                   type="text"
                                                   name="price"
                                                   id="price"
                                                   placeholder="Price"
                                                   onChange={(e) => setPrice(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                                <br/>

                                <div className="col-xl-12 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label"><strong>Available Day</strong></InputLabel>
                                    <Select className='form_input'
                                            id="demo-mutiple-chip"
                                            multiple fullWidth
                                            value={availableDay}
                                            onChange={handleChange}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value}/>
                                                    ))}
                                                </div>
                                            )}
                                    >
                                        {dates.map((date) => (
                                            <MenuItem key={date} value={date}>
                                                {date}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                                <br/>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className="col-xl-6 mb-3 ">
                                        <KeyboardTimePicker className='form_input'
                                                            margin="normal"
                                                            id="time-picker"
                                                            label="Time From"
                                                            value={availableTimeFrom}
                                                            onChange={handleTimeFromChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change time',
                                                            }}
                                        />
                                    </div>
                                    <div className="col-xl-6 mb-3">
                                        <KeyboardTimePicker className='form_input'
                                                            margin="normal"
                                                            id="time-picker"
                                                            label="Time To"
                                                            value={availableTimeTo}
                                                            onChange={handleTimeToChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change time',
                                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                                <br/>

                                <br/>

                                <div className="col-4 ">

                                    {previewSource ?
                                        <img src={previewSource} style={{borderRadius:0}} alt="preview" className="previewImg"/>
                                        :
                                        <img src="/images/img.jpg" style={{borderRadius:0}} className="previewImg" alt="movie image"/>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="moviepic">
                                            <input
                                                style={{display: 'none'}}
                                                id="moviepic"
                                                name="moviepic"
                                                type="file"
                                                onChange={handleFileInputChange}
                                                value={fileInputState}
                                            />

                                            <Button   style={{height:50, borderRadius:10}} className="button2" color="primary" variant="contained"
                                                    component="span">
                                                <AddAPhotoIcon/> &nbsp; Upload Banner
                                            </Button>
                                        </label>
                                    </div>

                                </div>
                                <div className="col-xl-12">
                                    <input type="submit" className="form-submit-btn btn_sign_up" value="Add Details"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default AddMovie;