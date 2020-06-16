import teamData from './teamData';
import playerData from './playerData';

const completelyRemoveTeam = (teamId) => new Promise((resolve, reject) => {
  console.error('completely remove team running', teamId);
  teamData.deleteTeam(teamId)
    .then(() => {
      playerData.getPlayersByTeamId(teamId)
        .then((players) => {
          players.forEach((player) => playerData.deletePlayer(player.id));
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveTeam };
