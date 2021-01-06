import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import configs from './config.json';
import Footer from './widgets/Footer';
import Header from './widgets/Header';
import WaveBorder from "./widgets/WaveBorder";
import back_image from './assets/deadpool.png';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: 10,
        backgroundImage: `url(${back_image})`
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));

function TagPage() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    //fetch data from server
    const loadData = (timestamp) => {
        axios.post(configs.server_address + '/getAd', {page: 'home'}).then(res => {
            if (res.data.success && res.data.data.enabled) {
                setResponses(res.data.data);
            }
        }).catch(err => {
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
            <WaveBorder
                upperColor={'rgb(36, 40, 44)'}
                lowerColor="#FFFFFF"
                className={classes.waveBorder}
                animationNegativeDelay={2}
            />
            <main style={{backgroundColor: "#cfd8dc"}}>
                {/* Hero unit */}

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
