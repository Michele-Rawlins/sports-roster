import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import './App.scss';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import TeamContainer from '../components/TeamContainer/TeamContainer';
import SingleTeam from '../components/SingleTeam/SingleTeam';


fbConnection();
class App extends React.Component {
state = {
  authed: false,
  singleTeamId: '',
}

componentDidMount() {
  this.removeListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  });
}

componentWillUnmount() {
  this.removeListener();
}

setSingleTeam = (teamId) => {
  this.setState({ singleTeamId: teamId });
}


render() {
  const { authed, singleTeamId } = this.state;

  const loadComponent = () => {
    let componentToLoad = '';
    if (authed && singleTeamId.length === 0) {
      componentToLoad = <TeamContainer setSingleTeam={this.setSingleTeam}/>;
    } else if (authed && singleTeamId.length > 0) {
      componentToLoad = <SingleTeam teamId={singleTeamId} setSingleTeam={this.setSingleTeam}/>;
    } else {
      componentToLoad = <Auth />;
    }
    return componentToLoad;
  };

  return (
      <div className="App">
        <MyNavbar authed={authed}/>
        <h1>Sports Roster</h1>
        {loadComponent()}
      </div>
  );
}
}

export default App;
