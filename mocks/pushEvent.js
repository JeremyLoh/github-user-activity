function getPushEvent(TEST_USERNAME, TEST_EMAIL) {
  return {
    id: "41940603994",
    type: "PushEvent",
    actor: {
      id: 38811217,
      login: TEST_USERNAME,
      display_login: TEST_USERNAME,
      gravatar_id: "",
      url: `https://api.github.com/users/${TEST_USERNAME}`,
      avatar_url: "https://avatars.githubusercontent.com/u/38811217?",
    },
    repo: {
      id: 857711517,
      name: `${TEST_USERNAME}/github-user-activity`,
      url: `https://api.github.com/repos/${TEST_USERNAME}/github-user-activity`,
    },
    payload: {
      repository_id: 857711517,
      push_id: 20244556050,
      size: 2,
      distinct_size: 2,
      ref: "refs/heads/main",
      head: "48600248174fef85440178d2c6535c1f500a375b",
      before: "446471a3887ff00a8476c4ebd004a8a600573968",
      commits: [
        {
          sha: "71d75bb15a859b24f55a81fcc97ce48ff56b0128",
          author: {
            email: TEST_EMAIL,
            name: TEST_USERNAME,
          },
          message: "chore: add vitest package for testing",
          distinct: true,
          url: `https://api.github.com/repos/${TEST_USERNAME}/github-user-activity/commits/71d75bb15a859b24f55a81fcc97ce48ff56b0128`,
        },
        {
          sha: "48600248174fef85440178d2c6535c1f500a375b",
          author: {
            email: TEST_EMAIL,
            name: TEST_USERNAME,
          },
          message: "chore: update README.md for project info",
          distinct: true,
          url: `https://api.github.com/repos/${TEST_USERNAME}/github-user-activity/commits/48600248174fef85440178d2c6535c1f500a375b`,
        },
      ],
    },
    public: true,
    created_at: "2024-09-15T12:14:05Z",
  }
}

module.exports = { getPushEvent }
