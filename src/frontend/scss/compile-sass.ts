import * as sass from 'sass'

const {css} = sass.compile('src/scss/styles.scss')

console.log(css)
