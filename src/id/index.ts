export const id = (prefix = 'id'): string =>
  `${prefix}-${Math.random().toString().slice(2)}`
