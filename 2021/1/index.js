import { 
  split,
  pipe,
  map,
  reduce,
  prop,
} from 'ramda'
import { getInputFile } from '../helpers.js'


const tallyIncreases = ({prev, tally}, curr) => ({
  tally: curr > prev ? tally + 1 : tally,
  prev: curr
})

const getTotalIncreases = pipe(
  split(/\r?\n/g),
  map(Number),
  reduce(tallyIncreases, { tally: 0, prev: undefined }),
  prop('tally')
)

const sender = () => {
  const count = getTotalIncreases(getInputFile())
  console.log(count)
}

sender()

