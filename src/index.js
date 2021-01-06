import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import reportWebVitals from './reportWebVitals';
import Home from './Home';

const Login = React.lazy(() => import('./Login'));
const Signup = React.lazy(() => import('./Signup'));
const Profile = React.lazy(() => import('./Profile'));
const Publish = React.lazy(() => import('./Publish'));
const BlogPost = React.lazy(() => import('./BlogPost'));
const TagPage = React.lazy(() => import('./TagPage'));


const loading = () => <LinearProgress variant="query" style={{width: '100%'}} color="secondary"/>;
const routing = (
    <Router>
        <React.Suspense fallback={loading()}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/user/:username" component={Profile}/>
                <Route exact path="/publish" component={Publish}/>
                <Route exact path="/post/:id" component={BlogPost}/>
                <Route exact path="/tags/:tagname" component={TagPage}/>
                <Route component={Home}/>
            </Switch>
        </React.Suspense>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
