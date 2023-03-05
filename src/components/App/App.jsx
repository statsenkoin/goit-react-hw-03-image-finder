import React, { Component } from 'react';
import { Layout } from './App.styled';
import { Searchbar, ImageGallery, Tostify } from 'components';

import { Modal } from 'components';

class App extends Component {
  state = {
    input: '',
    selectedImageUrl: null,
    selectedImageTags: null,
    isModalShown: false,
  };

  handleSearchInput = userInput => {
    const { input } = this.state;
    if (input !== userInput) this.setState({ input: userInput });
  };

  selectModalImage = (link, tags) => {
    this.setState({ selectedImageUrl: link, selectedImageTags: tags });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({
      isModalShown: !isModalShown,
    }));
  };

  render() {
    const { input, selectedImageUrl, selectedImageTags, isModalShown } =
      this.state;
    return (
      <Layout>
        <Searchbar handleSearchInput={this.handleSearchInput}></Searchbar>
        <ImageGallery
          input={input}
          onSelectModalImage={this.selectModalImage}
        ></ImageGallery>
        <Tostify />

        {isModalShown && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImageUrl} alt={selectedImageTags} />
          </Modal>
        )}
      </Layout>
    );
  }
}

export { App };
