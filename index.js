process.title = "Key Spammer"
const robot = require("robotjs");
const ioHook = require('iohook');
const chalk = require('chalk')
robot.setKeyboardDelay(0)
ioHook.start();


class Spammer {
	constructor() {
		this.keys = [4,5,6,7]
		this.allowSpam = true
		this.spamKeys = []
		this.spamInterval = parseInt(process.env.SPAM_INTERVAL) || 500
		this.listen()
		this.spam()
	}

	enableSpam() {
		this.allowSpam = true
	}

	disableSpam() {
		this.disableSpam = false
	}

	spam() {
		const spamInterval = setInterval(()=>{
			if(this.allowSpam) {
				for(let i=0; i<this.spamKeys.length; i++) {
					robot.keyTap(`${this.spamKeys[i]}`)
				}
			} else {
				clearInterval(spamInterval)
			}
		},this.spamInterval)
	}



	listen() {
		const self = this

		ioHook.on('keydown', event => {
			const keycode = event.keycode-1
			if(self.keys.includes(keycode)) {
				self.spamKeys.push(keycode)
				self.enableSpam()
			}
		})

		ioHook.on('keyup', event => {
			const keycode = event.keycode-1
			if(self.keys.includes(keycode)) {
				self.spamKeys = self.spamKeys.filter(key => key == keycode);
			}
			if(self.spamKeys.length === 0) {
				self.disableSpam()
			}
		})
	}

}

const spammer = new Spammer()

console.clear()
console.log(chalk.green('Aion Spammer v1.0'))
console.log(`${chalk.green('Status: ')} ${chalk.bgGreen('RUNNING')}`)
