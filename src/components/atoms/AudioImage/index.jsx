import React, { PropTypes } from 'react';

class AudioImage extends React.Component {

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <img className="audio-image" alt="default-audio" src={this.props.data.image} />
    );
  }
}

AudioImage.propTypes = {
  data: PropTypes.object,
};

export default AudioImage;
