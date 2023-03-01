import React, { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    page: 1,
  };
  render() {
    return (
      <ul className="gallery">{/* <!-- Набір <li> із зображеннями --> */}</ul>
    );
  }
}
