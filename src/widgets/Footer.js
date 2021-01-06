import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import configs from "./../config";
import TelegramIcon from '@material-ui/icons/Telegram';


function Copyright() {
    return (
        <Typography variant="body2" align="center" style={{color: '#d0d0d0'}}>
            {'Copyright © '}
            <Link color="inherit" href={configs.website_address}>
                {configs.website_name}
            </Link>{' '}
            {new Date().getFullYear()}

        </Typography>
    );
}

export default function Footer() {
    return (
        <footer style={{backgroundColor: 'rgb(36, 40, 44)', padding: 10}}>

            <Typography variant="h5" align="center" style={{color: 'white'}} component="p">
                A short Blog App for CoFoundersTown
            </Typography>

            <Copyright/>
        </footer>
    );

}

