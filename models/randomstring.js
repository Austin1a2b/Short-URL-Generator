const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const wordArry = string.split('')

function randomWord(array) {
  const randomNumber = Math.floor(array.length * Math.random())
  return array[randomNumber]
}

function randomString(Number) {
  let output = ''
  for (let i = 1; i <= Number; i++) {
    output += randomWord(wordArry)
  }
  return output
}

module.exports = randomString