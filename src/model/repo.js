class Repo {
  constructor(repo) {
    const { id, name, url } = repo
    this.id = id
    this.name = name
    this.url = url
  }
}

module.exports = { Repo }
