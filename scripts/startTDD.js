#!/usr/bin/env node

const fg = require('fast-glob')
const path = require('path')

const entries = fg.sync(['src/**/*.spec.ts', 'src/**/*.spec.tsx'], {
  cwd: path.join(__dirname, '..')
})

if (entries.length === 0) {
  console.log(
    'Skipping TDD (i.e. running Jest in watch mode) as no stories found.'
  )
  process.exit(1)
}
