'use strict';

const fetch = require('cross-fetch');
const API = 'http://leetcode.com/graphql';
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

const getDailyChallenge = async () => {
  const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query : QUERY }),
  };

  return await fetch(API, init).then(res => {
    return res.json();
  }).then(res => {
    return res.data.activeDailyCodingChallengeQuestion;
  }).catch(err => console.log(err));
  
};

module.exports = getDailyChallenge;