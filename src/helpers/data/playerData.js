import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByTeamId = (teamId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="teamId"&equalTo="${teamId}"`)
    .then((result) => {
      const allPlayersObject = result.data;
      const players = [];
      if (allPlayersObject !== null) {
        Object.keys(allPlayersObject).forEach((playerId) => {
          const newPlayer = allPlayersObject[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => reject(err));
});

const getSinglePlayer = (playerId) => axios.get(`${baseUrl}/players/${playerId}.json`);

const savePlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);
const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

export default {
  getPlayersByTeamId,
  deletePlayer,
  getSinglePlayer,
  savePlayer,
};
