import '@testing-library/jest-dom/extend-expect'

const ogConsoleError = console.error
console.error = (...args: unknown[]) => {
  if (args.length > 0) {
    if (typeof args[0] === 'string') {
      if (
        args[0].includes(
          'act(...) is not supported in production builds of React, and might not behave as expected.'
        )
      )
        return
    }
  }
  ogConsoleError(...args)
}
