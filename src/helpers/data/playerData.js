import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByTeamId = (teamId) => new Promise((resolve, reject) => {
  axios.get(`{baseUrl}/players.json?orderBy=`)
}
