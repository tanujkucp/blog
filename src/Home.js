import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import back_image from './assets/deadpool.png';
import PostCard from "./widgets/PostCard";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingBottom: 180,
        backgroundImage: `url(${back_image})`
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    }
}));

function Home() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    //fetch data from server
    const loadData = (timestamp) => {
        axios.post(configs.server_address + '/latest').then(res => {
            if (res.data.success) {
                setResponses(res.data.data);
                setLoading(false);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
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
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            {configs.website_name}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Explore blogs by people and publish your own by signing up for FREE!
                        </Typography>
                    </Container>
                </div>

                {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}

                <Container className={classes.cardGrid} maxWidth="lg">
                    {responses ? (<div>
                            <Grid container spacing={4}>
                                {responses.map((post) => (
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

export default Home;
