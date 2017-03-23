import React from 'react';
import DoublyLinkedList from 'components/atoms/node/dll.js'; // eslint-disable-line import/no-unresolved,import/extensions
import sampleData from 'components/sampleJson.js'; // eslint-disable-line import/no-unresolved,import/extensions

class PlayerPage extends React.Component {

  constructor() {
    super();
    this.state = {
      data: sampleData,
      dll: null,
      currentNode: null,
      prevNode: true,
      nextNode: false,
      shuffleBtn: false,
      togglePlay: 'Play',
      seekValue: 0
    };

    // Initialise Doubly Linked List and set the data.
    const dll = new DoublyLinkedList();
    this.state.data.forEach(data => {
      dll.add(data);
    });
    this.state.dll = dll;
    this.state.currentNode = dll.head;

    // Disable the buttons if there is only one audio.
    if (dll.length() <= 1) {
      this.setState(
        { shuffleBtn: true,
          nextNode: true
        });
    }
  }

  // Fucntion to toggle play/ pause button and reset seekbar once audio has ended.
  setToggleBtn = () => {
    this.setState({ togglePlay: 'Play' });
    this.setState({ seekValue: 0 });
  }

  // Function to play/ pause audio.
  togglePlay = () => {
    const audioElement = document.getElementById('audio-player');
    if (audioElement.paused) {
      audioElement.play();
      this.setState({ togglePlay: 'Pause' });
    } else {
      audioElement.pause();
      this.setState({ togglePlay: 'Play' });
    }
  }

  // Function to play previous audio.
  playPrev = () => {
    this.setState({ currentNode: this.state.currentNode.prevNode });
    if (!this.state.currentNode.prevNode.prevNode) {
      this.setState({ prevNode: true });
    }
    if (this.state.currentNode.nextNode) {
      this.setState({ nextNode: false });
    }
    this.reloadAudio();
  }

  // Function to play next audio.
  playNext = () => {
    this.setState({ currentNode: this.state.currentNode.nextNode });
    if (!this.state.currentNode.nextNode.nextNode) {
      this.setState({ nextNode: true });
    }
    this.setState({ prevNode: false });
    this.reloadAudio();
  }

  // Function to shuffle audio and play.
  shuffle = () => {
    const length = this.state.dll.length();
    const currentNode = this.state.currentNode;
    const dll = this.state.dll;
    let newNode = currentNode;
    while (currentNode === newNode) {
      const number = Math.floor((Math.random() * length) + 1);
      newNode = dll.getNodeAt(number);
    }
    this.setState({ currentNode: newNode });
    if (newNode.nextNode) {
      this.setState({ nextNode: false });
    } else {
      this.setState({ nextNode: true });
    }
    if (newNode.prevNode) {
      this.setState({ prevNode: false });
    } else {
      this.setState({ prevNode: true });
    }
    this.reloadAudio();
  }

  // Function reflects seek bar to reflect current time for the audio.
  updateSeek = () => {
    // Calculate the new time
    const audioElement = document.getElementById('audio-player');
    const seekElement = document.getElementById('seek-bar');
    const time = audioElement.duration * (seekElement.value / 100);
    // Update the audio time
    audioElement.currentTime = time;
  }


  seekTimeUpdate = () => {
    const audioElement = document.getElementById('audio-player');
    const value = (100 / audioElement.duration) * audioElement.currentTime;

    // Update the slider value
    this.setState({ seekValue: value });
  }

  // Function to play audio according to change in seek.
  seekAudio = (e) => {
    const seekElement = document.getElementById('seek-bar');
    const audioElement = document.getElementById('audio-player');

    const clickPosition = (e.pageX - seekElement.offsetLeft) / seekElement.offsetWidth;
    const clickTime = clickPosition * audioElement.duration;

    // move the playhead to the correct position
    audioElement.currentTime = clickTime;
  }

  // Function to reload Audio element.
  reloadAudio = () => {
    this.setState({ seekValue: 0 });
    const audioElement = document.getElementById('audio-player');
    this.setState({ togglePlay: 'Pause' });
    audioElement.load();
    audioElement.play();
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.currentNode.data.title}</h1>
          <img alt="audio" src={this.state.currentNode.data.image} />
        </div>
        <div>
          <button type="button" disabled={this.state.prevNode} onClick={this.playPrev}>Prev</button>
          <button type="button" onClick={this.togglePlay}>{this.state.togglePlay}</button>
          <audio id="audio-player" onTimeUpdate={this.seekTimeUpdate} onEnded={this.setToggleBtn}>
            <source src={this.state.currentNode.data.audio_url} type={this.state.currentNode.data.type} />
          </audio>
          <input type="range" id="seek-bar" value={this.state.seekValue} onChange={this.updateSeek} onClick={this.seekAudio} />
          <button type="button" disabled={this.state.nextNode} onClick={this.playNext}>Next</button>
          <button type="shuffle" disabled={this.state.shuffleBtn} onClick={this.shuffle}>Shuffle</button>
        </div>
      </div>
    );
  }
}

export default PlayerPage;
