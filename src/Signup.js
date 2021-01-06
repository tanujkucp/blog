import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import back_image from './assets/deadpool.png';
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(5),
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
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Signup() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({username: '', password: '', email: '', name: '', age: null});
    const [error, setError] = useState();
    const [info, setInfo] = useState();

    const handleChange = (event) => {
        let newCred = {
            ...credentials,
            [event.target.name]: event.target.value
        };
        setCredentials(newCred);
    };
    //store data to server
    const signup = () => {
        setLoading(true);
        axios.post(configs.server_address + "/signup", credentials)
            .then((res) => {
                if (res.data.success) {
                    //show success message
                    setInfo('New user account created!');
                    //todo redirect to home page
                }
                setLoading(false);
            }).catch((err) => {
            setLoading(false);
            console.log(err);
            if (err.response) setError(err.response.data.message);
        });
    };

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
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}/>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            value={credentials.name}
                                            name={'name'}
                                            label="Name"
                                            onChange={handleChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            value={credentials.age}
                                            name={'age'}
                                            label="Age"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    style={{backgroundColor: '#eee'}}
                                />
                                <Divider variant="middle" style={{width: "100%", marginTop: 20, marginBottom: 10}}/>
                                <Typography component="h1" variant="subtitle1">
                                    Username and password will be used for logins.
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    style={{backgroundColor: '#eee'}}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    style={{backgroundColor: '#eee'}}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={signup}
                                >
                                    Sign Up
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

export default Signup;
