import React from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import configs from "./../config";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import logo from './../assets/logo.png';
import Link from "@material-ui/core/Link/Link";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
        height: 40
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: 'white',
    },
}));

export default function Header() {
    const classes = useStyles();
    //todo use params to add profile links
    return (
        <AppBar position="relative" style={{backgroundColor: 'rgb(36, 40, 44)'}}>
            <Toolbar style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <Link color="inherit" href={configs.website_address}>
                        <img src={logo} alt={'Logo'} className={classes.icon} style={{float: 'left'}}/>
                    </Link>
                </div>
                <div>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/signup" className={classes.link}>
                            Sign Up
                        </Link>
                        <Link variant="button" color="textPrimary" href="/login" className={classes.link}>
                            Log In
                        </Link>
                        <Link variant="button" color="textPrimary" href="/user/username" className={classes.link}>
                            Profile
                        </Link>
                        <Link variant="button" color="textPrimary" href="/publish" className={classes.link}>
                            Publish
                        </Link>
                    </nav>
                </div>
            </Toolbar>

        </AppBar>
    );

}

