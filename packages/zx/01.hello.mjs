import { $ } from 'zx'

const date = await $`date`
const res = await $`echo Current date is ${date}.`
console.log(date, res)
