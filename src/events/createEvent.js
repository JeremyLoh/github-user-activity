// https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#createevent

import { Actor } from "../model/actor"
import { CreateEventPayload } from "../model/createEventPayload"
import { Repo } from "../model/repo"

class CreateEvent {
  constructor(actor, repo, payload, createdAt) {
    this.actor = new Actor(actor)
    this.repo = new Repo(repo)
    this.payload = new CreateEventPayload(payload)
    this.createdAt = createdAt
  }

  toString() {
    const createType = this.payload.getEventType()
    const name = this.payload.isRepository()
      ? `"${this.repo.name}"`
      : `"${this.payload.ref}" on repository "${this.repo.name}"`
    return `- Created new ${createType} ${name}`
  }
}

module.exports = { CreateEvent }
