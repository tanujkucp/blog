import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from "react-router-dom";
import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
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

function Login() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState();
    const [info, setInfo] = useState();
    const [redirect, setRedirect] = useState();
    const [savedUser, setSavedUser] = useState(null);

    const handleChange = (event) => {
        let newCred = {
            ...credentials,
            [event.target.name]: event.target.value
        };
        setCredentials(newCred);
    };
    //store data to server
    const login = () => {
        setLoading(true);
        axios.post(configs.server_address + "/login", credentials)
            .then((res) => {
                if (res.data.success) {
                    //show success message
                    setInfo('You have logged in successfully!');
                    //save jwt token in local storage
                    localStorage.setItem('jwt', res.data.jwt);
                    localStorage.setItem('username', credentials.username);
                    //redirect to home page
                    setTimeout(()=> setRedirect('/'), 3000);
                }
                setLoading(false);
            }).catch((err) => {
            setLoading(false);
            console.log(err);
            if (err.response) setError(err.response.data.message);
        });
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        setSavedUser(username);
    }, []);

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header user={savedUser}/>
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
                            Log In
                        </Typography>
                        <form className={classes.form} noValidate>
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
                                autoFocus
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
                                onClick={login}
                            >
                                Log In
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

export default Login;
