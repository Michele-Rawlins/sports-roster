import React from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
static propTypes = {
  player: playerShape.playerShape,
  removePlayer: PropTypes.func.isRequired,
}

deletePlayerEvent = (e) => {
  e.preventDefault();
  
}


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
