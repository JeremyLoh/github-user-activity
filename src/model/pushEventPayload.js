const { EOL } = require("node:os")

class PushEventPayload {
  constructor(payload) {
    this.size = payload["size"]
    this.distinctSize = payload["distinct_size"]
    this.ref = payload["ref"]
    this.commits = payload["commits"].map((commit) => new Commit(commit))
  }

  toString() {
    return this.commits
      .map(
        (commit, index) =>
          `  ${index + 1}) ${commit.author.name} - ${commit.message} ${
            commit.url
          }`
      )
      .join(EOL)
  }
}

class Commit {
  constructor(commit) {
    this.sha = commit["sha"]
    // author is {email, name} object
    this.author = commit["author"]
    this.message = commit["message"]
    this.distinct = commit["distinct"]
    this.url = commit["url"]
  }
}

module.exports = { PushEventPayload }
