const RefTypes = Object.freeze({
  branch: "branch",
  tag: "tag",
})

class DeleteEventPayload {
  constructor(payload) {
    this.ref = payload["ref"]
    this.refType = payload["ref_type"]
    this.pusherType = payload["pusher_type"]
  }

  getEventType() {
    return RefTypes[this.refType]
  }
}

module.exports = { DeleteEventPayload }
