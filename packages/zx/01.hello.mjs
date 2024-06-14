import { $, echo, os, usePowerShell } from 'zx'

usePowerShell();

/*const echo = $`echo "hello zx"`
echo.stdin.write('hello nodejs')
echo.stdin.end()
console.log(await echo)*/

/*
const p = await $`ls -a`
console.log(p.stdout)

// 等价于

const p = $`ls -a`
p.stdout.on('data', (buf) => {
	console.log(buf.toString())
})*/

/*try {
	await $`cat notExist`
} catch (err) {
	console.log(err)
	// cat: notExist: No such file or directory
	// ProcessOutput {
	//   stdout: '',
	//   stderr: 'cat: notExist: No such file or directory\n',
	//   signal: null,
	//   exitCode: 1
	// }
}*/

/*const files = await glob('./!**!/!*.json')
console.log(files) // [ 'package.json', 'node_modules/zx/package.json' ]*/

process.env.FORCE_COLOR='1'
await $`cat package.json`
