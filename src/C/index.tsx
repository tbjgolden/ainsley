import React from 'react'

interface Props {
  text: string
}

const C: React.FunctionComponent<Props> = ({ text }) => <h1>{text}</h1>

export default C
