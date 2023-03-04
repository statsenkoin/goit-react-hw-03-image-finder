import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchPixabay from 'services/fetchPixabay';
import { pixabayConstants } from 'constants';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem, Modal, LoadMoreButton, Loader } from 'components';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    page: 1,
    gallery: null,
    error: null,
    isLastPage: true,
    isLoading: false,
    isModalShown: false,
    choosenImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, gallery } = this.state;
    const { input } = this.props;
    const { input: prevInput } = prevProps;
    const { page: prevPage, gallery: prevGallery } = prevState;

    if (prevInput !== input) {
      this.setState({ page: 1 });
    }

    if (prevInput !== input || prevPage !== page) {
      this.getImageSet();
    }

    if (gallery !== prevGallery && page > 1) window.scrollBy(0, 450);
  }

  getImageSet = async () => {
    const { page, gallery } = this.state;
    const { input } = this.props;

    this.setState({ isLoading: true });
    try {
      // data = {total: 1159760, totalHits: 500, hits: Array(12)}
      const { hits, total } = await fetchPixabay(input, page);

      if (!hits.length) {
        this.setState({ gallery: null });
        toast.error('Not valid search query. Try another request.');
        return;
      }
      const pages = this.calculateTotalPages(total);
      this.setState({
        gallery:
          gallery !== null && page > 1 ? [...gallery, ...hits] : [...hits],
        isLastPage: page < pages ? false : true,
      });
    } catch (error) {
      console.log('error :>> ', error);
      this.setState({ error: error.message, gallery: null });
      toast.error('Something went wrong. Try again later.');
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

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({
      isModalShown: !isModalShown,
    }));
  };

  onLargeImageShow = e => {
    if (e.target.nodeName === 'IMG') {
      const image = this.state.gallery.find(
        item => item.id.toString() === e.target.id
      );
      this.setState({ choosenImage: image });
      this.toggleModal();
    }
  };

  render() {
    const { gallery, isLoading, isModalShown, choosenImage, isLastPage } =
      this.state;
    return (
      <>
        {isLoading && <Loader />}
        {gallery && (
          <>
            <Gallery onClick={this.onLargeImageShow}>
              <ImageGalleryItem gallery={gallery}></ImageGalleryItem>
            </Gallery>
            {!isLastPage && <LoadMoreButton onClick={this.onLoadMoreClick} />}
          </>
        )}
        {isModalShown && (
          <Modal onClose={this.toggleModal}>
            <img src={choosenImage.largeImageURL} alt={choosenImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
