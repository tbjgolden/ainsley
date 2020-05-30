const fs = require('fs')
const path = require('path')

const getColor = (percentage) => {
  if (Number.isNaN(percentage)) {
    return '#9f9f9f'
  } else if (percentage <= 0) {
    return '#e05d44'
  } else if (percentage < 80) {
    return '#dfb317'
  } else if (percentage < 90) {
    return '#a4a61d'
  } else if (percentage < 100) {
    return '#97ca00'
  } else {
    return '#4c1'
  }
}

const generateSVG = (percentage) =>
  `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="20">
      <g shape-rendering="crispEdges">
        <rect width="61" height="20" fill="#555"/>
        <rect x="61" width="43" height="20" fill="${getColor(
          parseInt(percentage)
        )}"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text x="315" y="140" transform="scale(.1)" textLength="510">coverage</text>
        <text x="815" y="140" transform="scale(.1)" textLength="330">${percentage}</text>
      </g>
    </svg>
  `
    .trim()
    .replace(/\n\s*/g, '')

const calcPercentage = () => {
  let percentage = 'n/a'
  try {
    const coverage = require('../../coverage/coverage-summary.json')

    const lines =
      coverage.total.lines.total === 0 ? 100 : coverage.total.lines.pct
    const statements =
      coverage.total.statements.total === 0
        ? 100
        : coverage.total.statements.pct
    const functions =
      coverage.total.functions.total === 0 ? 100 : coverage.total.functions.pct
    const branches =
      coverage.total.branches.total === 0 ? 100 : coverage.total.branches.pct

    const meanCoverage = (lines + statements + functions + branches) / 4

    percentage = `${Math.round(meanCoverage)}%`
  } catch (err) {
    console.warn('No coverage found - you probably need to run the tests first')
  }

  return percentage
}

if (
  fs.existsSync(path.join(__dirname, '../../coverage/coverage-summary.json'))
) {
  fs.writeFileSync(
    path.join(__dirname, './shield.svg'),
    generateSVG(calcPercentage())
  )
}
