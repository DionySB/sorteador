export function sortRoles(playerNames, availableRoles) {
  const shuffledRoles = [...availableRoles].sort(() => Math.random() - 0.5);
  return playerNames.map((name, index) => ({ name, role: shuffledRoles[index] || 'Sem cargo' }));
}