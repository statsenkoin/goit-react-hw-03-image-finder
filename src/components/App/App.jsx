import React, { Component } from 'react';

import { Searchbar } from 'components';

class App extends Component {
  state = {
    input: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  onSubmit = newInput => {
    this.setState({ input: newInput });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
      </div>
    );
  }
}

export { App };
