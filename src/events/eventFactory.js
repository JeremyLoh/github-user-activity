import { CreateEvent } from "./createEvent"
import { DeleteEvent } from "./deleteEvent"

const EventType = Object.freeze({
  create: "CreateEvent",
  delete: "DeleteEvent",
  pullRequest: "PullRequestEvent",
  push: "PushEvent",
})

class EventFactory {
  static createEvent(event) {
    // create event based on Github API event types
    const type = event.type
    switch (type) {
      case EventType.create:
        return new CreateEvent(
          event["actor"],
          event["repo"],
          event["payload"],
          event["created_at"]
        )
      case EventType.delete:
        return new DeleteEvent(
          event["actor"],
          event["repo"],
          event["payload"],
          event["created_at"]
        )
      default:
        break
    }
  }
}

module.exports = { EventFactory }
