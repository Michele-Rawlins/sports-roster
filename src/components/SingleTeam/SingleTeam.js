import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';
import teamData from '../../helpers/data/teamData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    team: {},
    editPlayer: {},
    players: [],
    formOpen: false,
  }

getInfo = () => {
  const { teamId } = this.props;
  teamData.getSingleTeam(teamId)
    .then((request) => {
      const team = request.data;
      this.setState({ team });
      playerData.getPlayersByTeamId(teamId)
        .then((players) => this.setState({ players }));
      // const { p } = this.props;
      // playerData.getSinglePlayer(p)
      //   .then((players) => this.setState({ players }));
    })
    .catch((err) => console.error('unable to get single team', err));
}

componentDidMount() {
  this.getInfo();
}

removePlayer = (playerId) => {
  playerData.deletePlayer(playerId)
    .then(() => this.getInfo())
    .catch((err) => console.error('could not remove player', err));
}

saveNewPlayer = (newPlayer) => {
  playerData.savePlayer(newPlayer)
    .then(() => {
      this.getInfo();
      this.setState({ formOpen: false });
    })
    .catch((err) => console.error('unable to save new player:', err));
}

putPlayer = (playerId, updatedPlayer) => {
  playerData.updatePlayer(playerId, updatedPlayer)
    .then(() => {
      this.getInfo();
      this.setState({ formOpen: false, editPlayer: {} });
    })
    .catch((err) => console.error('unable to update player', err));
}

editAPlayer = (player) => {
  this.setState({ editPlayer: player, formOpen: true });
}

render() {
  const { setSingleTeam, teamId } = this.props;
  const {
    team,
    players,
    formOpen,
    editPlayer,
  } = this.state;

  const makePlayers = players.map((p) => <Player key={p.id} player={p} removePlayer={this.removePlayer} editAPlayer={this.editAPlayer}/>);


  return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        <h2>{team.name} Team</h2>
        <h3>{team.location}</h3>
        <button className="btn btn-warning" onClick={() => this.setState({ formOpen: true })}><i className="fas fa-plus"> Player</i></button>
        { formOpen ? <PlayerForm teamId={teamId} saveNewPlayer={this.saveNewPlayer} player={editPlayer} putPlayer={this.putPlayer} /> : ''}
        <div className="d-flex flew-wrap">
        {makePlayers}
      </div>
      </div>
  );
}
}
export default SingleTeam;
