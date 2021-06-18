export const tileNumbergenerator = (value, setTilesList) => {
  const tempTilesList = [];
  while (tempTilesList.length < 9) {
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    if (value === randomNumber || tempTilesList.includes(randomNumber))
      continue;
    tempTilesList.push({ id: tempTilesList.length, value: randomNumber });
  }
  const randomIndex = Math.floor(Math.random() * 9);
  tempTilesList[randomIndex].value = value;
  setTilesList(tempTilesList);
};
