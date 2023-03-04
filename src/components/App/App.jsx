import React, { Component } from 'react';
import { Layout } from './App.styled';
import { Searchbar, ImageGallery, Tostify } from 'components';

class App extends Component {
  state = {
    input: '',
  };

  handleSearchInput = userInput => {
    const { input } = this.state;
    if (input !== userInput) this.setState({ input: userInput });
  };

  render() {
    const { input } = this.state;
    return (
      <Layout>
        <Searchbar handleSearchInput={this.handleSearchInput}></Searchbar>
        <ImageGallery input={input}></ImageGallery>
        <Tostify />
      </Layout>
    );
  }
}

export { App };
