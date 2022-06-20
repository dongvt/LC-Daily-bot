"use strict";

const fetch = require("cross-fetch");
const cron = require("node-cron");

const API = "http://leetcode.com/graphql";

const getDailyChallenge = async () => {
  const QUERY = `query questionOfToday {
    activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
            acRate
            difficulty
            freqBar
            frontendQuestionId: questionFrontendId
            isFavor
            paidOnly: isPaidOnly
            status
            title
            titleSlug
            hasVideoSolution
            hasSolution
            topicTags {
                name
                id
                slug
            }
            content
        }
    }
}`;
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  };

  return await fetch(API, init)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.data.activeDailyCodingChallengeQuestion;
    })
    .catch((err) => console.log(err));
};

const writeDailyChallenge = async (channelId, client) => {
  const channel = client.channels.cache.get(channelId);
  //console.log(channel);
  const response = await getDailyChallenge();
  const question = response.question;
  const msg =
    `The today's challenge is:` +
    `\n${question.title} [${question.difficulty}] [${question.acRate.toFixed(
      2
    )}%]` +
    `\nhttps://leetcode.com${response.link}`;
  channel.send(msg);
};

exports.dailyTrigger = (channelId, client) => {
  cron.schedule(
    "30 18 * * *",
    writeDailyChallenge.bind(this, channelId, client),
    {
      scheduled: true,
      timezone: "America/Boise",
    }
  );
};

exports.writeDailyChallenge = writeDailyChallenge;
