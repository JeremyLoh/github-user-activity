const { EOL } = require("node:os")
const { Actor } = require("../model/actor")
const { PushEventPayload } = require("../model/pushEventPayload")
const { Repo } = require("../model/repo")

class PushEvent {
  constructor(actor, repo, payload, createdAt) {
    this.actor = new Actor(actor)
    this.repo = new Repo(repo)
    this.payload = new PushEventPayload(payload)
    this.createdAt = createdAt
  }

  toString() {
    const count = this.payload.size
    return (
      `- Push ${count} commit${count > 1 ? "s" : ""} to repository "${
        this.repo.name
      }"` +
      EOL +
      this.payload.toString()
    )
  }
}

module.exports = { PushEvent }
