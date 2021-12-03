import { 
  split,
  pipe,
  map,
  reduce,
  zipObj,
} from 'ramda'
import { getInputFile } from '../helpers.js'

const unitsToNum = obj => ({...obj, units: Number(obj.units)})

const formatData = pipe(
  split(/\r?\n/g),
  map(pipe(
        split(/\s/),
        zipObj(['direction', 'units']),
        unitsToNum
      )),
)

const updateDepth = (direction, units, acc) => {
  if (direction === 'up') return acc - units
  if (direction === 'down') return acc + units
  return acc
}

const updatePosition = ({horizontal, depth}, {direction, units}) => {
  return {
    horizontal: direction === 'forward' ? units + horizontal : horizontal,
    depth: updateDepth(direction, units, depth)
  }
}

const getPosition = reduce(updatePosition, {horizontal: 0, depth: 0})

const getProduct = pos => pos.horizontal * pos.depth

const sender = () => {
  const product = pipe(
    formatData,
    getPosition,
    getProduct,
  )(getInputFile())
  console.log(product) // 2102357
}

sender()

