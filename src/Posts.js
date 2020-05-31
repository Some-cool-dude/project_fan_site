import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './styles/posts.scss';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
      modal: false,
      pages: 0,
      array: [],
      isActive: 1,
    }
    this.user = this.props.cookies.get("email");
    this.post = {};
    this.prevNext = false;
    this.length = 7;
    this.step = 2;
    this.quantity = 1;
    this.nextArr = [],
    this.prevArr = [],
    this.sort = "desc";
    this.searchValue = '';
    this.modal = React.createRef();
    this.signal = axios.CancelToken.source();
  }

  componentDidMount() {
    this.getPosts();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  getPosts = () => {
    axios.get(`/api/posts?title_like=${this.searchValue}&_page=1&_limit=${this.quantity}&_sort=date&_order=${this.sort}`, {cancelToken: this.signal.token})
    .then(res => {
      const count = parseInt(res.headers["x-total-count"]);
      const pages = Math.ceil(count/this.quantity);
      this.prevNext = pages > this.length;
      let array = [];
      this.prevArr = [];
      for(let i = 0; i < pages; i++)
      {
        if(i === this.length - 1 && this.prevNext) {
          array.push("next", pages);
          this.prevArr.push("prev", 1);
          this.nextArr = array;
          break;
        }
        array.push(i + 1);
        this.prevArr.push(pages - i);
      }
      this.prevArr = this.prevArr.reverse();
      this.setState({posts: res.data, loading: false, modal: false, pages: pages, array: array, isActive: 1});
    })
    .catch(err => console.log(err));
  }

  openModal = (id) => {
    this.post = this.state.posts.find(post => post.id === id);
    if(!this.post) {
      this.post = {};
    }
    this.setState({modal: true});
  }

  closeModal = (event) => {
    if (event.target === this.modal.current && this.state.modal) {
        this.setState({modal: false, update: false});
    }
  }

  save = async() => {
    try {
      if(!this.post.title) return this.setState({modal: false});
      if(this.post.id) {
        const res = await axios.put(`/api/posts/${this.post.id}`, this.post, {cancelToken: this.signal.token});
        const i = this.state.posts.findIndex(elem => elem.id === res.data.id);
        this.state.posts[i] = res.data;
        this.setState({modal: false, posts: this.state.posts});
      }
      else {
        this.post.userEmail = this.props.cookies.get("email");
        this.post.userAva = this.props.cookies.get("ava");
        this.post.date = new Date().toJSON();
        await axios.post("/api/posts", this.post, {cancelToken: this.signal.token});
        this.getPosts();
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  delete = (id) => {
    axios.delete(`/api/posts/${id}`, {cancelToken: this.signal.token})
    .then(this.getPosts())
    .catch(err => console.log(err));
  }

  goToPage(page) {
    let array = [];
    if(page - this.step <= 1) {
        array = this.nextArr;
    }
    else if(page + this.step >= this.state.pages) {
      array = this.prevArr;
    }
    else {
        array = [1,"prev"];
        for(let i = 1; i < this.step * 2; i++) {
          array.push(page - this.step + i);
        }
        array.push("next", this.state.pages);
    }
    this.newPage(page, array);
  }

  handleClick = (page) => {
    if(this.prevNext) {
      if(page === "next") {
        this.goToPage(this.state.isActive + this.step);
      }
      else if(page === "prev") {
          this.goToPage(this.state.isActive - this.step);
      }
      else {
          this.goToPage(parseInt(page));
      }
    }
    else {
      this.newPage(parseInt(page), this.state.array);
    }
  }

  newPage = (page, array) => {
    axios.get(`/api/posts?title_like=${this.searchValue}&_page=${page}&_limit=${this.quantity}&_sort=date&_order=${this.sort}`, {cancelToken: this.signal.token})
    .then(res => {
        this.setState({isActive: page, array: array, posts: res.data, modal: false, loading: false});
    })
    .catch(err => console.log(err));
  }

  changeSort = (event) => {
    this.sort = event.target.value;
    this.getPosts();
  }
  
  search = (event) => {
    this.searchValue = event.target.value;
    this.getPosts();
  }

  render() {
    return (
      <main className="content" onClick={this.closeModal}>
        <ul className="breadcrumb">
            <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/">Home</a></li>
            <li className="breadcrumb__elem">Posts</li>
        </ul>
        {this.state.modal &&
        <div ref={this.modal} className="modal">
            <div className="modal__content">
                <span className="modal__close-btn" onClick={() => this.setState({modal: false})}>&times;</span>
                <label>
                    <b>Image:</b>
                    <input className="modal__content-img" type="text" defaultValue={this.post.img} onChange={(e) => this.post.img = e.target.value}/>
                </label>
                <label>
                    <b>Title(required):</b>
                    <input className="modal__content-title" type="text" defaultValue={this.post.title} placeholder="fill this field or post will not be saved" onChange={(e) => this.post.title = e.target.value}/>
                </label>
                <label>
                  <b>Text:</b>
                  <textarea className="modal__content-text" defaultValue={this.post.text} onChange={(e) => this.post.text = e.target.value}/>
                </label>
                <div className="modal__actions">
                    <button className="modal__cancel-btn" onClick={() => this.setState({modal: false})}>Cancel</button>
                    <button className="modal__save-btn" onClick={this.save}>Save</button>
                </div>
            </div>
        </div>}
        <div className="posts-action">
          <input className="post__search" type="text" name="search" placeholder="Search.." onChange={this.search}></input>
          <label className="post__sort">
            Sort: 
            <select value={this.sort} onChange={this.changeSort}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
          </label>
          <button className="post__add-btn" onClick={() => this.openModal(0)}>< i className="fa fa-plus"></i></button>
        </div>
        {this.state.posts.map(post => 
          <div key={post.id} className="post">
            <div className="post__user">
              <img className="post__user-ava" src={post.userAva} />
              <span className="post__user-content">{post.userEmail}</span>
              <span className="post__user-content">{new Date(post.date).toUTCString()}</span>
              <span className="space"></span>
              <a className="share" href={`/posts/${post.id}`}>
                <i className="fa fa-share"></i>
              </a>
            </div>
            {post.img && <img className="post__img" src={post.img} alt="post image" />}
            <div className="post__content">
              <h4><b>{post.title}</b></h4>
              {post.text && <p className="post__text">{post.text}</p>}
              {post.text && post.text.split("\n").length - 1 >= 6 && <a className="more" href={`/posts/${post.id}`}>show more <i className="fa fa-caret-down"></i></a>}
            </div>
            {post.userEmail === this.user &&
              <div className="post__buttons">
                <button className="post__delete-btn" onClick={() => this.delete(post.id)}>Delete <i className="fa fa-trash"></i></button>
                <button className="post__edit-btn" onClick={() => this.openModal(post.id)}>Edit <i className="fa fa-edit"></i></button>
              </div>
            }
          </div>
        )}
        {this.state.loading && <div className="loader"></div>}
        <div className="pagination">
        <span>{this.state.array.map(page => <button key={page} className={this.state.isActive === page ? 'pagination__btn active-page' : 'pagination__btn'} onClick={() => this.handleClick(page)}>{page}</button>)}</span>
        </div>
      </main>
    );
  }
}

Posts.propTypes = {
    cookies: PropTypes.instanceOf(Cookies)
};

export default Posts;
