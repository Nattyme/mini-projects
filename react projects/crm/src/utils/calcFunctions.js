const getRandomArrayData = (array) => {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

export default getRandomArrayData;