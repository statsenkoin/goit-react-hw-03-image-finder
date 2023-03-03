import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Gallery, LoadMoreButton } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components';

import fetchPixabay from 'services/fetchPixabay';
import { pixabayConstants } from 'constants';

const { PER_PAGE } = pixabayConstants;

export class ImageGallery extends Component {
  state = {
    page: 1,
    pages: 1,
    gallery: null,
    error: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, gallery } = this.state;
    const { input } = this.props;
    const { input: prevInput } = prevProps;
    const { page: prevPage } = prevState;

    if (prevInput !== input) {
      this.setState({ page: 1 });
    }

    if (prevInput !== input || prevPage !== page) {
      try {
        this.setState({ loading: true });

        // data = {total: 1159760, totalHits: 500, hits: Array(12)}
        const data = await fetchPixabay(input, page);
        const { hits, total } = data;

        if (!hits.length) {
          this.setState({ error: 'Not valid search query' });
          // TODO toast
          return;
        }
        const pages = this.calculateTotalPages(total);

        this.setState({
          pages,
          gallery:
            gallery !== null && page > 1 ? [...gallery, ...hits] : [...hits],
          error: null,
        });
      } catch (error) {
        console.log('error :>> ', error);
        this.setState({ error: 'Something went wrong. Try again later.' });
        // TODO toast
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  calculateTotalPages = total => {
    return Math.ceil(total / PER_PAGE);
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));

    //   const newPage = this.state.page + 1;
    //   this.setState({ page: newPage });
  };

  render() {
    const { gallery, page, pages, loading } = this.state;
    return (
      <>
        {gallery && (
          <>
            <Gallery>
              <ImageGalleryItem gallery={gallery}></ImageGalleryItem>
            </Gallery>
            {loading && <p>Loading...</p>}
            {page < pages && (
              <LoadMoreButton type="button" onClick={this.onLoadMoreClick}>
                Load more...
              </LoadMoreButton>
            )}
          </>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
