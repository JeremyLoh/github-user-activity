const { CreateEvent } = require("./createEvent")
const { DeleteEvent } = require("./deleteEvent")
const { PullRequestEvent } = require("./pullRequestEvent")
const { PushEvent } = require("./pushEvent")

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
      case EventType.pullRequest:
        return new PullRequestEvent(
          event["actor"],
          event["repo"],
          event["payload"],
          event["created_at"]
        )
      case EventType.push:
        return new PushEvent(
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
