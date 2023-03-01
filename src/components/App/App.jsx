import React, { Component } from 'react';
import { Layout } from './App.styled';
import { Searchbar, ImageGallery } from 'components';

class App extends Component {
  state = {
    userInput: '',
    loading: false,
  };

  async componentDidMount() {
    // this.setState({ loading: true });
    // const pictureSet = await fetchPixabay(
    //   this.state.userInput,
    //   this.state.page
    // );
    // console.log('pictureSet :>> ', pictureSet);
    // this.setState({ gallery: pictureSet });
    // this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {}

  handleSearchInput = userInput => {
    this.setState({ userInput });
  };

  render() {
    const { userInput, loading } = this.state;
    return (
      <Layout>
        <Searchbar handleSearchInput={this.handleSearchInput}></Searchbar>
        {loading && <p>Loading...</p>}
        <ImageGallery userInput={userInput}></ImageGallery>
      </Layout>
    );
  }
}

export { App };
