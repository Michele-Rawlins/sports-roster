import React from 'react';
import PropTypes from 'prop-types';

import './TeamContainer.scss';

import teamData from '../../helpers/data/teamData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';

import Team from '../Team/Team';


class TeamContainer extends React.Component {
  static propTypes = {
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    teams: [],
  }

  getAllTeams = () => {
    teamData.getTeamsbyUid(authData.getUid())
      .then((teams) => this.setState({ teams }))
      .catch((err) => console.error('unable to get all teams:', err));
  }

  componentDidMount() {
    this.getAllTeams();
  }

  removeTeam = (teamId) => {
    smash.completelyRemoveTeam((teamId))
      .then(() => this.getAllTeams())
      .catch((err) => console.error('unable to remove team', err));
  }

  render() {
    const { teams } = this.state;
    const { setSingleTeam } = this.props;

    const makeTeams = teams.map((team) => <Team key={team.id} team={team} setSingleTeam={setSingleTeam} removeTeam={this.removeTeam}/>);

    return (
    <div className="TeamContainer">
      <h2>Teams</h2>
      <div className="d-flex flex-wrap">
        {makeTeams}
      </div>
    </div>
    );
  }
}

export default TeamContainer;
