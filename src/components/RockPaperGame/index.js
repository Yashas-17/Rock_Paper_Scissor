import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import GameItem from '../GameItem'
import './index.css'

class RockPaperGame extends Component {
  state = {myChoiceId: '', computerChoiceId: '', score: 0, displayGame: true}

  onClickGameitem = id => {
    const {choicesList} = this.props
    const randomNumber = Math.floor(Math.random() * 3)
    const computerChoiceId = choicesList[randomNumber].id

    let scoreChange = 0
    if (id === computerChoiceId) {
      scoreChange = 0
    } else if (
      (id === 'ROCK' && computerChoiceId === 'SCISSORS') ||
      (id === 'SCISSORS' && computerChoiceId === 'PAPER') ||
      (id === 'PAPER' && computerChoiceId === 'ROCK')
    ) {
      scoreChange = 1
    } else {
      scoreChange = -1
    }

    console.log(
      `Player choice: ${id}, Computer choice: ${computerChoiceId}, Score change: ${scoreChange}`,
    )

    this.setState(prevState => ({
      myChoiceId: id,
      computerChoiceId,
      score: prevState.score + scoreChange,
      displayGame: false,
    }))
  }

  playAgain = () => {
    this.setState({myChoiceId: '', computerChoiceId: '', displayGame: true})
  }

  renderSuccessview = () => {
    const {choicesList} = this.props
    const {myChoiceId, computerChoiceId} = this.state
    const myObject = choicesList.find(each => each.id === myChoiceId)
    const computerObject = choicesList.find(
      each => each.id === computerChoiceId,
    )

    let resultMessage = ''
    if (myChoiceId === computerChoiceId) {
      resultMessage = 'IT IS DRAW'
    } else if (
      (myChoiceId === 'ROCK' && computerChoiceId === 'SCISSORS') ||
      (myChoiceId === 'SCISSORS' && computerChoiceId === 'PAPER') ||
      (myChoiceId === 'PAPER' && computerChoiceId === 'ROCK')
    ) {
      resultMessage = 'YOU WON'
    } else {
      resultMessage = 'YOU LOSE'
    }

    return (
      <div className="result-container">
        <div className="result-choice-container">
          <div className="my-choice-container">
            <h1>YOU</h1>
            <img
              src={myObject.imageUrl}
              className="res-my-img"
              alt="your choice"
            />
          </div>
          <div className="computer-choice-container">
            <h1>OPPONENT</h1>
            <img
              src={computerObject.imageUrl}
              className="res-my-img"
              alt="opponent choice"
            />
          </div>
        </div>
        <div>
          <p className="result-message">{resultMessage}</p>
          <button type="button" className="playagain" onClick={this.playAgain}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGame = () => {
    const {choicesList} = this.props
    return (
      <div className="game-container">
        <div className="game-item-main-container">
          {choicesList.map(each => (
            <GameItem
              details={each}
              onClickGameitem={this.onClickGameitem}
              key={each.id}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {displayGame, score} = this.state
    return (
      <div className="bg-container">
        <div className="top-box">
          <div>
            <h1>Rock Paper Scissors</h1>
          </div>
          <div className="score-box">
            <p className="score">Score</p>
            <p className="score-ele">{score}</p>
          </div>
        </div>
        {displayGame ? this.renderGame() : this.renderSuccessview()}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                Rules
              </button>
            }
          >
            {close => (
              <div className="popup-item-container">
                <button
                  type="button"
                  className="close-icon-button"
                  aria-label="close"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-img"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperGame
