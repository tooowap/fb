var mineflayer = require('mineflayer');
var dateTime = require('node-datetime');
var vec3 = require('vec3');
var bot = mineflayer.createBot({
    host: "funcraft.net",
    port: 25565,
  username: "trickman1010@gmail.com",
  password: "casper10",
  version: "1.9.4"
});

setTimeout(function() {
killed = mineflayer.createBot({
    host: 'funcraft.net',
    port: 25565,
  username: "dracchus@hotmail.be",
  password: "az12er45",
  version: "1.9.4"
});
}, 2000);
cooldown = 10
firsttime = true;

bot._client.on('title', (packet) => {
	if (packet.action == 0 || packet.action == 1)
	{
		bot.emit('title', packet.text)
	}
})

bot.on('title', function(text) {
	if(text === '{"text":"§7Lancement du jeu !"}') {
		console.log(dateTime.create().format('[Y-m-d H:M:S] ') + "Game started")
	}
	if(text === '{"text":"§bYeah !"}') {
		setTimeout(function() {
			killed.chat("/hub")
		}, 60000)
	}
});

bot.on('message', function(json) {
	jsonMsg = JSON.stringify(json)
	if(jsonMsg.indexOf("+") > -1 && jsonMsg.indexOf(" Points") > -1 && jsonMsg.indexOf("Yeah") > -1)
	{
		bot.chat("/re")
		console.log(dateTime.create().format('[Y-m-d H:M:S] ') + jsonMsg.substring(jsonMsg.indexOf("+"), jsonMsg.indexOf(" Points") + 7))
	}
	if(jsonMsg.indexOf("Vous rejoignez") > -1 && jsonMsg.indexOf("hikabrain") > -1)
	{
		console.log(dateTime.create().format('[Y-m-d H:M:S] ') + "Joined Hikabrain")
	}
});

bot.on('kicked', function(reason, loggedIn) {
	console.log(reason)
});

bot.on('spawn', function() {
		if(firsttime) {
			setTimeout(function(){
				bot.chat("/g leave")
				killed.chat("/g leave")
				bot.chat("/g add " + killed.username)
				console.log(dateTime.create().format('[Y-m-d H:M:S] ') + "Sended group request to " + killed.username)
				killed.chat("/g accept " + bot.username)
				console.log(dateTime.create().format('[Y-m-d H:M:S] ') + "Accepted group request from " + bot.username)
				if(bot.inventory.slots[36] != null)
		{
			if(bot.inventory.slots[36].name === "compass") bot.activateItem()
		}
			}, 2000);
		}
		else {
			if(bot.inventory.slots[36] != null)
		{
			if(bot.inventory.slots[36].name === "compass") bot.activateItem()
		}}
		firsttime = false


});

bot.on('windowOpen', function(window) {
	if(window.title === '{"text":"Jeux"}')
	{
		console.log(dateTime.create().format('[Y-m-d H:M:S] ') + "Opened compass")
		window.on('windowUpdate', function(slot, oldItem, newItem) {
			bot.clickWindow(27, 0, 0)
			bot.clickWindow(10, 0, 0)
		});
	}
});
