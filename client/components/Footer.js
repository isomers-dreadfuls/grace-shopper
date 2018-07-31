import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="footer-left">
        <h5>Shop</h5>
        <Link to="/products" className="link">
          Sweaters
        </Link>
      </div>
      <div id="footer-middle">
        <h5>Company</h5>
        <Link to="/about" className="link">
          About Us
        </Link>
      </div>
      <div id="footer-right">
        <span id="icons">
          <a href="https://twitter.com/hashtag/uglysweater?src=hash">
            <i className="fab fa-twitter-square fa-lg" />
          </a>
          <a href="https://www.instagram.com/explore/tags/uglysweater/">
            <i className="fab fa-instagram fa-lg" />
          </a>
          <a href="https://www.pinterest.com/search/pins/?q=ugly%20sweater&rs=typed&term_meta[]=ugly%7Ctyped&term_meta[]=sweater%7Ctyped">
            <i className="fab fa-pinterest-square fa-lg" />
          </a>
        </span>
      </div>
    </div>
  )
}

export default Footer
