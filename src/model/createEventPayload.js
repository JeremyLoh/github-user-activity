const RefTypes = Object.freeze({
  branch: "branch",
  tag: "tag",
  repository: "repository",
})

class CreateEventPayload {
  constructor(payload) {
    const { ref, ref_type, master_branch, description, pusher_type } = payload
    this.ref = ref
    this.ref_type = ref_type
    this.master_branch = master_branch
    this.description = description
    this.pusher_type = pusher_type
  }

  getEventType() {
    return RefTypes[this.ref_type]
  }

  isRepository() {
    // if reference type is repository, payload ref will be null
    return this.ref == null
  }
}

module.exports = { CreateEventPayload }
