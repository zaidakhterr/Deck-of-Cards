import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

import './Deck.scss';

export class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: '',
      drawn: [],
      remaining: 52,
    };

    this.getCard = this.getCard.bind(this);
  }

  componentDidMount() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    axios.get(url).then(response => {
      this.setState(() => ({ deckId: response.data.deck_id }));
    });
  }

  getCard() {
    const url = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`;
    axios.get(url).then(response => {
      this.setState(st => ({
        drawn: [...st.drawn, response.data.cards[0]],
        remaining: response.data.remaining,
      }));
    });
  }

  render() {
    return (
      <div className='Deck'>
        <h1 className='Deck-header'>
          <span>♦</span> Deck of Cards <span>♦</span>
        </h1>
        {this.state.remaining > 0 ? (
          <div className='Deck-content'>
            <p>
              Cards Remaining : <span>{this.state.remaining}</span>
            </p>
            <button className='Deck-button' onClick={this.getCard}>
              Draw Card
            </button>
          </div>
        ) : (
          <div className='Deck-content red'>
            <p>You're out of cards. Refresh the page to load a new deck</p>
          </div>
        )}
        <div className='Deck-cards'>
          {this.state.drawn.map(card => (
            <Card key={card.code} card={card} />
          ))}
        </div>
      </div>
    );
  }
}

export default Deck;
