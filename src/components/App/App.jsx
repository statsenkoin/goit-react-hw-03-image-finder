import React, { Component } from 'react';

import { Searchbar } from 'components';

class App extends Component {
  state = {
    input: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div>
        <Searchbar></Searchbar>
      </div>
    );
  }
}

export { App };
