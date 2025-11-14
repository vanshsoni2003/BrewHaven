import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Chase the new flavour" />
      <h1 className="app__header-h1">The Key To Fine Dining</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>
        Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet tellus
      </p>
      {/* Wrap the buttons with Link and set them to navigate to the respective routes */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/menu">
          <button type="button" className="custom__button">Explore Menu</button>
        </Link>
        <Link to="/book-table">
          <button type="button" className="custom__button">Booking</button>
        </Link>
        <Link to="/my-table">
          <button type="button" className="custom__button">My Table</button>
        </Link>
      </div>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;
