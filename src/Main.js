import React from 'react';
import Carousel from './Carousel';
import CelebList from './CelebList';
import './styles/home.scss';

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
          <div className="responsive">
            <div className="responsive__video">
              <iframe className="responsive__frame" src="https://www.youtube.com/embed/EBpYQVrFBxs?autoplay=1"></iframe> 
            </div>
          </div>
          <p>The Boys season 2 release date seems pretty close, based on recent teases by Eric Kripke. The Boys&apos; first season was the best TV version of a superhero show to date, retaining the extreme violence from the comics by Garth Ennis, but being a surprisingly heartfelt show at the same time. The Boys release date is likely to be this summer, with post-production work being completed remotely right now.</p>
          <p>The Boys season 2 was confirmed before the show even debuted on Amazon Prime, an enormous show of faith. It&apos;s easily one of the best Amazon Prime shows released so far. In season 2, expect to meet brand new capes, as showrunner Eric Kripke and company dig deeper into the source material for additional stories and characters, like Stormfront, a new member of The Seven coming next year. </p>
          <p>The Boys season 2 finished filming a while ago, so all you&apos;ve got to do now is wait. Here&apos;s everything we know about the release date, cast, trailer and more.</p>
          <p>What is confirmed is that the &quot;terrifying&quot; Black Noir is set to play a major role in the second season.  Announced at C2E2 Expo (via ComicBook.com), the mystery of the dark-suited masked vigilante will hang over season 2, and he&apos;ll have no lines of dialogue or action scenes. We&apos;ll never even see his face. &quot;You&apos;re going to love what&apos;s coming up for Black Noir. It&apos;s so good,&quot; Karl Urban enthused at a panel.</p>
          <h3>The Boys season 2 release date will be announced soon</h3>
          <div className="responsive">
            <img className="responsive__img" src="https://cdn.mos.cms.futurecdn.net/2Qjg7dpLe73utCk4fcW8BX-650-80.jpg.webp" />
          </div>
          <p>The Boys season 2 release date is close, based on a May 2020 update by creator Eric Kripke. &quot;Airdate and other cool shit will be announced SOON!&quot; is how he put it. At the time of writing, VFX and sound still needs finishing on the show. A release date for summer 2020 still seems likely, though you might be looking at late summer.</p>
          <p>We were due to learn more about The Boys season 2 during the PaleyFest TV festival in March 2020, but the event was cancelled over the global pandemic. It&apos;s possible that this is when Amazon planned on revealing a tentative release date. </p>
          <p>A release date of mid-2020 still fits, though, as actor Karl Urban confirmed on Instagram that he wrapped filming on the show back in November 2019.</p>
          <h3>The Boys season 2 trailer: first look at the show here</h3>
          <div className="responsive">
            <img className="responsive__img" src="https://cdn.mos.cms.futurecdn.net/GPULEb93Kyr6C34JoctAUC-650-80.jpg.webp" />
          </div>
          <p>The Boys season 2 trailer doesn&apos;t reveal much about the plot, but it - predictably - has plenty of violence, and snapshots of the show&apos;s characters. That was released in December 2019, and remains our only look at season 2 to date. </p>
          <p>It appears that The Boys season 2 will pick up right where the first left off, with the evil Superman stand-in Homelander (the magnificent Antony Starr) revealing a super-powered son, and Hughie (Jack Quaid) saving the life of speedster A-Train (Jessie T. Usher), despite running through his girlfriend at the start of the show. Ouch.</p>
          <p>We also caught a shot of Terror, Billy Butcher&apos;s dog from the comics which, given his special, err, talent, is one of the most exciting additions to the cast going in to season 2. </p>
          <div className="cast">
              <h2 className="cast__text">Cast</h2>
              <div className="line"></div>
          </div>
          <CelebList limit={"4"} />
          <a className="more" href={`/celebrities`}>show more <i className="fa fa-caret-down"></i></a>
        </div>
      </main>
    );
  }
}

export default Main;
