import React from 'react';
import PropTypes from 'prop-types';

import './TeamContainer.scss';

import teamData from '../../helpers/data/teamData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';

import Team from '../Team/Team';
import TeamForm from '../TeamForm/TeamForm';


class TeamContainer extends React.Component {
  static propTypes = {
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    teams: [],
    formOpen: false,
    editTeam: {},
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

  saveNewTeam = (newTeam) => {
    teamData.saveTeam(newTeam)
      .then(() => {
        this.getAllTeams();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('could not get teams:', err));
  }

  putTeam = (teamId, updateTeam) => {
    teamData.updateTeam(teamId, updateTeam)
      .then(() => {
        this.getAllTeams();
        this.setState({ formOpen: false, editTeam: {} });
      })
      .catch((err) => console.error('unable to update team', err));
  }

  editATeam = (team) => {
    this.setState({ formOpen: true, editTeam: team });
  }

  render() {
    const { teams, formOpen, editTeam } = this.state;
    const { setSingleTeam } = this.props;

    const makeTeams = teams.map((team) => <Team key={team.id} team={team} setSingleTeam={setSingleTeam} removeTeam={this.removeTeam} editATeam={this.editATeam}/>);

    return (
    <div className="TeamContainer">
      <h2>Teams</h2>
      <button className="btn btn-warning" onClick={() => this.setState({ formOpen: true })}><i className="fas fa-plus"></i></button>
      { formOpen ? <TeamForm saveNewTeam={this.saveNewTeam} team={editTeam} putTeam={this.putTeam}/> : ''}
      <div className="d-flex flex-wrap">
        {makeTeams}
      </div>
    </div>
    );
  }
}

export default TeamContainer;
