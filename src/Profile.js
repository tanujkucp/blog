import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import Typography from "@material-ui/core/Typography";
import ProfileCard from "./widgets/ProfileCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PostCard from "./widgets/PostCard";
import {Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Login from "./Login";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(5),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    },
    online: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 5
    },
}));

function Profile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [redirect, setRedirect] = useState();
    const [savedUser, setSavedUser] = useState(null);
    const {params} = props.match;

    //fetch data from server
    const loadData = () => {
        //get JWT from local storage
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        if (jwt == null || username !== params.username) {
            //redirect to home page
            setTimeout(() => setRedirect('/'), 1000);
            return;
        }
        //console.log(jwt);

        //add JWT to request and send to server
        axios.post(configs.server_address + '/profile', {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            if (res.data.success) {
                setUser(res.data.user);
                //console.log(res.data.user);
                setPosts(res.data.posts);
                setLoading(false);
            } else {
                alert('An error occurred! Please login again.');
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    };

    const logout = () => {
        //delete credentials from local storage
        localStorage.clear()
        //redirect to home
        setTimeout(() => setRedirect('/'), 1000);
    };

    useEffect(() => {
        setLoading(true);
        loadData();
        const username = localStorage.getItem('username');
        setSavedUser(username);
    }, []);

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header user={savedUser}/>
            {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
            <main style={{backgroundColor: "#cfd8dc"}}>
                {/*Profile Info*/}
                <Container className={classes.cardGrid} maxWidth="sm">
                    {user ? (
                        <div>
                            <div style={{paddingTop: 10}}><ProfileCard profile={user}/></div>
                            <Paper className={classes.online}>
                                <LockOpenIcon style={{color: '#0f0'}}/>
                                <Typography component="h1" variant="h6">
                                    Currently Logged In
                                </Typography>
                                <Button onClick={logout} style={{marginLeft: 30}} variant={'contained'}
                                        color={'secondary'}>
                                    Log Out
                                </Button>
                            </Paper>
                        </div>) : (null)}
                </Container>
                {/*Publishes articles*/}
                <Container className={classes.cardGrid} maxWidth="lg">
                    {posts ? (<div>
                            <Grid container spacing={4}>
                                {posts.map((post) => (
                                    <PostCard post={post} key={post.title}/>
                                ))}
                            </Grid>
                        </div>
                    ) : (null)}
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

export default Profile;
