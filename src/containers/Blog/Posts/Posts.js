import React, {Component} from "react";
import axios from "../../../axios";
import {Link, Route} from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                console.log(response);
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectPostId: id});
    };

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // Quick Fix Extension is to:
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    <Link to={'/' + post.id} key={post.id}>
                        <Post
                            clicked={() => this.postSelectedHandler(post.id)}
                            author={post.author}
                            title={post.title}/>
                    </Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/:id" exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;