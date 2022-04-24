import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles/celebrities.scss';

class CelebList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            celebrities: []
        }
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
      axios.get(`/api/celebrities?_limit=${this.props.limit}`, {cancelToken: this.signal.token})
      .then(res => {
          this.setState({celebrities: res.data, loading: false})
      })
      .catch(err => console.log(err));
    }

    componentWillUnmount() {
      this.signal.cancel('Api is being canceled');
    }

  render() {
    return (
        <>
        <div className="celebrities">
          {this.state.celebrities.map((elem, index) =>
            <div key={index} className="celebrity">
                <a href={`/celebrities/${elem.link}`}>
                    <img className="celebrity__image" src={elem.img} alt={elem.name} />
                </a>
                <a className="celebrity__link" href={`/celebrities/${elem.link}`}>{elem.name}</a>
                <p className="celebrity__text">{elem.role}</p>
            </div>
          )}
        </div>
        {this.state.loading && <div className="loader"></div>}
        </>
    );
  }
}

CelebList.propTypes = {
    limit: PropTypes.string
  };

export default CelebList;
