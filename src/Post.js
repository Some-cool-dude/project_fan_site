import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    LinkedinShareButton, LinkedinIcon,
    PinterestShareButton, PinterestIcon,
    RedditShareButton, RedditIcon
  } from "react-share";
import './styles/posts.scss';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            post: {},
            noPost: false
        }
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
      axios.get(`/api/posts/${this.props.match.params.id}`, {cancelToken: this.signal.token})
      .then(res => {
          if(res.data) {
            this.setState({post: res.data, loading: false, noPost: false});
          }
          else {
            this.setState({noPost: true, loading: false});
          }
      })
      .catch(err => console.log(err));
    }

    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    }

  render() {
    return (
        <main className="content">
         <ul className="breadcrumb">
            <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/">Home</a></li>
            <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/posts">Posts</a></li>
            <li className="breadcrumb__elem">{this.props.match.params.id}</li>
        </ul> 
        {this.state.post !== {} && !this.state.noPost &&
        <>
         <div className="post">
            <div className="post__user">
              <img className="post__user-ava" src={this.state.post.userAva} />
              <span className="post__user-content">{this.state.post.userEmail}</span>
              <span className="post__user-content">{new Date(this.state.post.date).toUTCString()}</span>
              <span className="space"></span>
            </div>
            {this.state.post.img && <img className="post__img" src={this.state.post.img} alt="post image" />}
            <div className="post__content">
              <h4><b>{this.state.post.title}</b></h4>
              <p className="post__text" style={{overflow: "visible", wordWrap: "break-word", height: "100%"}}>{this.state.post.text}</p>
            </div>
          </div>  
        </>}
        <div className="social">
            <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={window.location.href}>
                <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
            <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <PinterestShareButton url={window.location.href} media={this.state.post.img}>
                <PinterestIcon size={50} round={true} />
            </PinterestShareButton>
            <RedditShareButton url={window.location.href}>
                <RedditIcon size={50} round={true} />
            </RedditShareButton>
        </div>
        {this.state.noPost && <p>No such post</p>}
        {this.state.loading && <div className="loader"></div>}
      </main>
    );
  }
}

Post.propTypes = {
    match: PropTypes.object
  };

export default Post;
