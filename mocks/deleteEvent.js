function getDeleteEvent(TEST_USERNAME) {
  return {
    id: "41930796533",
    type: "DeleteEvent",
    actor: {
      id: 38811217,
      login: TEST_USERNAME,
      display_login: TEST_USERNAME,
      gravatar_id: "",
      url: `https://api.github.com/users/${TEST_USERNAME}`,
      avatar_url: "https://avatars.githubusercontent.com/u/38811217?",
    },
    repo: {
      id: 855774239,
      name: `${TEST_USERNAME}/task-tracker`,
      url: `https://api.github.com/repos/${TEST_USERNAME}/task-tracker`,
    },
    payload: {
      ref: "delete-task",
      ref_type: "branch",
      pusher_type: "user",
    },
    public: true,
    created_at: "2024-09-14T15:13:51Z",
  }
}

module.exports = { getDeleteEvent }
