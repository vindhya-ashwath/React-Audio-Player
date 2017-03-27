import React, { PropTypes } from 'react';
import { AudioImage, Heading } from 'components';
import 'style/test.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNode: null,
      prevNode: true,
      nextNode: false,
      shuffleBtn: false,
      shuffleOn: false,
      seekValue: 0,
      audioDuration: 0,
      audioCurrentTime: '00:00',
      currentTime: 0,
      loopOne: false,
      loopAll: false,
      loopCount: null
    };

    this.state.currentNode = props.data.dll.head;

    // Disable the buttons if there is only one audio.
    if (props.data.dll.length() <= 1) {
      this.setState(
        { shuffleBtn: true,
          nextNode: true
        });
    }
  }

  // Fucntion to toggle play/ pause button and reset seekbar once audio has ended.
  setToggleBtn = () => {
    this.setState({ seekValue: 0 });
    const icon = document.getElementsByClassName('fa-pause')[0];
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }

  setShuffle = () => {
    this.setState({ shuffleOn: true });
    this.setState({ nextNode: false });
    this.setState({ prevNode: false });
  }

  setDuration = () => {
    const audioElement = document.getElementById('audio-player');
    const setTime = this.setAudioTime(audioElement.duration);
    this.setState({ audioDuration: setTime });
  }

  setAudioTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }
    if (seconds.toString().length === 1) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  setLoop = () => {
    if (this.state.loopAll) {
      this.setState({ loopAll: false, loopOne: false });
      this.playNext();
    } else if (this.state.loopOne) {
      this.setState({ loopAll: true });
      this.loopAll();
    } else {
      this.setState({ loopOne: true });
      this.loopOne();
    }
  }

  setPrevNext = () => {
    this.setState({ nextNode: false });
    this.setState({ prevNode: false });
  }

  // Function to play/ pause audio.
  togglePlay = () => {
    const audioElement = document.getElementById('audio-player');
    if (audioElement.paused) {
      const icon = document.getElementsByClassName('fa-play')[0];
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      this.reloadAudio();
    } else {
      const icon = document.getElementsByClassName('fa-pause')[0];
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      audioElement.pause();
    }
  }

  // Function to play previous audio.
  playPrev = () => {
    if (this.state.loopOne) {
      this.loopOne();
    } else if (this.state.shuffleOn) {
      this.shuffle();
    } else if (this.state.loopAll) {
      if (!this.state.currentNode.prevNode) {
        this.setState({ currentNode: this.props.data.dll.tail });
        this.reloadAudio();
      } else {
        this.setState({ currentNode: this.state.currentNode.prevNode });
        this.reloadAudio();
      }
    } else {
      this.setState({ currentNode: this.state.currentNode.prevNode });
      if (!this.state.currentNode.prevNode.prevNode) {
        this.setState({ prevNode: true });
      }
      if (this.state.currentNode.nextNode) {
        this.setState({ nextNode: false });
      }
      this.setState({ seekValue: 0 });
      this.reloadAudio();
    }
  }

  // Function to play next audio.
  playNext = () => {
    if (this.state.loopOne) {
      this.loopOne();
    } else if (this.state.shuffleOn) {
      this.shuffle();
    } else if (this.state.loopAll) {
      if (!this.state.currentNode.nextNode) {
        this.setState({ currentNode: this.props.data.dll.head });
        this.reloadAudio();
      } else {
        this.setState({ currentNode: this.state.currentNode.nextNode });
        this.reloadAudio();
      }
    } else {
      this.setState({ currentNode: this.state.currentNode.nextNode });
      if (!this.state.currentNode.nextNode.nextNode) {
        this.setState({ nextNode: true });
      }
      this.setState({ prevNode: false });
      this.setState({ seekValue: 0 });
      this.reloadAudio();
    }
  }

  // Function to toggle shuffle.
  toggleLoop = (e) => {
    if (!this.state.loopAll && !this.state.loopOne) {
      e.target.classList.add('loop');
      this.setState({ loopAll: true });
      this.setPrevNext();
    } else if (this.state.loopAll) {
      this.setState({ loopOne: true });
      this.setState({ loopAll: false });
      this.setState({ loopCount: 1 });
      this.setPrevNext();
    } else if (this.state.loopOne) {
      e.target.classList.remove('loop');
      this.setState({ loopOne: false });
      this.setState({ loopAll: false });
      this.setState({ loopCount: null });
      this.removeLoop();
    }
  }

  // Function to toggle shuffle.
  toggleShuffle = (e) => {
    if (this.state.shuffleOn) {
      e.target.classList.remove('shuffleOn');
      this.removeShuffle();
    } else {
      e.target.classList.add('shuffleOn');
      this.setShuffle();
    }
  }

  removeShuffle = () => {
    this.setState({ shuffleOn: false });
    if (!this.state.currentNode.nextNode) {
      this.setState({ nextNode: true });
    }
    if (!this.state.currentNode.prevNode) {
      this.setState({ prevNode: true });
    }
  }

  removeLoop = () => {
    if (!this.state.currentNode.nextNode) {
      this.setState({ nextNode: true });
    }
    if (!this.state.currentNode.prevNode) {
      this.setState({ prevNode: true });
    }
  }
  // Function to shuffle audio and play.
  shuffle = () => {
    const length = this.props.data.dll.length();
    const currentNode = this.state.currentNode;
    const dll = this.props.data.dll;
    let newNode = currentNode;
    while (currentNode === newNode) {
      const number = Math.floor((Math.random() * length) + 1);
      newNode = dll.getNodeAt(number);
    }
    this.setState({ currentNode: newNode });
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
    this.setState({ currentTime: value });
    const setTime = this.setAudioTime(audioElement.currentTime);
    this.setState({ audioCurrentTime: setTime });
  }

  // Function to play audio according to change in seek.
  seekAudio = (e) => {
    const seekElement = document.getElementById('seek-bar');
    const audioElement = document.getElementById('audio-player');

    const clickPosition = (e.pageX - seekElement.offsetLeft) / seekElement.offsetWidth;
    const clickTime = clickPosition * audioElement.duration;

    // move the playhead to the correct position
    audioElement.audiocurrentTime = clickTime;
  }

  // Function to reload Audio element.
  reloadAudio = () => {
    this.setState({ seekValue: 0 });
    const audioElement = document.getElementById('audio-player');
    this.setState({ togglePlayIcon: 'fa-pause' });
    this.setDuration();
    audioElement.load();
    audioElement.play();
  }

  loopOne = () => {
    const audioElement = document.getElementById('audio-player');
    audioElement.play();
  }

  loopAll = () => {
    if (this.state.currentNode.nextNode) {
      this.setState({ currentNode: this.state.currentNode.nextNode });
    } else if (!this.state.currentNode.nextNode) {
      this.setState({ currentNode: this.props.data.dll.head });
    }
    this.reloadAudio();
  }

  test = () => {
    if (this.state.loopOne) {
      this.setState({ nextNode: false });
      this.setState({ prevNode: false });
      this.loopOne();
    } else if (this.state.loopAll) {
      this.setState({ nextNode: false });
      this.setState({ prevNode: false });
      this.loopAll();
    } else if (this.state.shuffleOn) {
      this.shuffle();
    } else {
      this.setToggleBtn();
    }
  }

  render() {
    return (
      <div>
        <div>
          <Heading className="audio-title" as={'p'}>{this.state.currentNode.data.title}</Heading>
        </div>
        <i className="fa fa-heart-o heart-icon" />
        <div className="audio-image-container">
          <AudioImage data={this.state.currentNode.data} />
        </div>
        <div className="audio-container">
          <div className="seek-bar">
            <input className="seek-bar-input" type="range" id="seek-bar" value={this.state.seekValue} onChange={this.updateSeek} onClick={this.seekAudio} />
          </div>
          <div className="time">
            <span className="current-time">{this.state.audioCurrentTime}</span>
            <span className="duration">{this.state.audioDuration}</span>
          </div>
          <div className="audio-buttons">
            <button className="player-buttons button-prev" type="button" disabled={this.state.prevNode} onClick={this.playPrev}>
              <i className="fa fa-step-backward" />
            </button>
            <div className="circle">
              <button className="player-buttons play-button" type="button" onClick={this.togglePlay}>
                <i className="fa fa-play" />
              </button>
            </div>
            <audio id="audio-player" onTimeUpdate={this.seekTimeUpdate} onEnded={this.test} onDurationChange={this.setDuration}>
              <source src={this.state.currentNode.data.audio_url} type={this.state.currentNode.data.type} />
            </audio>
            <button className="player-buttons button-next" type="button" disabled={this.state.nextNode} onClick={this.playNext}>
              <i className="fa fa-step-forward" />
            </button>
            <button className="player-buttons control-button-loop" type="button" disabled={this.state.loop} onClick={this.toggleLoop}>
              <i className="fa fa-retweet" /><sub>{this.state.loopCount}</sub>
            </button>
            <button className="player-buttons control-button-shuffle" type="shuffle" disabled={this.state.shuffleBtn} onClick={this.toggleShuffle}>
              <i className="fa fa-random" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  data: PropTypes.object,
};

export default AudioPlayer;
