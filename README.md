# Daily LC Discord Bot (Mini project)
## Description:  
A discord bot that post the daily LeetCode challenge in an specific channel.  
To configure use go the desired channel and then use the `/lc_begin` command  
To stop the daily message use `/lc_stop` in any channel

If the `/lc_begin` command is used in any other channel, the current channel then is overwritten with the new channel.

## Issues to be solved
- [x] Use a database to store active channels
- [ ] Create a `/lc_stop` to stop the daily challenge in the channel where command is used.
- [x] Use Kaffeine to keep the bot active most of the day
- [x] Change the folder structure since we are using databases/servers/discordjs 

## Check List
- [x] Use the discord API to post messages in a channel
- [x] Create an event to send a message daily
- [x] Fetch the daily challenge info from the LeetCode API in https://leetcode.com/graphql
- [x] Post the daily challenge with information about its acceptance and difficulty
- [x] Create some sort of commands namely / commands to configure the bot
- [x] The configuration shall allow the administrator to tell the bot where to post the daily challenge
- [x] The configuration shall allow the administrator to disable the daily posts
- [x] Multiple channels configuration
- [x] Multiple servers configuration
  - [ ] Modify the `/lc_show` command to show the channel related just to that server
- [ ] Elevated privilege allowance
  - [ ] Allow just administrators to use commands
- [ ] New commands:
  - [ ] `/lc_current` to pull the active daily challenge
  - [x] `/lc_show` to know in which channel is going on the daily posting
  - [ ] `/lc_random [Level] [Topic]` to pull a random question
- [ ] Create an `index.html` file to show instead of the current server running one.