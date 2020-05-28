import React from 'react';
import axios from 'axios';
import './styles/gallery.scss';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            loading: true,
            gallery: [[], [], []]
        }
        this.src = '';
        this.err = null;
        this.page = 1;
        this.end = false;
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
      this.getGallery(this.page);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      this.signal.cancel('Api is being canceled');
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        if(!this.end) {
          this.setState({loading: true});
          this.page++;
          this.getGallery(this.page);
        }
      }
    }

    getGallery = (page) => {
      axios.get(`/api/gallery?_limit=15&_page=${page}`, {cancelToken: this.signal.token})
      .then(res => {
        this.end = false;
        let arr = this.state.gallery;
        for(let i = 0; i < res.data.length; i++) {
          arr[i%3].push(res.data[i])
        }
        if(res.data.length === 0) this.end = true;
        this.setState({gallery: arr, loading: false});
      })
      .catch(err => console.log(err));
    }

    openModal = (src) => {
        this.src = src;
        this.setState({show: true});
    }

  render() {
    return (
      <main className="content">
        {this.state.show &&
        <div className="image-modal">
            <span className="image-modal__close-btn" onClick={() => this.setState({show: false})}>&times;</span>
            <img className="image-modal__content" src={this.src} />
        </div>}
        <div className="gallery">
          {this.state.gallery.map((elem, index) =>
            <div key={-index} className="column">
              {elem.map((src, i) => 
                <img className="gallery__img" key={i} onClick={() => this.openModal(src)} src={src}/>
              )}
            </div>
          )}
        </div>
        {this.state.loading && <div className="loader"></div>}
      </main>
    );
  }
}

export default Gallery;
