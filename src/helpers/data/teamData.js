import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTeamsbyUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allTeamsObject = result.data;
      const teams = [];
      if (allTeamsObject !== null) {
        Object.keys(allTeamsObject).forEach((teamId) => {
          const newTeam = allTeamsObject[teamId];
          newTeam.id = teamId;
          teams.push(newTeam);
        });
      }
      resolve(teams);
    })
    .catch((err) => reject(err));
});

const getSingleTeam = (teamId) => axios.get(`${baseUrl}/teams/${teamId}.json`);

const saveTeam = (newTeam) => axios.post(`${baseUrl}/teams.json`, newTeam);

const deleteTeam = (teamId) => axios.delete(`${baseUrl}/teams/${teamId}.json`);

const updateTeam = (teamId, updatedTeam) => axios.put(`${baseUrl}teams/${teamId}.json`, updatedTeam);

export default {
  getTeamsbyUid,
  getSingleTeam,
  deleteTeam,
  saveTeam,
  updateTeam,
};
