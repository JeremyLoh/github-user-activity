const { Actor } = require("../model/actor")
const { PullRequestEventPayload } = require("../model/pullRequestEventPayload")
const { Repo } = require("../model/repo")

class PullRequestEvent {
  constructor(actor, repo, payload, createdAt) {
    this.actor = new Actor(actor)
    this.repo = new Repo(repo)
    this.payload = new PullRequestEventPayload(payload)
    this.createdAt = createdAt
  }

  toString() {
    return `- ${this.payload.toString()} on repository "${this.repo.name}"`
  }
}

module.exports = { PullRequestEvent }
