import React from 'react';
import './Player.scss';

class Player extends React.Component {
  render() {
    const { player } = this.props;
    return (
    <div className="Player col-3">
      <div className="card">
        <img className="card-img-top" src={player.imageUrl} alt="player" />
        <div className="card-body">
          <h3 className="card-name">{player.name}</h3>
          <p className="card-position">{player.position}</p>
          </div>
      </div>
    </div>
    );
  }
}

export default Player;
