import React from 'react';
import Carousel from './Carousel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.slides = [
      'https://static0.srcdn.com/wordpress/wp-content/uploads/2018/12/Amazon-Prime-The-Boys-TV-Show.jpg',
      'https://static0.cbrimages.com/wordpress/wp-content/uploads/2018/10/the-boys-seven-header.jpg',
      'https://static0.srcdn.com/wordpress/wp-content/uploads/2019/08/The-Boys-Season-2-Photo-Cast.jpg'
    ]
  }

  render() {
    return (
      <main className="content">
        <Carousel slides={this.slides} width='940px' />
        <h2 className="content__title">The Boys season 2: release date, cast, trailer and everything we know</h2>
        <div className="content__text">
          <p>The Boys season 2 release date seems pretty close, based on recent teases by Eric Kripke. The Boys&apos; first season was the best TV version of a superhero show to date, retaining the extreme violence from the comics by Garth Ennis, but being a surprisingly heartfelt show at the same time. The Boys release date is likely to be this summer, with post-production work being completed remotely right now.</p>
          <p>The Boys season 2 was confirmed before the show even debuted on Amazon Prime, an enormous show of faith. It&apos;s easily one of the best Amazon Prime shows released so far. In season 2, expect to meet brand new capes, as showrunner Eric Kripke and company dig deeper into the source material for additional stories and characters, like Stormfront, a new member of The Seven coming next year. </p>
          <p>The Boys season 2 finished filming a while ago, so all you&apos;ve got to do now is wait. Here&apos;s everything we know about the release date, cast, trailer and more.</p>
          <p>What is confirmed is that the &quot;terrifying&quot; Black Noir is set to play a major role in the second season.  Announced at C2E2 Expo (via ComicBook.com), the mystery of the dark-suited masked vigilante will hang over season 2, and he&apos;ll have no lines of dialogue or action scenes. We&apos;ll never even see his face. &quot;You&apos;re going to love what&apos;s coming up for Black Noir. It&apos;s so good,&quot; Karl Urban enthused at a panel.</p>

        </div>
      </main>
    );
  }
}

export default Main;
