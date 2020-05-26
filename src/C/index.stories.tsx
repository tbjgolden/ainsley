import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import C from './index'

export default {
  component: C,
  title: 'C',
  decorators: [withKnobs]
}

export const Default = (): JSX.Element => {
  const textValue = text('Name', 'Example Text')
  return <C text={textValue} />
}
