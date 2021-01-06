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

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));

function Profile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const {params} = props.match;

    //fetch data from server
    const loadData = () => {
        //todo get JWT from local storage

        //todo if found, add JWT to request and send to server
        //todo if not found, redirect to home
        axios.post(configs.server_address + '/profile', {username: params.username}).then(res => {
            if (res.data.success) {
                setResponse(res.data.data);
                setLoading(false);
            }else {
                //todo redirect to home
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
            //todo redirect to home
        });
    };

    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            <main style={{backgroundColor: "#cfd8dc"}}>
                {/*Profile Info*/}
                <Container className={classes.cardGrid} maxWidth="sm">
                    {/*<ProfileCard profile={response.profile}/>*/}
                </Container>
                {/*Publishes articles*/}
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/*{response ? (<div>*/}
                    {/*        <Grid container spacing={4}>*/}
                    {/*            {response.posts.map((post) => (*/}
                    {/*                <PostCard post={post} key={post.title}/>*/}
                    {/*            ))}*/}
                    {/*        </Grid>*/}
                    {/*    </div>*/}
                    {/*) : (null)}*/}
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
