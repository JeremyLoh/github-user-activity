const { PullRequest } = require("./pullRequest")

const Action = Object.freeze({
  opened: "opened",
  edited: "edited",
  closed: "closed",
  reopened: "reopened",
  assigned: "assigned",
  unassigned: "unassigned",
  review_requested: "review_requested",
  review_request_removed: "review_request_removed",
  labeled: "labeled",
  unlabeled: "unlabeled",
  synchronize: "synchronize",
})

class PullRequestEventPayload {
  constructor(payload) {
    this.action = payload.action
    this.number = payload.number
    this.pullRequest = new PullRequest(payload["pull_request"])
  }

  getAction() {
    return this.action.charAt(0).toUpperCase() + this.action.substring(1)
  }

  toString() {
    return `${this.getAction()} pull request #${
      this.number
    } ${this.pullRequest.toString()}`
  }
}

module.exports = { PullRequestEventPayload }
