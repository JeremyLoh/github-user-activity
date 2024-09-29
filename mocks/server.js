import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { restHandlers } from "./handlers"

export const server = setupServer(...restHandlers)

// onUnhandleRequest: 'error' ensures that an error is thrown whenever there is a request that does not have a corresponding request handler
beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
// Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
