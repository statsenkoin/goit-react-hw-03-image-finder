import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchPixabay from 'services/fetchPixabay';
import { pixabayConstants } from 'constants';
import { Gallery } from './ImageGallery.styled';
import {
  ImageGalleryItem,
  LoadMoreButton,
  Loader,
  WarningPage,
} from 'components';
// import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    page: 1,
    gallery: [],
    error: null,
    isLastPage: true,
    isLoading: false,
    isEmpty: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, gallery } = this.state;
    const { input } = this.props;
    const { input: prevInput } = prevProps;
    const { page: prevPage, gallery: prevGallery } = prevState;

    if (prevInput !== input) this.resetState();

    if (prevInput !== input || prevPage !== page) this.getImageSet();

    if (gallery !== prevGallery && page > 1)
      window.scrollBy(0, window.innerHeight / 2);
  }

  resetState = () => {
    this.setState({
      page: 1,
      gallery: [],
      isLastPage: true,
      isLoading: false,
    });
  };

  getImageSet = async () => {
    const { page } = this.state;
    const { input } = this.props;

    this.setState({ isLoading: true });
    try {
      // data = {total: 1159760, totalHits: 500, hits: Array(12)}
      const { hits, total } = await fetchPixabay(input, page);

      if (hits.length === 0) {
        // return toast.error('Not valid search query. Try another request.');
        return this.setState({ isEmpty: true });
      }

      const pages = this.calculateTotalPages(total);
      this.setState(prev => ({
        gallery: [...prev.gallery, ...hits],
        isLastPage: page < pages ? false : true,
        error: null,
        isEmpty: false,
      }));
    } catch (error) {
      console.log('error :>> ', error);
      this.setState({ error: error.message });
      // toast.error('Something went wrong. Try again later.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  calculateTotalPages = total => {
    const { PER_PAGE } = pixabayConstants;
    return Math.ceil(total / PER_PAGE);
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { gallery, isLoading, isLastPage, isEmpty, error } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {gallery && (
          <>
            <Gallery>
              <ImageGalleryItem
                gallery={gallery}
                onSelectModalImage={this.props.onSelectModalImage}
              ></ImageGalleryItem>
            </Gallery>
            {!isLastPage && <LoadMoreButton onClick={this.onLoadMoreClick} />}
          </>
        )}
        {isEmpty && <WarningPage text={'There is nothing to show.'} />}
        {error && (
          <WarningPage text={`Something went wrong.\n Try again later.`} />
          // <WarningPage text={error} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
