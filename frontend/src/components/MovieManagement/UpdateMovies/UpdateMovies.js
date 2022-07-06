import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {OutlinedInput} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './UpdateMovies.css';

function UpdateMovies(props) {

    const [name, setName] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [cast, setCast] = useState("");
    const [languages, setLanguages] = useState([]);
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [theaters, setTheater] = useState([]);
    const [availableDay, setDay] = useState([]);
    const [availableTimeFrom, setTimeFrom] = useState(new Date('2021-09-10T14:20:00'));
    const [availableTimeTo, setTimeTo] = useState(new Date('2021-09-10T14:20:00'));
    const [previewSource, setPreviewSource] = useState();
    const history = useHistory();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const dates = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    const language = [
        'Sinhala', 'English', 'Tamil'
    ]

    const theater = [
        'Gold Class', 'Digital 2D', 'Digital 3D', 'ATMOS'
    ]


    useEffect(() => {
        async function fetchMovie() {
            await axios.get(`http://localhost:8280/movies/${props.match.params.id}`).then((res) => {
                setName(res.data.name)
                setDirector(res.data.director)
                setGenre(res.data.genre)
                setCast(res.data.cast)
                setLanguages(res.data.languages)
                setDescription(res.data.description)
                setTheater(res.data.theaters)
                setDay(res.data.availableDay)
                setTimeFrom('2021-09-10T' + res.data.availableTimeFrom + ':00')
                setTimeTo('2021-09-10T' + res.data.availableTimeTo + ':00')
                setImgUrl(res.data.imgUrl)
            }).catch((error) => {
                alert("Failed to fetch user data")
            })
        }

        fetchMovie()
    }, [props]);

    async function update(event) {

        event.preventDefault();

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


        const updatedMovie = {
            name,
            director,
            genre,
            cast,
            languages,
            description,
            theaters,
            availableDay,
            availableTimeTo,
            availableTimeFrom
        }

        const config = {
            headers: {
                "content-Type": "application/json",
            }
        };

        try {
            await axios.put(`http://localhost:8280/movies/${props.match.params.id}`, updatedMovie, config);
            alert("Updated Successfully")
            history.push('/movie/movies')
        } catch (error) {
            alert("Updating failed")
        }
    }


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
        <div className="bg_signup2" align="center">

            <img
                className="homeimg2"
                src="../images/m4.jpg"
                alt="download from store"
            />
            <br/><br/>
            <div className="row">
                <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2 className='h2_signup2' align="center">Update Movie</h2>
                    </div>
                </div>
            </div>
            <div className="form_signUp2">
                <form onSubmit={update} className="boxSignUp2">
                    <div className="row">

                        <div className="col-12">
                            <div className="row">

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input2'
                                                   type="text"
                                                   name="name"
                                                   id="name"
                                                   value={name}
                                                   placeholder="Movie Name"
                                                   onChange={(e) => setName(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                                <br/>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input2'
                                                   type="text"
                                                   name="director"
                                                   id="director"
                                                   value={director}
                                                   placeholder="Director"
                                                   onChange={(e) => setDirector(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input2'
                                                   type="text"
                                                   name="genre"
                                                   id="genre"
                                                   value={genre}
                                                   placeholder="Genre"
                                                   onChange={(e) => setGenre(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <OutlinedInput className='form_input2'
                                                   type="text"
                                                   name="cast"
                                                   id="cast"
                                                   value={cast}
                                                   placeholder="Cast & Crew"
                                                   onChange={(e) => setCast(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>

                                <div className="col-xl-6 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
                                    <Select className='form_input2'
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
                                    <OutlinedInput className='form_input2'
                                                   type="text"
                                                   name="description"
                                                   id="description"
                                                   value={description}
                                                   placeholder="Description"
                                                   onChange={(e) => setDescription(e.target.value)}
                                                   required fullWidth
                                                   inputProps={{style: {padding: 12}}}
                                    />
                                </div>


                                <div className="col-xl-6 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label">Theaters</InputLabel>
                                    <Select className='form_input2'
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


                                <br/>

                                <div className="col-xl-12 mb-3">
                                    <InputLabel id="demo-mutiple-chip-label">Available Day</InputLabel>
                                    <Select className='form_input2'
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
                                    <div className="col-xl-6 mb-3">
                                        <KeyboardTimePicker className='form_input2'
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
                                        <KeyboardTimePicker className='form_input2'
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

                                <div className="col-4">

                                    {previewSource ?
                                        <img src={previewSource} alt="preview" className="previewImg2"/>
                                        :
                                        <img src={`${imgUrl}`} className="previewImg2" alt="movie image"/>
                                    }

                                    <div className="form-group2">
                                        <label htmlFor="moviepic">
                                            <input
                                                style={{display: 'none'}}
                                                id="moviepic"
                                                name="moviepic"
                                                type="file"
                                                onChange={handleFileInputChange}
                                                value={fileInputState}
                                            />

                                            <Button color="primary" variant="contained" component="span"
                                                    className="button_3" style={{left:100}}>
                                                <AddAPhotoIcon/> &nbsp; Upload Banner
                                            </Button>
                                        </label>
                                    </div>

                                </div>
                                <div className="col-xl-12">
                                    <input type="submit" className="form-submit-btn btn_sign_up2"
                                           value="Update Details"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    )

}


export default UpdateMovies