// For waiting later
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Transposition through rotors
function transpo(cipherLetter, key, message) {
  // Go for current rotor's value
  let alphaPosition = plugboard.alphabet.indexOf(cipherLetter);
  console.log(`Starting index is ${alphaPosition}`);
  let currentRotorEncryptedValue = rotors[key].alphabet[alphaPosition];
  console.log(
    `The value after the first rotor is ${currentRotorEncryptedValue}`
  );
  // try for second rotor's value
  if (rotors[key - 1] != undefined) {
    currentRotorEncryptedValue = rotors[key - 1].alphabet[alphaPosition];
    console.log(
      `The value after the second rotor is ${currentRotorEncryptedValue}`
    );
  }
  // try for third rotor's value
  if (rotors[key - 2] != undefined) {
    currentRotorEncryptedValue = rotors[key - 2].alphabet[alphaPosition];
    console.log(
      `The value after the third rotor is ${currentRotorEncryptedValue}`
    );
  }
  // Finally, reflector's value
  console.log(`Value before reflector ${currentRotorEncryptedValue}`);
  currentRotorEncryptedValue = reflector[alphaPosition];
  console.log(`Value after reflector ${currentRotorEncryptedValue}`);
  let returnIndex = plugboard.alphabet.indexOf(currentRotorEncryptedValue);
  console.log(reflector);
  // Let's make the return trip
  // try for third rotor's value
  if (rotors[key - 2] != undefined) {
    currentRotorEncryptedValue = rotors[key - 2].alphabet[returnIndex];
    console.log(
      `The value passing back through the third rotor is ${currentRotorEncryptedValue}`
    );
  }
  if (rotors[key - 1] != undefined) {
    currentRotorEncryptedValue = rotors[key - 1].alphabet[returnIndex];
    console.log(
      `The value passing back through the second rotor is ${currentRotorEncryptedValue}`
    );
  }
  currentRotorEncryptedValue = rotors[key].alphabet[returnIndex];
  console.log(
    `The value passing back through the first rotor is ${currentRotorEncryptedValue}`
  );

  // Return the value
  return currentRotorEncryptedValue;
}

// Looping function for rotors
// Need to list of rotors
function loop(rotor, count, key, cipherLetter) {
  // convert from node list to an array
  const rotorArray = Array.from(rotor);
  // Get the encrypted letter via the three rotors and reflector
  let encrypted = transpo(cipherLetter, key);
  // Move the rotor one step forward in the UI AND the rotor array from this file
  rotorArray.map((position, index) => {
    if (index + count >= 26) {
      rotorArray[0].innerText = plugboard.alphabet[25];
      rotorArray[1].innerText = plugboard.alphabet[0];
      rotorArray[2].innerText = plugboard.alphabet[1];
    } else {
      rotorArray[index].innerText = plugboard.alphabet[index + count];
    }
  });

  let lastLetter = rotors[key].alphabet.pop(rotors[key].alphabet.length - 1);
  rotors[key].alphabet.unshift(lastLetter);
  return encrypted;
}

// Set the first rotor's initial positions
function initialRotorSettings(aRotor, i) {
  let positionShift = Math.floor(Math.random() * (25 - 0 + 1));
  // Before
  aRotor[0].innerText = plugboard.alphabet[25];
  // Main index
  aRotor[1].innerText = plugboard.alphabet[0];
  // After
  aRotor[2].innerText = plugboard.alphabet[1];
  rotorCountOne = 0;
  rotorCountTwo = 0;
  rotorCountThree = 0;
}

// Shuffle function
function shuffle(array) {
  let newArray = [...array];
  var currentIndex = newArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

// Plugboard
const plugboard = {
  alphabet: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
};

// Rotors
const rotors = [
  {
    name: `I`,
    // JGDQOXUSCAMIFRVTPNEWKBLZYH
    alphabet: [
      "J",
      "G",
      "D",
      "Q",
      "O",
      "X",
      "U",
      "S",
      "C",
      "A",
      "M",
      "I",
      "F",
      "R",
      "V",
      "T",
      "P",
      "N",
      "E",
      "W",
      "K",
      "B",
      "L",
      "Z",
      "Y",
      "H",
    ],
  },
  {
    name: `II`,
    // NTZPSFBOKMWRCJDIVLAEYUXHGQ
    alphabet: [
      "N",
      "T",
      "Z",
      "P",
      "S",
      "F",
      "B",
      "O",
      "K",
      "M",
      "W",
      "R",
      "C",
      "J",
      "D",
      "I",
      "V",
      "L",
      "A",
      "E",
      "Y",
      "U",
      "X",
      "H",
      "G",
      "Q",
    ],
  },
  {
    name: `III`,
    // JVIUBHTCDYAKEQZPOSGXNRMWFL
    alphabet: [
      "J",
      "V",
      "I",
      "U",
      "B",
      "H",
      "T",
      "C",
      "D",
      "Y",
      "A",
      "K",
      "E",
      "Q",
      "Z",
      "P",
      "O",
      "S",
      "G",
      "X",
      "N",
      "R",
      "M",
      "W",
      "F",
      "L",
    ],
  },
];

const reflector = [
  // EJMZALYXVBWFCRQUONTSPIKHGD
  "E",
  "J",
  "M",
  "Z",
  "A",
  "L",
  "Y",
  "X",
  "V",
  "B",
  "W",
  "F",
  "C",
  "R",
  "Q",
  "U",
  "O",
  "N",
  "T",
  "S",
  "P",
  "I",
  "K",
  "H",
  "G",
  "D",
];
