import React from 'react';
import DoublyLinkedList from 'components/atoms/node/dll.js'; // eslint-disable-line import/no-unresolved,import/extensions
import sampleData from 'components/sampleJson.js'; // eslint-disable-line import/no-unresolved,import/extensions
import { AudioPlayer } from 'components';

class AudioPlayerPage extends React.Component {

  constructor() {
    super();
    this.state = {
      data: sampleData,
      dll: null
    };

    // Initialise Doubly Linked List and set the data.
    const dll = new DoublyLinkedList();
    this.state.data.forEach(data => {
      dll.add(data);
    });
    this.state.dll = dll;
  }

  render() {
    return (
      <div className="audio-player-page">
        <h1 className="audio-player-name">Audio Player</h1>
        <div className="audio-player-container">
          <AudioPlayer data={this.state} />
        </div>
      </div>
    );
  }
}

export default AudioPlayerPage;
