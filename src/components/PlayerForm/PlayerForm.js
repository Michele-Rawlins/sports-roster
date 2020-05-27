import React from 'react';
import PropTypes from 'prop-types';

import './PlayerForm.scss';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    saveNewPlayer: PropTypes.func.isRequired,
  }

  state = {
    playerName: '',
    playerPosition: '',
    
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

  render() {
    const { teamName, teamLocation } = this.state;

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
          <button className="btn btn-dark" onClick={this.saveTeam}>Save Board</button>
        </form>
      </div>
    );
  }
}

export default TeamForm;
