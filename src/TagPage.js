import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PostCard from "./widgets/PostCard";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: 10,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin:2
    },
}));

function TagPage(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState();
    const {params} = props.match;

    //fetch data from server
    const loadData = () => {
        axios.post(configs.server_address + '/latest', {tag: params.tagname}).then(res => {
            if (res.data.success) {
                setResponses(res.data.posts);
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
    const tagOptions = ['science', 'lifestyle', 'social', 'economy'];
    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            <main style={{backgroundColor: "#cfd8dc"}}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            {params.tagname}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Explore awesome Blogs on {params.tagname}.
                        </Typography>
                        <div className={classes.chips}>
                            {tagOptions.map((tag) => (
                                <Button href={'/tags/' + tag}>
                                    <Chip icon={<LocalOfferIcon/>} key={tag} label={tag}
                                          className={classes.chip} />
                                </Button>
                            ))}
                        </div>
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
                    {responses && responses.length <1 ? (
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            No blog posts found for this tag.
                        </Typography>
                    ):(null)}
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

export default TagPage;
