import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles/celebrity.scss';

class Celebrity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            celebrity: [],
            films: [],
            tv: [],
            noCeleb: false
        }
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
      axios.get(`/api/celebrities?link=${this.props.match.params.link}`, {cancelToken: this.signal.token})
      .then(res => {
          if(res.data[0]) {
            this.setState({celebrity: res.data[0], films: res.data[0].films, tv: res.data[0].tv, loading: false, noCeleb: false})
          }
          else {
              this.setState({noCeleb: true, loading: false})
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
            <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/celebrities">Celebrities</a></li>
            <li className="breadcrumb__elem">{this.props.match.params.link}</li>
        </ul> 
        {this.state.celebrity !== {} && !this.state.noCeleb &&
        <>
        <div className="star">
            <img className="star__img" src={this.state.celebrity.img} alt={this.state.celebrity.name} />
            <div className="star__bio">
                <h2>{this.state.celebrity.name}</h2>
                <p>{this.state.celebrity.bio}</p>
            </div>
        </div>
        <table className="films">
            <caption className="films__caption">
                Filmography
            </caption>
            <thead className="films__head">
                <tr className="films__row">
                    <th className="films__cell">Title</th>
                    <th className="films__cell">Credit</th>
                    <th className="films__cell">Year</th>
                </tr>
            </thead>
            <tbody className="films__body">
                {this.state.films.map((elem, i) =>
                <tr key={i} className="films__row">
                    <td className="films__cell">{elem.title}</td>
                    <td className="films__cell">{elem.credit}</td>
                    <td className="films__cell">{elem.year}</td>
                </tr>
                )}
            </tbody>
        </table>
        <table className="films">
            <caption className="films__caption">
                TV
            </caption>
            <thead className="films__head">
                <tr className="films__row">
                    <th className="films__cell">Title</th>
                    <th className="films__cell">Credit</th>
                    <th className="films__cell">Year</th>
                </tr>
            </thead>
            <tbody className="films__body">
                {this.state.tv.map((elem, i) =>
                <tr key={i} className="films__row">
                    <td className="films__cell">{elem.title}</td>
                    <td className="films__cell">{elem.credit}</td>
                    <td className="films__cell">{elem.year}</td>
                </tr>
                )}
            </tbody>
        </table>
        </>}
        {this.state.noCeleb && <p>No such celebrity</p>}
        {this.state.loading && <div className="loader"></div>}
      </main>
    );
  }
}

Celebrity.propTypes = {
    match: PropTypes.object
  };

export default Celebrity;
