import { http, HttpResponse } from "msw"
import { getCreateEvent } from "./createEvent"
import { getDeleteEvent } from "./deleteEvent"
import { getPushEvent } from "./pushEvent"
import { getPullRequestEvent } from "./pullRequestEvent"

export const TEST_USERNAME = "TEST_USERNAME"
export const TEST_EMAIL = `test@email.com`
export const INVALID_USERNAME = "INVALID_USERNAME"

export const restHandlers = [
  http.get(`https://api.github.com/users/${TEST_USERNAME}/events`, () => {
    return HttpResponse.json([
      getCreateEvent(TEST_USERNAME),
      getDeleteEvent(TEST_USERNAME),
      getPushEvent(TEST_USERNAME, TEST_EMAIL),
      getPullRequestEvent(TEST_USERNAME),
    ])
  }),
  http.get(`https://api.github.com/users/${INVALID_USERNAME}/events`, () => {
    return HttpResponse.json({
      message: "Not Found",
      documentation_url:
        "https://docs.github.com/rest/activity/events#list-events-for-the-authenticated-user",
      status: "404",
    })
  }),
]
