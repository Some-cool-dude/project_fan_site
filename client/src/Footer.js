import React from 'react';
import './styles/footer.scss'

class Footer extends React.Component {
  render() {
    return (
        <footer className="footer">
        <div className="footer-menu">
            <p className="footer-menu__text">© 2000-2020, ОMG &quot;Holly Molly&quot;. All rights reserved.</p>
            <div className="footer-menu__links">
                <a className="footer-menu__link" href="#">Help</a>
                <a className="footer-menu__link" href="#">Advertising</a>
                <a className="footer-menu__link" href="#">Rules & Conditions</a>
                <a className="footer-menu__link" href="#">Feedback</a>
                <a className="footer-menu__link" href="#">Privacy & Policy</a>
            </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
