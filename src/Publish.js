import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MenuItem from "@material-ui/core/MenuItem";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PostCard from "./widgets/PostCard";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifySelf: 'center',
        paddingTop: 10,
        marginTop: 10
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        paddingBottom: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

function Publish() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const [post, setPost] = useState({title: '', body: '', image: '', tags: []});
    const [error, setError] = useState();
    const [info, setInfo] = useState();
    const handleChange = (event) => {
        let newPost = {
            ...post,
            [event.target.name]: event.target.value
        };
        setPost(newPost);
    };

    //store data to server
    const savePost = () => {
        setLoading(true);
        //todo get JWT from local storage

        //todo if found, add JWT to request and send to server
        //todo if not found, redirect to home
        axios.post(configs.server_address + "/publish", post)
            .then((res) => {
                if (res.data.success) {
                    //show success message
                    setInfo('New blog post created!');
                }
                setLoading(false);
            }).catch((err) => {
            setLoading(false);
            console.log(err);
            if (err.response) setError(err.response.data.message);
        });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const tagOptions = ['Science', 'Lifestyle', 'Social', 'Economy'];

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>
            {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
            <main style={{backgroundColor: "#cfd8dc"}}>
                <Snackbar open={error} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar open={info} autoHideDuration={5000} onClose={() => setInfo(null)}>
                    <Alert severity="success" onClose={() => setInfo(null)}>
                        {info}
                    </Alert>
                </Snackbar>

                <Container className={classes.cardGrid} maxWidth="sm">
                    {/*Preview of post*/}
                    <PostCard post={post} key={post.title}/>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PostAddIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create a Blog post
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={post.title}
                                        name={'title'}
                                        label="Post Title"
                                        onChange={handleChange}
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={post.image}
                                        name={'image'}
                                        label="Banner image link"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel>Add Some Tags</InputLabel>
                                        <Select
                                            multiple
                                            value={post.tags}
                                            name={'tags'}
                                            onChange={handleChange}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip icon={<LocalOfferIcon/>} key={value} label={value}
                                                              className={classes.chip}/>
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {tagOptions.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Body of your post"
                                        multiline
                                        required
                                        rowsMax={15}
                                        variant="outlined"
                                        value={post.body}
                                        name={'body'}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={savePost}
                            >
                                Publish Blog Post
                            </Button>

                        </form>
                    </Paper>
                </Container>

            </main>

            {/* Footer */}
            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
            {/* End footer */}

        </React.Fragment>
    );
}

export default Publish;
