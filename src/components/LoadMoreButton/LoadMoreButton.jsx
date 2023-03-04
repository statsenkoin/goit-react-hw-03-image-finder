import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LoadButton } from './LoadMoreButton.styled';

export class LoadMoreButton extends Component {
  handleLoadMoreButton = () => {
    this.props.onClick();
  };
  render() {
    return (
      <LoadButton type="button" onClick={this.handleLoadMoreButton}>
        Load more
      </LoadButton>
    );
  }
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
