// https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28#event-object-common-properties
// Store representation of Actor of Github event type response
class Actor {
  constructor(actor) {
    const { id, login, display_login, gravatar_id, url, avatar_url } = actor
    this.id = id
    this.login = login
    this.display_login = display_login
    this.gravatar_id = gravatar_id
    this.url = url
    this.avatar_url = avatar_url
  }
}

module.exports = { Actor }
