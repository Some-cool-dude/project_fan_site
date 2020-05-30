import React from 'react';
import CelebList from './CelebList'

class Celebrities extends React.Component {
  render() {
    return (
      <main className="content">
        <ul className="breadcrumb">
            <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/">Home</a></li>
            <li className="breadcrumb__elem">Celebrities</li>
        </ul> 
        <CelebList limit={""} />
      </main>
    );
  }
}

export default Celebrities;
