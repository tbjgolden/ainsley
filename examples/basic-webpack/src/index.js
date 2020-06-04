import { generate, embed } from 'ainsley'
import styles from './styles.ainsley'

embed(generate(styles))
document.body.style.visibility = ''
