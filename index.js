process.title = "Key Spammer"
const robot = require("robotjs");
const ioHook = require('iohook');
const chalk = require('chalk')
robot.setKeyboardDelay(parseInt(process.env.SPAM_INTERVAL))
ioHook.start();


class Spammer {
	constructor() {
		this.keys = [4,5,6,7]
		this.listen()
		this.allowSpam = false
		this.spamKey = 4
	}

	spam() {
		const spamInterval = setInterval(()=>{
			if(this.allowSpam) {
				robot.keyTap(`${this.spamKey}`)
			} else {
				clearInterval(spamInterval)
			}
		},parseInt(process.env.SPAM_INTERVAL))
	}

	listen() {
		const self = this
		ioHook.on('keydown', event => {
			if(self.keys.includes(event.keycode)) {
				self.allowSpam = true
				self.spamKey = event.keycode-1
				self.spam()
			}
		})

		ioHook.on('keyup', event => {
			if(self.keys.includes(event.keycode)) {
				self.allowSpam = false
			}
		})
	}

}

const spammer = new Spammer()

console.clear()
console.log(chalk.green('Aion Spammer v1.0'))
console.log(`${chalk.green('Status: ')} ${chalk.bgGreen('RUNNING')}`)
