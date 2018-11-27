import React, {Component} from 'react';
// import axios from 'axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../HOC/asyncComponent';

// import FullPost from './FullPost/FullPost';

// process for lazy loading routing
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* <li><Link to='/'>Home</Link></li> */}
                            {/* "Link" itself won't account for CSS classnames so NavLink is used */}
                            {/* 'activeClassName' allows you to create classnames other than "active" */}
                            <li><NavLink
                                to='/'
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: 'fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                // default is 'absolute' path
                                // to make 'relative' do:
                                // pathname: this.props.match.url + '/new-post',
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" exact render={() => <h1>Home</h1>}/>*/}

                {/* Order is important but even more so with Switch as it will shut off
                 after it find the first error. Additionally, a single Route (or more)
                  can exist outside of Switch */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    {/* the original method had NewPost here instead */}
                    {/*{this.state.auth ? <Route path="/new-post" component={NewPost}/> : null}*/}

                    <Route path="/posts" exact component={Posts}/>
                    {/*<Redirect from="/" to="/posts"/>*/}
                    {/* The redirect above and this route can't be used together in current method */}
                    {/* So if we used redirect from anything else '/blog/' etc. then that would work */}
                    {/*<Route render={() => <h1>Not Found!</h1>} />*/}
                </Switch>
                {/* An easier fix than switch to prevent FullPost from showing on NewPost is this: */}
                {/* <Route path="/posts/:id" exact component={FullPost}/> */}
            </div>
        );
    }
}

export default Blog;