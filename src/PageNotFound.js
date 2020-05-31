import React from 'react';

class PageNotFound extends React.Component {
  render() {
    return (
        <main className="content">
            <img src="https://www.michael-krause.eu/images/logos/error404.png" alt="404"/>
            <a href="/">Run from here?</a>
        </main>
    );
  }
}

export default PageNotFound;
