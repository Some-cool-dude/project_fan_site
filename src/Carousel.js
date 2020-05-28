import React from 'react';
import PropTypes from 'prop-types';
import './styles/carousel.scss'

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        elements: this.props.slides.map((src, index) => 
        <div key={index} className="carousel__slide">
            <img className="carousel__img" src={src}></img>
        </div>
      )
    }
    this.length = this.props.slides.length;
    this.slides = this.state.elements;
    this.index = 0;
  }

  next = () => {
    this.index++;
    if (this.index === this.length) {
        this.index = 0;
    }
    this.setState({elements: this.slides[this.index]});
  }

  prev = () => {
    if (this.index === 0) {
        this.index = this.length;
    }
    this.index--;
    this.setState({elements: this.slides[this.index]});
  }

  render() {
    return (
      <div className="carousel" style={{maxWidth: this.props.width}}>
        {this.state.elements}
        <a className="carousel__prev" onClick={this.prev}>&#10094;</a>
        <a className="carousel__next" onClick={this.next}>&#10095;</a>
        <div className="carousel__caption">
            {this.index+1}/{this.length}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
    slides: PropTypes.array,
    width: PropTypes.string
};

export default Carousel;
