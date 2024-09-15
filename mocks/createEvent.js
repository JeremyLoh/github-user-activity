function getCreateEvent(TEST_USERNAME) {
  return {
    id: "41940530845",
    type: "CreateEvent",
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
      ref: null,
      ref_type: "repository",
      master_branch: "main",
      description: "Fetch Github user activity and display it in terminal",
      pusher_type: "user",
    },
    public: true,
    created_at: "2024-09-15T12:06:51Z",
  }
}

module.exports = { getCreateEvent }
