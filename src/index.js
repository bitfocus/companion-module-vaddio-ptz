import {
	CreateConvertToBooleanFeedbackUpgradeScript,
	InstanceBase,
	Regex,
	runEntrypoint,
	TCPHelper,
} from '@companion-module/base'
import { updateActions } from './actions.js'
import { updateFeedbacks } from './feedback.js'
import { updatePresets } from './presets.js'
import { updateVariables } from './variables.js'
import { BooleanFeedbackUpgradeMap } from './upgrades.js'
import { PollCommands } from './setup.js'

/**
 * Companion instance class for the Vaddio PTZ cameras.
 *
 * @extends InstanceBase
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class VaddioPtzInstance extends InstanceBase {
	/**
	 * Create an instance of a Vaddio PTZ module.
	 *
	 * @param {Object} internal - Companion internals
	 * @since 1.0.0
	 */
	constructor(internal) {
		super(internal)

		this.updateActions = updateActions.bind(this)
		this.updateFeedbacks = updateFeedbacks.bind(this)
		this.updatePresets = updatePresets.bind(this)
		this.updateVariables = updateVariables.bind(this)
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	async configUpdated(config) {
		let resetConnection = false

		if (this.config.host != config.host) {
			resetConnection = true
		}

		this.config = config

		this.updateActions()
		this.updateFeedbacks()
		this.updatePresets()
		this.updateVariables()

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP()
		}
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		if (this.pollTimer !== undefined) {
			clearInterval(this.pollTimer)
		}

		this.log('debug', 'destroy', this.id)
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to any Vaddio PTZ Camera via telnet.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Camera IP',
				width: 6,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'username',
				label: 'Username',
				width: 6,
				default: 'admin',
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
				default: 'password',
				regex: Regex.SOMETHING,
			},
			{
				type: 'checkbox',
				id: 'pollingOn',
				label: 'Enable Status Polling?',
				width: 2,
				default: true,
			},
			{
				type: 'number',
				id: 'pollingInterval',
				label: 'Polling Interval (in s)',
				width: 4,
				min: 1,
				max: 999,
				default: 5,
				required: true,
			},
			{
				type: 'checkbox',
				id: 'storeWithoutSpeed',
				label: 'Store presets without setting any speed.',
				tooltip: 'Useful for older models/firmware not supporting it.',
				width: 4,
				default: false,
			},
		]
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @param {Object} config - the configuration
	 * @access public
	 * @since 1.0.0
	 */
	async init(config) {
		this.config = config

		this.deviceName = ''
		this.loggedIn = false
		this.okToSend = false
		this.catchUp = false
		this.nextCommand = ''
		this.lastPoll = 0
		this.pollTimer = null

		this.panSpeed = 12
		this.tiltSpeed = 10
		this.zoomSpeed = 3
		this.focusSpeed = 5

		this.state = {
			auto_focus: 'on', //
			auto_iris: 'on', //
			auto_white_balance: 'on', //
			backlight_compensation: 'off', //
			blue_gain: 128,
			chroma: 7,
			detail: 7,
			gain: 0,
			gamma: 0,
			iris: 6,
			led: 'on',
			mute: 'off',
			red_gain: 128,
			standby: 'off',
			wide_dynamic_range: 'off',
		}

		this.updateActions()
		this.updateVariables()
		this.updateFeedbacks()
		this.updatePresets()

		this.initTCP()
	}

	/**
	 * INTERNAL: use setup data to initalize the tcp socket object.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	initTCP() {
		this.receiveBuffer = ''

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.pollTimer !== undefined) {
			clearInterval(this.pollTimer)
		}

		if (this.config.port === undefined) {
			this.config.port = 23
		}

		if (this.config.host) {
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('connect', () => {
				this.log('debug', 'Connected')
			})

			this.socket.on('disconnect', () => {
				this.log('debug', 'Disconnected')
				this.loggedIn = false
				this.okToSend = false

				if (this.pollTimer !== undefined) {
					clearInterval(this.pollTimer)
				}
			})

			// separate buffered stream into lines with responses
			this.socket.on('data', (chunk) => {
				let i = 0,
					line = '',
					offset = 0
				this.receiveBuffer += chunk

				// Process lines
				while ((i = this.receiveBuffer.indexOf('\n', offset)) !== -1) {
					line = this.receiveBuffer.substr(offset, i - offset)
					offset = i + 1
					this.socket.emit('receiveline', line.toString())
				}

				this.receiveBuffer = this.receiveBuffer.substr(offset)

				// Read current line
				if (this.receiveBuffer.match(/[L|l]ogin:/)) {
					this.receiveBuffer = ''
					this.socket.send(this.config.username + '\r\n')
				} else if (this.receiveBuffer.match(/[P|p]assword:/)) {
					this.receiveBuffer = ''
					this.socket.send(this.config.password + '\r\n')
				} else if (this.receiveBuffer.match(/>/)) {
					this.loggedIn = true

					if (this.deviceName == '') {
						this.receiveBuffer = ''
						this.socket.send('version\r\n')
						this.catchUp = true
						this.lastPoll = -1
					} else if (this.catchUp == true) {
						let thisPoll = this.lastPoll + 1

						if (thisPoll < PollCommands.length) {
							this.socket.send(PollCommands[thisPoll] + '\r\n')
							this.lastPoll = thisPoll
						} else {
							this.catchUp = false

							if (this.config.pollingOn === true) {
								this.pollTimer = setInterval(this.sendPollCommand.bind(this), this.config.pollingInterval * 1000)
							}
						}
					} else {
						this.okToSend = true
						this.sendCommand()
					}
				}
			})

			this.socket.on('receiveline', (line) => {
				if (this.loggedIn == false) {
					this.processLogin(line)
				} else {
					this.processCameraInformation(line)
				}
			})
		}
	}

	/**
	 * INTERNAL: Routes incoming data to the appropriate function for processing.
	 *
	 * @param {Object} data - the collected data
	 * @access protected
	 * @since 1.0.0
	 */
	processCameraInformation(data) {
		if (data.match(/System Version/)) {
			this.deviceName = data.substring(data.indexOf('Robo'))
			this.log('info', 'Connected to a ' + this.deviceName)
			this.sendCommand('camera ccu get all')
		} else if (data.startsWith('auto_focus')) {
			data = data.replace('auto_focus:', '').trim()
			this.state.auto_focus = data
			this.checkFeedbacks('auto_focus')
		} else if (data.startsWith('auto_iris')) {
			data = data.replace('auto_iris', '').trim()
			this.state.auto_iris = data
			this.checkFeedbacks('auto_iris')
		} else if (data.startsWith('auto_white_balance')) {
			data = data.replace('auto_white_balance', '').trim()
			this.state.auto_white_balance = data
			this.checkFeedbacks('auto_white_balance')
		} else if (data.startsWith('backlight_compensation')) {
			data = data.replace('backlight_compensation', '').trim()
			this.state.backlight_compensation = data
			this.checkFeedbacks('backlight_compensation')
		} else if (data.startsWith('blue_gain')) {
			data = data.replace('blue_gain', '').trim()
			this.state.blue_gain = parseInt(data)
			this.setVariableValues({ blue_gain: this.state.blue_gain })
		} else if (data.startsWith('chroma')) {
			data = data.replace('chroma', '').trim()
			this.state.chroma = parseInt(data)
			this.setVariableValues({ chroma: this.state.chroma })
		} else if (data.startsWith('detail')) {
			data = data.replace('detail', '').trim()
			this.state.detail = parseInt(data)
			this.setVariableValues({ detail: this.state.detail })
		} else if (data.startsWith('gain')) {
			data = data.replace('gain', '').trim()
			this.state.gain = parseInt(data)
			this.setVariableValues({ gain: this.state.gain })
		} else if (data.startsWith('gamma')) {
			data = data.replace('gamma', '').trim()
			this.state.gamma = parseInt(data)
			this.setVariableValues({ gamma: this.state.gamma })
		} else if (data.startsWith('iris')) {
			data = data.replace('iris', '').trim()
			this.state.iris = parseInt(data)
			this.setVariableValues({ iris: this.state.iris })
		} else if (data.startsWith('led')) {
			data = data.replace('led:', '').trim()
			this.state.led = data
			this.checkFeedbacks('led')
		} else if (data.startsWith('mute')) {
			data = data.replace('mute:', '').trim()
			this.state.mute = data
			this.checkFeedbacks('mute')
		} else if (data.startsWith('red_gain')) {
			data = data.replace('red_gain', '').trim()
			this.state.red_gain = parseInt(data)
			this.setVariableValues({ red_gain: this.state.red_gain })
		} else if (data.startsWith('standby')) {
			data = data.replace('standby:', '').trim()
			this.state.standby = data
			this.checkFeedbacks('standby')
		} else if (data.startsWith('wide_dynamic_range')) {
			data = data.replace('wide_dynamic_range', '').trim()
			this.state.wide_dynamic_range = data
			this.checkFeedbacks('wide_dynamic_range')
		}
	}

	/**
	 * INTERNAL: Processes data from telnet pre-login.
	 *
	 * @param {Object} data - the collected data
	 * @access protected
	 * @since 1.0.0
	 */
	processLogin(data) {
		if (data == 'Welcome ' + this.config.username) {
			this.loggedIn = true
		}
	}

	/**
	 * INTERNAL: Send a command to the camera
	 *
	 * @param {String} cmd - the command to send
	 * @access protected
	 * @since 1.0.0
	 */
	sendCommand(cmd = '') {
		if (this.okToSend === false && cmd != '') {
			this.nextCommand = cmd
		} else if (this.okToSend === true && (cmd != '' || this.nextCommand != '')) {
			if (cmd == '') {
				cmd = this.nextCommand
				this.nextCommand = ''
			}

			this.okToSend = false
			this.socket.send(cmd + '\r\n')
		}
	}

	/**
	 * INTERNAL: Send a poll command to refresh status
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	sendPollCommand() {
		if (this.state.standby == 'off') {
			let thisPoll = this.lastPoll + 1

			if (thisPoll >= PollCommands.length) {
				thisPoll = 0
			}

			this.sendCommand(PollCommands[thisPoll])
			this.lastPoll = thisPoll
		} else {
			this.sendCommand('camera standby get')
		}
	}
}

runEntrypoint(VaddioPtzInstance, [CreateConvertToBooleanFeedbackUpgradeScript(BooleanFeedbackUpgradeMap)])
