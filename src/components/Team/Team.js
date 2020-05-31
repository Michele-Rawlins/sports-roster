import React from 'react';
import PropTypes from 'prop-types';
import './Team.scss';
import teamShape from '../../helpers/propz/teamShape';

class Team extends React.Component {
  static propTypes = {
    team: teamShape.teamShape,
    setSingleTeam: PropTypes.func.isRequired,
    removeTeam: PropTypes.func.isRequired,
    editATeam: PropTypes.func.isRequired,
  }

  openSingleTeamEvent = (e) => {
    e.preventDefault();
    const { team, setSingleTeam } = this.props;
    setSingleTeam(team.id);
  }

  deleteTeamEvent = (e) => {
    e.preventDefault();
    const { team, removeTeam } = this.props;
    removeTeam(team.id);
  }

  editTeamEvent = (e) => {
    e.preventDefault();
    const { editATeam, team } = this.props;
    editATeam(team);
  }

  render() {
    const { team } = this.props;

    return (
      <div className="Team col-4">
        <div className="card-team">
          <div className="card-body">
          <button className="btn btn-danger" onClick={this.deleteTeamEvent}><i className="fas fa-dumpster"></i></button>
          <button className="btn btn-warning" onClick={this.editTeamEvent}><i className="fas fa-edit"></i></button>
            <h5 className="card-title"> {team.name}</h5>
            <p className="card-location">{team.location}</p>
            <button className="btn btn-dark" onClick={this.openSingleTeamEvent}>View Players</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
