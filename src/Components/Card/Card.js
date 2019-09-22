import React, { Component } from 'react';

import './Card.scss';

export class Card extends Component {
  constructor(props) {
    super(props);

    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 40 - 20;
    const yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    const { card } = this.props;
    return (
      <img
        className='Card'
        src={card.image}
        alt={`${card.value} of ${card.suit}`}
        style={{
          transform: this._transform,
        }}
      />
    );
  }
}

export default Card;
