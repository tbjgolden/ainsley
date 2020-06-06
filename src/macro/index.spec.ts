import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

pluginTester({
  plugin,
  babelOptions: { filename: __filename },
  tests: [
    {
      title: 'macro generates object correctly',
      code: `
        import ainsley from '../../macro'
        console.log(ainsley("../../examples/locked-webpack/src/styles.ainsley"))
      `,
      snapshot: true
    }
  ]
})
