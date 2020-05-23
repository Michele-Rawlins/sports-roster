import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';
import teamData from '../../helpers/data/teamData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    team: {},
    players: [],
  }

getInfo = () => {
  const { teamId } = this.props;
  teamData.getSingleTeam(teamId)
    .then((request) => {
      const team = request.data;
      this.setState({ team });
      playerData.getPlayersByTeamId(teamId)
        .then((players) => this.setState({ players }));
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

render() {
  const { setSingleTeam } = this.props;
  const { team, players } = this.state;

  const makePlayers = players.map((p) => <Player key={p.id} player={p} removePlayer={this.removePlayer}/>);

  return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        <h2>{team.name} Team</h2>
        <h3>{team.location}</h3>
        <div className="d-flex flew-wrap">
        {makePlayers}
      </div>
      </div>
  );
}
}
export default SingleTeam;
