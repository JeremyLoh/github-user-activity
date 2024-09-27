// https://blog.logrocket.com/rate-limiting-node-js/
class RateLimit {
  // sliding window counter, group requests by timestamp
  constructor(requestPerInterval = 2, intervalInMs = 4000) {
    this.intervalInMs = intervalInMs
    this.requestPerInterval = requestPerInterval
    this.requestCountsPerInterval = new Map()
  }

  isValidRequest(requestTimestamp = Date.now()) {
    // get requests that are between now - interval
    let totalRequestsInInterval = 0
    const entriesToRemove = []
    for (const [timestamp, count] of this.requestCountsPerInterval.entries()) {
      if (requestTimestamp - this.intervalInMs > timestamp) {
        entriesToRemove.push(timestamp)
        continue
      }
      totalRequestsInInterval += count
    }
    this.requestCountsPerInterval.set(requestTimestamp, 1)
    // delete entries that are past interval
    entriesToRemove.forEach((k) => this.requestCountsPerInterval.delete(k))
    return totalRequestsInInterval < this.requestPerInterval
  }
}

const rateLimit = new RateLimit()

module.exports = { rateLimit }
