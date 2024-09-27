const readline = require("node:readline")
const { EventFactory } = require("./events/eventFactory")

async function main() {
  printProgramName()
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  })
  for await (const line of rl) {
    await processLine(line)
    printProgramName()
  }
}

async function processLine(line) {
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
    console.log(error.message)
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
    return { events }
  } catch (error) {
    console.error(error)
  }
}

function printProgramName() {
  process.stdout.write("github-activity ")
}

if (require.main === module) {
  // when a file is run directly from Node, require.main is set to its module
  main()
}

module.exports = { main }
