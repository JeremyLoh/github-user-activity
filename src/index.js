const readline = require("node:readline")
const { EventFactory } = require("./events/eventFactory")
const { rateLimit } = require("./rateLimit")

async function main(enableRateLimit = true) {
  printProgramName()
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  })
  for await (const line of rl) {
    await processLine(line, enableRateLimit)
    printProgramName()
  }
}

async function processLine(line, enableRateLimit) {
  if (enableRateLimit && !rateLimit.isValidRequest()) {
    console.log("Too many requests. Please try again later")
    return
  }
  try {
    const { error, events } = await retrieveUserEvents(line.trim())
    if (error) {
      console.log(error)
      return
    }
    if (!events || events.length === 0) {
      console.log("\tCould not find any information about provided user")
      return
    }
    const convertedEvents = events.map((event) =>
      EventFactory.createEvent(event)
    )
    convertedEvents.forEach((event) => {
      if (event) {
        console.log(event.toString())
      }
    })
  } catch (error) {
    console.log(error)
  }
}

async function retrieveUserEvents(username) {
  const ky = (await import("ky")).default
  const url = `https://api.github.com/users/${username}/events`
  try {
    const events = await ky.get(url).json()
    if (events.status === "404" && events.message === "Not Found") {
      return { error: `Could not fetch user events for user [${username}]` }
    }
    return { events, error: null }
  } catch (error) {
    return { error: parseErrorMessage(error) }
  }
}

function parseErrorMessage(error) {
  let output = ""
  const SECOND_TO_MS = 1000
  const status = error.response.status
  const statusText = error.response.statusText
  output += `${status}: ${statusText}\n`

  const headers = error.response.headers
  if (headers.has("x-ratelimit-reset")) {
    // x-ratelimit-reset is given as epoch time in seconds
    const resetDate = new Date(headers.get("x-ratelimit-reset") * SECOND_TO_MS)
    output += `\tRate limit exceeded. Please try again after ${resetDate.toString()}`
  }
  return output
}

function printProgramName() {
  process.stdout.write("github-activity ")
}

if (require.main === module) {
  // when a file is run directly from Node, require.main is set to its module
  main()
}

module.exports = { main }
