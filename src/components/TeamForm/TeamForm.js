import React from 'react';
import PropTypes from 'prop-types';

import './TeamForm.scss';
import authData from '../../helpers/data/authData';

class TeamForm extends React.Component {
  static propTypes = {
    saveNewTeam: PropTypes.func.isRequired,
    putTeam: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
  }

  state = {
    teamName: '',
    teamLocation: '',
    isEditing: false,
  }

  componentDidMoun() {
    const { team } = this.props;
    if (team.name) {
      this.setState({ teamName: team.name, teamLocation: team.location, idEditing: true });
    }
  }

  saveTeam = (e) => {
    e.preventDefault();
    const { teamLocation, teamName } = this.state;
    const { saveNewTeam } = this.props;
    const newTeam = {
      location: teamLocation,
      name: teamName,
      uid: authData.getUid(),
    };
    saveNewTeam(newTeam);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ teamName: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ teamLocation: e.target.value });
  }

  updateTeam = (e) => {
    e.preventDefault();
    const { team, putTeam } = this.props;
    const { teamLocation, teamName } = this.state;
    const updatedTeam = {
      location: teamLocation,
      name: teamName,
      uid: authData.getUid(),
    };
    putTeam(team.id, updatedTeam);
  }

  render() {
    const { teamName, teamLocation, isEditing } = this.state;

    return (
      <div className="TeamForm">
        <form className="col-6 offset-3">
          <div className="formgroup">
            <label htmlFor="team-name">Team Name</label>
            <input
            type="text"
            className="form-control"
            id="team-name"
            placeholder="Tiddlywinks"
            value={teamName}
            onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="team-location">Description</label>
            <input
              type="text"
              className="form-control"
              id="team-location"
              placeholder="location location"
              value={teamLocation}
              onChange={this.locationChange}
            />
          </div>
          {
          isEditing
            ? <button className="btn btn-dark" onClick={this.updateTeam}>Update Team</button>
            : <button className="btn btn-dark" onClick={this.saveTeam}>Save Team</button>
          }
          </form>
      </div>
    );
  }
}

export default TeamForm;
