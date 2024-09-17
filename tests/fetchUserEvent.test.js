import { describe, it, expect } from "vitest"
import { EOL } from "node:os"
import { INVALID_USERNAME, TEST_USERNAME } from "../mocks/handlers"
import { main } from "../src"

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("fetch user event", async () => {
  function mockStdinAndStdout() {
    const stdin = require("mock-stdin").stdin()
    const { stdout } = require("stdout-stderr")
    stdout.print = true
    stdout.start()
    return { stdin, stdout }
  }

  it("should fetch no user events for invalid user", async () => {
    const { stdin, stdout } = mockStdinAndStdout()
    main()
    stdin.send(INVALID_USERNAME + EOL)
    stdin.end()
    await sleep(50)
    stdout.stop()
    expect(stdout.output).toMatch(
      new RegExp(
        String.raw`Could not fetch user events for user \[${INVALID_USERNAME}\]`
      ),
      "Should display no fetch event found for user message"
    )
  })

  it("should fetch create user event for valid user and display event summary", async () => {
    const { stdin, stdout } = mockStdinAndStdout()
    main()
    stdin.send(TEST_USERNAME + EOL)
    stdin.end()
    await sleep(50)
    stdout.stop()
    expect(stdout.output).not.toMatch(
      new RegExp(
        String.raw`Could not fetch user events for user \[${TEST_USERNAME}\]`
      ),
      "Should not display no fetch event found for user message"
    )
    expect(stdout.output).toMatch(
      new RegExp(
        String.raw`\- Created new repository \"${TEST_USERNAME}/github-user-activity\"`
      ),
      "Should display create new repository user event ('CreateEvent')"
    )
    expect(stdout.output).toMatch(
      new RegExp(
        String.raw`\- Created new branch \"fetch-user-activity\" on repository \"${TEST_USERNAME}/github-user-activity\"`
      ),
      "Should display create new branch user event ('CreateEvent')"
    )
  })

  it("should fetch delete event for valid user and display event summary", async () => {
    const { stdin, stdout } = mockStdinAndStdout()
    main()
    stdin.send(TEST_USERNAME + EOL)
    stdin.end()
    await sleep(50)
    stdout.stop()
    expect(stdout.output).not.toMatch(
      new RegExp(
        String.raw`Could not fetch user events for user \[${TEST_USERNAME}\]`
      ),
      "Should not display no fetch event found for user message"
    )
    expect(stdout.output).toMatch(
      new RegExp(
        String.raw`\- Deleted branch \"delete-task\" from \"${TEST_USERNAME}/task-tracker\"`
      ),
      "Should display delete user event ('DeleteEvent')"
    )
  })

  it("should fetch pull request event for valid user and display event summary", async () => {
    const { stdin, stdout } = mockStdinAndStdout()
    main()
    stdin.send(TEST_USERNAME + EOL)
    stdin.end()
    await sleep(50)
    stdout.stop()
    expect(stdout.output).not.toMatch(
      new RegExp(
        String.raw`Could not fetch user events for user \[${TEST_USERNAME}\]`
      ),
      "Should not display no fetch event found for user message"
    )
    expect(stdout.output).toMatch(
      new RegExp(
        String.raw`\- Closed pull request #6 \"Add delete command and tests\" from branch TEST_USERNAME:delete-task => TEST_USERNAME:main on repository \"TEST_USERNAME/task-tracker\"`
      ),
      "Should display closed pull request user event ('PullRequestEvent')"
    )
  })
})
