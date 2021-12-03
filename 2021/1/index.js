import { 
  split,
  pipe,
  map,
  reduce,
  prop,
} from 'ramda'
import { promises as fs } from "fs"



const tallyIncreases = (acc, curr) => ({
  tally: curr > acc.prev ? acc.tally + 1 : acc.tally,
  prev: curr
})

const getTotalIncreases = pipe(
  split(/\r?\n/g),
  map(Number),
  reduce(tallyIncreases, { tally: 0, prev: undefined }),
  prop('tally')
)

const sender = async () => {
  try {
    const data = await fs.readFile('input', 'utf8')
    const count = getTotalIncreases(data)
    console.log(`Total of ${count} increases`)
  } catch (err) {
    console.error(err)
  }
}

sender()

