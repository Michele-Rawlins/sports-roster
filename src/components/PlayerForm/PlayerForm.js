import React from 'react';
import PropTypes from 'prop-types';

import './PlayerForm.scss';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    saveNewPlayer: PropTypes.func.isRequired,
    putPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  state = {
    playerName: '',
    playerPosition: '',
    playerImageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { player } = this.props;
    if (player.name) {
      this.setState({
        playerName: player.name,
        playerImageUrl: player.imageUrl,
        playerPosition: player.position,
        isEditing: true,
      });
    }
  }

  savePlayer = (e) => {
    e.preventDefault();
    const { playerPosition, playerName, playerImageUrl } = this.state;
    const { saveNewPlayer, teamId } = this.props;
    const newPlayer = {
      teamId,
      position: playerPosition,
      name: playerName,
      imageUrl: playerImageUrl,
      uid: authData.getUid(),
    };
    saveNewPlayer(newPlayer);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  positionChange = (e) => {
    e.preventDefault();
    this.setState({ playerPosition: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ playerImageUrl: e.target.value });
  }

  updatePlayer = (e) => {
    e.preventDefault();
    const { playerImageUrl, playerName, playerPosition } = this.state;
    const { teamId, putPlayer, player } = this.props;
    const updatedPlayer = {
      teamId,
      imageUrl: playerImageUrl,
      name: playerName,
      position: playerPosition,
      uid: authData.getUid(),
    };
    putPlayer(player.id, updatedPlayer);
  }

  render() {
    const {
      playerName, playerPosition, playerImageUrl, isEditing,
    } = this.state;

    return (
      <div className="PlayerForm">
        <form className="col-6 offset-3">
          <div className="formgroup">
            <label htmlFor="player-name">Player Name</label>
            <input
            type="text"
            className="form-control"
            id="player-name"
            placeholder="IvyMeadows"
            value={playerName}
            onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="player-position">Player's Position</label>
            <input
              type="text"
              className="form-control"
              id="player-position"
              placeholder="Dragon Tamer"
              value={playerPosition}
              onChange={this.positionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="player-imageUrl">Player's Image</label>
            <input
              type="text"
              className="form-control"
              id="player-imageUrl"
              placeholder="photo here"
              value={playerImageUrl}
              onChange={this.imageUrlChange}
            />
          </div>
          {
            isEditing
              ? <button className="btn btn-dark" onClick={this.updatePlayer}>Update Player</button>
              : <button className="btn btn-dark" onClick={this.savePlayer}>Save Player</button>
          }
        </form>
      </div>
    );
  }
}

export default PlayerForm;
