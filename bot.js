const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self || !msg.startsWith('!')) { return; } // ignore ses messages et les messages de ceux listés

  
  const commandName = msg.trim(); // Remove whitespace from chat message

  // If the command is known, let's execute it
  if (commandName.search("!cocktail") != -1 || commandName.search("!cocktails") != -1) {
    var listeIngredients = [];
    // const user = target.substring(1)
    
    var ingredients = msg.substr(msg.indexOf(" ") + 1); // retire le premier mot "!cocktail"
    listeIngredients = ingredients.split(' '); // sépare tous les mots espacés dans une liste
    const resultatPreparation = cocktailMaker(listeIngredients);
    
    client.say(target,`@${context.username} Voici ton cocktail : le ${resultatPreparation} 🍹, mets toi bien bg ! 😎`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }

  if (commandName.search("!lefafen") != -1 && "${context.username}" === "lefafen") {
    
    client.say(target,`@${context.username} Mdrrr laisse moi par pitié`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}


function cocktailMaker (listeIngredients) {
  listeIngredients = shuffle(listeIngredients);
  
  // met en majuscule la première lettre de chaque mot de la liste
  for (let i = 0; i < listeIngredients.length; i++) {
    listeIngredients[i] = listeIngredients[i][0].toUpperCase() + listeIngredients[i].substr(1);
  }
  
  return listeIngredients.join('');
};

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // Tant qu'il reste un élément à choisir
  while (0 !== currentIndex) {

    // Choisit un élément du tableau au hasard
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Échange l'élément choisit avec l'élément actuel
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
