#!/usr/bin/env node

const fg = require('fast-glob')
const path = require('path')

const entries = fg.sync(['src/**/*.stories.ts', 'src/**/*.stories.tsx'], {
  cwd: path.join(__dirname, '..')
})

if (entries.length > 0) {
  require('@storybook/react/dist/server')
} else {
  console.log('Skipping Storybook as no stories found.')
}
