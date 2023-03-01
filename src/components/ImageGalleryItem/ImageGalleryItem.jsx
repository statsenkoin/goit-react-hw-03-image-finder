import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ gallery }) => {
  return gallery.map(({ id, webformatURL, tags }) => (
    <GalleryItem key={id}>
      <GalleryItemImage id={id} src={webformatURL} alt={tags} />
    </GalleryItem>
  ));
};

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
