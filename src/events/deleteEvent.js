import { Actor } from "../model/actor"
import { DeleteEventPayload } from "../model/deleteEventPayload"
import { Repo } from "../model/repo"

class DeleteEvent {
  constructor(actor, repo, payload, createdAt) {
    this.actor = new Actor(actor)
    this.repo = new Repo(repo)
    this.payload = new DeleteEventPayload(payload)
    this.createdAt = createdAt
  }

  toString() {
    return `- Deleted ${this.payload.getEventType()} "${
      this.payload.ref
    }" from "${this.repo.name}"`
  }
}

module.exports = { DeleteEvent }
