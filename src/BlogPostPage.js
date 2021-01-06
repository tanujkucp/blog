import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import back_image from './assets/deadpool.png';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import BlogPost from "./widgets/BlogPost";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));

function BlogPostPage(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState();
    const {params} = props.match;

    //fetch data from server
    const loadData = () => {
        axios.post(configs.server_address + '/post', {id: params.id}).then(res => {
            if (res.data.success) {
                setPost(res.data.post);
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
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
            {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
            <main style={{backgroundColor: "#cfd8dc"}}>
                {post ? (
                    <Container className={classes.cardGrid} maxWidth="sm">
                    <BlogPost post ={post}/>
                    </Container>
                ) : (null)}
                {!loading && post == null ? (
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        No blog post found for this this ID.
                    </Typography>
                ) : (null)}

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

export default BlogPostPage;
