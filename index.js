
var Botkit = require('botkit')

var controller = Botkit.slackbot({
  debug: true,
  interactive_replies: true, // tells botkit to send button clicks into conversations
  json_file_store: './db_slackbutton_bot/',
  rtm_receive_messages: false, // disable rtm_receive_messages if you enable events api
}).configureSlackApp({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  scopes: ['bot']
});

controller.setupWebserver(process.env.port,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});


controller.on('team_join', function(bot, message) {
  bot.startConversation(message, function(err, convo){
    convo.say("Welcome to the largest community of Bot Devs on the Internet! A few quick points to help you get the most of out our community: \nYou can test your bots on our team, but please first create your own channel, prefixed with `app-` so we can keep everything organized, and limit your testing to there\nPlease do not test bots that DM every member on a team, or DM anyone who did not ask for it. This is not only rude, but gives us Bots a bad reputation :disappointed:")
  })
});
