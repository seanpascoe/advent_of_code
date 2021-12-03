import fs from "fs"

export function getInputFile() {
  return fs.readFileSync('input.txt', 'utf8')
}