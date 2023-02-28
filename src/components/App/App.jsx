import React, { Component } from 'react';

import { Layout } from './App.styled';
import { Searchbar } from 'components';

class App extends Component {
  state = {
    input: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  onSearchInput = userInput => {
    this.setState({ input: userInput });
  };

  render() {
    return (
      <Layout>
        <Searchbar onSearchInput={this.onSearchInput}></Searchbar>
      </Layout>
    );
  }
}

export { App };
