import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Container from './components/Container';
import Footer from './components/Footer';
import Banner from './components/Banner';
import images from './images';

class ClickyGame extends Component {
  state = {
    score: 0,
    highScore: 0,
    navMsgColor: '',
    navMessage: 'Click an image to begin!',
    allCharacters: this.shuffleArray(),
    wasClicked: [],
    shake: false
  };

  clickEvent = this.checkClicked.bind(this);

  shuffleArray() {
    const newArr = images.slice();
    const shuffleArr = [];
    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }
    return shuffleArr;
  }

  checkClicked(clickedElem) {
    const prevState = this.state.wasClicked.slice();
    const shuffled = this.shuffleArray();
    let score = this.state.score;
    let highScore = this.state.highScore;

    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === highScore) {
        score++;
        highScore++;

        // if they are not equal, then only increase the score value
      } else {
        score++;
      }

      // adds the clicked item to wasClicked to track that it has been clicked
      prevState.push(clickedElem);
    }

    // resets the current score if the same element was clicked twice
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: 'incorrect',
        navMessage: 'Incorrect guess!',
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if this runs, then the same element has not been clicked twice and the score is increased
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: 'correct',
      navMessage: 'You Guessed Correctly!',
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // removes the green correct indicator on a successful click after .5s to re-render the class on each success
    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
  }

  // renders score to the navbar.
  // passes the randomized state.allCharacters array to Container to create a Character component for each image.
  // passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default ClickyGame
