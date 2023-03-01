import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components';

import fetchPixabay from 'services/fetchPixabay';

export class ImageGallery extends PureComponent {
  state = {
    page: 1,
    gallery: null,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { userInput } = this.props;
    if (prevProps.userInput !== userInput) {
      const pictureSet = await fetchPixabay(userInput, page);
      pictureSet.length
        ? this.setState({ gallery: pictureSet, error: null })
        : this.setState({ error: 'Not valid search query' });
      // TODO toast
    }
  }

  render() {
    const { gallery } = this.state;

    return (
      gallery && (
        <Gallery>
          <ImageGalleryItem gallery={gallery}></ImageGalleryItem>
        </Gallery>
      )
    );
  }
}

ImageGallery.propTypes = {
  userInput: PropTypes.string.isRequired,
};
