import { Fields } from './setup.js'

/**
 * INTERNAL: Get the available actions.
 *
 * @access protected
 * @since 1.0.0
 */
export function updateActions() {
	this.setActionDefinitions({
		left: {
			name: 'Pan Left',
			options: [],
			callback: () => {
				this.sendCommand('camera pan left ' + this.panSpeed)
			},
		},
		right: {
			name: 'Pan Right',
			options: [],
			callback: () => {
				this.sendCommand('camera pan right ' + this.panSpeed)
			},
		},
		up: {
			name: 'Tilt Up',
			options: [],
			callback: () => {
				this.sendCommand('camera tilt up ' + this.tiltSpeed)
			},
		},
		down: {
			name: 'Tilt Down',
			options: [],
			callback: () => {
				this.sendCommand('camera tilt down ' + this.tiltSpeed)
			},
		},
		upLeft: {
			name: 'Up Left',
			options: [],
			callback: () => {
				this.sendCommand('camera pan left ' + this.panSpeed)
				this.sendCommand('camera tilt up ' + this.tiltSpeed)
			},
		},
		upRight: {
			name: 'Up Right',
			options: [],
			callback: () => {
				this.sendCommand('camera pan right ' + this.panSpeed)
				this.sendCommand('camera tilt up ' + this.tiltSpeed)
			},
		},
		downLeft: {
			name: 'Down Left',
			options: [],
			callback: () => {
				this.sendCommand('camera pan left ' + this.panSpeed)
				this.sendCommand('camera tilt down ' + this.tiltSpeed)
			},
		},
		downRight: {
			name: 'Down Right',
			options: [],
			callback: () => {
				this.sendCommand('camera pan right ' + this.panSpeed)
				this.sendCommand('camera tilt down ' + this.tiltSpeed)
			},
		},
		stop: {
			name: 'P/T Stop',
			options: [],
			callback: () => {
				this.sendCommand('camera pan stop')
				this.sendCommand('camera tilt stop')
			},
		},
		home: {
			name: 'P/T Home',
			options: [],
			callback: () => {
				this.sendCommand('camera home')
			},
		},

		pSpeedS: {
			name: 'Pan Speed',
			options: [Fields.Speed(1, 24, 12)],
			callback: ({ options }) => {
				this.panSpeed = options.speed
				this.setVariableValues({ pan_speed: this.panSpeed })
				this.checkFeedbacks('pt_speed')
			},
		},
		pSpeedU: {
			name: 'Pan Speed Up',
			options: [],
			callback: () => {
				if (this.panSpeed < 24) {
					this.panSpeed++
					this.setVariableValues({ pan_speed: this.panSpeed })
					this.checkFeedbacks('pt_speed')
				}
			},
		},
		pSpeedD: {
			name: 'Pan Speed Down',
			options: [],
			callback: () => {
				if (this.panSpeed > 1) {
					this.panSpeed--
					this.setVariableValues({ pan_speed: this.panSpeed })
					this.checkFeedbacks('pt_speed')
				}
			},
		},
		tSpeedS: {
			name: 'Tilt Speed',
			options: [Fields.Speed(1, 20, 10)],
			callback: ({ options }) => {
				this.tiltSpeed = options.speed
				this.setVariableValues({ tilt_speed: this.tiltSpeed })
				this.checkFeedbacks('pt_speed')
			},
		},
		tSpeedU: {
			name: 'Tilt Speed Up',
			options: [],
			callback: () => {
				if (this.tiltSpeed < 20) {
					this.tiltSpeed++
					this.setVariableValues({ tilt_speed: this.tiltSpeed })
					this.checkFeedbacks('pt_speed')
				}
			},
		},
		tSpeedD: {
			name: 'Tilt Speed Down',
			options: [],
			callback: () => {
				if (this.tiltSpeed > 1) {
					this.tiltSpeed--
					this.setVariableValues({ tilt_speed: this.tiltSpeed })
					this.checkFeedbacks('pt_speed')
				}
			},
		},

		zoomI: {
			name: 'Zoom In',
			options: [],
			callback: () => {
				this.sendCommand('camera zoom in ' + this.zoomSpeed)
			},
		},
		zoomO: {
			name: 'Zoom Out',
			options: [],
			callback: () => {
				this.sendCommand('camera zoom out ' + this.zoomSpeed)
			},
		},
		zoomS: {
			name: 'Zoom Stop',
			options: [],
			callback: () => {
				this.sendCommand('camera zoom stop')
			},
		},
		zSpeedS: {
			name: 'Zoom Speed',
			options: [Fields.Speed(1, 7, 3)],
			callback: ({ options }) => {
				this.zoomSpeed = options.speed
				this.setVariableValues({ zoom_speed: this.zoomSpeed })
			},
		},
		zSpeedU: {
			name: 'Zoom Speed Up',
			options: [],
			callback: () => {
				if (this.zoomSpeed < 7) {
					this.zoomSpeed++
					this.setVariableValues({ zoom_speed: this.zoomSpeed })
				}
			},
		},
		zSpeedD: {
			name: 'Zoom Speed Down',
			options: [],
			callback: () => {
				if (this.zoomSpeed > 1) {
					this.zoomSpeed--
					this.setVariableValues({ zoom_speed: this.zoomSpeed })
				}
			},
		},

		focusN: {
			name: 'Focus Near',
			options: [],
			callback: () => {
				this.sendCommand('camera focus near ' + this.zoomSpeed)
			},
		},
		focusF: {
			name: 'Focus Far',
			options: [],
			callback: () => {
				this.sendCommand('camera focus far ' + this.zoomSpeed)
			},
		},
		focusS: {
			name: 'Focus Stop',
			options: [],
			callback: () => {
				this.sendCommand('camera focus stop')
			},
		},
		focusM: {
			name: 'Focus Mode',
			options: [Fields.FocusMode],
			callback: ({ options }) => {
				this.sendCommand('camera focus mode ' + options.mode)
			},
		},
		fSpeedS: {
			name: 'Focus Speed',
			options: [Fields.Speed(1, 8, 4)],
			callback: ({ options }) => {
				this.focusSpeed = options.speed
				this.setVariableValues({ focus_speed: this.focusSpeed })
			},
		},
		fSpeedU: {
			name: 'Focus Speed Up',
			options: [],
			callback: () => {
				if (this.focusSpeed < 8) {
					this.focusSpeed++
					this.setVariableValues({ focus_speed: this.focusSpeed })
				}
			},
		},
		fSpeedD: {
			name: 'Focus Speed Down',
			options: [],
			callback: () => {
				if (this.focusSpeed > 1) {
					this.focusSpeed--
					this.setVariableValues({ focus_speed: this.focusSpeed })
				}
			},
		},

		gainS: {
			name: 'Set Gain',
			options: [Fields.Value(0, 11, 6)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set gain ' + options.value)
				this.sendCommand('camera ccu get gain')
			},
		},
		gainU: {
			name: 'Gain Up',
			options: [],
			callback: () => {
				if (this.state.gain < 11) {
					this.sendCommand('camera ccu set gain ' + (this.state.gain + 1))
				}
				this.sendCommand('camera ccu get gain')
			},
		},
		gainD: {
			name: 'Gain Down',
			options: [],
			callback: () => {
				if (this.state.gain > 0) {
					this.sendCommand('camera ccu set gain ' + (this.state.gain - 1))
				}
				this.sendCommand('camera ccu get gain')
			},
		},
		awbS: {
			name: 'Set Auto White Balance on/off',
			options: [Fields.OnOff],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set auto_white_balance ' + options.mode)
				this.sendCommand('camera ccu get auto_white_balance')
			},
		},
		rGainS: {
			name: 'Set Red Gain',
			options: [Fields.Value(0, 255, 128)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set red_gain ' + options.value)
				this.sendCommand('camera ccu get red_gain')
			},
		},
		rGainU: {
			name: 'Red Gain Up',
			options: [],
			callback: () => {
				if (this.state.red_gain < 255) {
					this.sendCommand('camera ccu set red_gain ' + (this.state.red_gain + 1))
				}
				this.sendCommand('camera ccu get red_gain')
			},
		},
		rGainD: {
			name: 'Red Gain Down',
			options: [],
			callback: () => {
				if (this.state.red_gain > 0) {
					this.sendCommand('camera ccu set red_gain ' + (this.state.red_gain - 1))
				}
				this.sendCommand('camera ccu get red_gain')
			},
		},
		bGainS: {
			name: 'Set Blue Gain',
			options: [Fields.Value(0, 255, 128)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set blue_gain ' + options.value)
				this.sendCommand('camera ccu get blue_gain')
			},
		},
		bGainU: {
			name: 'Blue Gain Up',
			options: [],
			callback: () => {
				if (this.state.blue_gain < 255) {
					this.sendCommand('camera ccu set blue_gain ' + (this.state.blue_gain + 1))
				}
				this.sendCommand('camera ccu get blue_gain')
			},
		},
		bGainD: {
			name: 'Blue Gain Down',
			options: [],
			callback: () => {
				if (this.state.blue_gain > 0) {
					this.sendCommand('camera ccu set blue_gain ' + (this.state.blue_gain - 1))
				}
				this.sendCommand('camera ccu get blue_gain')
			},
		},

		blcS: {
			name: 'Set Backlight Compensation on/off',
			options: [Fields.OnOff],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set backlight_compensation ' + options.mode)
				this.sendCommand('camera ccu get backlight_compensation')
			},
		},
		aIrisS: {
			name: 'Set Auto Iris on/off',
			options: [Fields.OnOff],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set auto_iris ' + options.mode)
				this.sendCommand('camera ccu get auto_iris')
			},
		},
		irisS: {
			name: 'Set Iris',
			options: [Fields.Value(0, 11, 6)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set iris ' + options.value)
				this.sendCommand('camera ccu get iris')
			},
		},
		irisU: {
			name: 'Iris Up',
			options: [],
			callback: () => {
				if (this.state.iris < 11) {
					this.sendCommand('camera ccu set iris ' + (this.state.iris + 1))
				}
				this.sendCommand('camera ccu get iris')
			},
		},
		irisD: {
			name: 'Iris Down',
			options: [],
			callback: () => {
				if (this.state.iris > 0) {
					this.sendCommand('camera ccu set iris ' + (this.state.iris - 1))
				}
				this.sendCommand('camera ccu get iris')
			},
		},
		detailS: {
			name: 'Set Detail',
			options: [Fields.Value(0, 15, 8)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set detail ' + options.value)
				this.sendCommand('camera ccu get detail')
			},
		},
		detailU: {
			name: 'Detail Up',
			options: [],
			callback: () => {
				if (this.state.detail < 15) {
					this.sendCommand('camera ccu set detail ' + (this.state.detail + 1))
				}
				this.sendCommand('camera ccu get detail')
			},
		},
		detailD: {
			name: 'Detail Down',
			options: [],
			callback: () => {
				if (this.state.detail > 0) {
					this.sendCommand('camera ccu set detail ' + (this.state.detail - 1))
				}
				this.sendCommand('camera ccu get detail')
			},
		},
		chromaS: {
			name: 'Set Chroma',
			options: [Fields.Value(0, 14, 7)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set chroma ' + options.value)
				this.sendCommand('camera ccu get chroma')
			},
		},
		chromaU: {
			name: 'Chroma Up',
			options: [],
			callback: () => {
				if (this.state.chroma < 14) {
					this.sendCommand('camera ccu set chroma ' + (this.state.chroma + 1))
				}
				this.sendCommand('camera ccu get chroma')
			},
		},
		chromaD: {
			name: 'Chroma Down',
			options: [],
			callback: () => {
				if (this.state.chroma > 0) {
					this.sendCommand('camera ccu set chroma ' + (this.state.chroma - 1))
				}
				this.sendCommand('camera ccu get chroma')
			},
		},
		gammaS: {
			name: 'Set Gamma',
			options: [Fields.Value(-64, 64, 0)],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set gamma ' + options.value)
				this.sendCommand('camera ccu get gamma')
			},
		},
		gammaU: {
			name: 'Gamma Up',
			options: [],
			callback: () => {
				if (this.state.gamma < 64) {
					this.sendCommand('camera ccu set gamma ' + (this.state.gamma + 1))
				}
				this.sendCommand('camera ccu get gamma')
			},
		},
		gammaD: {
			name: 'Gamma Down',
			options: [],
			callback: () => {
				if (this.state.gamma > -64) {
					this.sendCommand('camera ccu set gamma ' + (this.state.gamma - 1))
				}
				this.sendCommand('camera ccu get gamma')
			},
		},
		wdrS: {
			name: 'Set Wide Dynamic Range on/off',
			options: [Fields.OnOff],
			callback: ({ options }) => {
				this.sendCommand('camera ccu set wide_dynamic_range ' + options.mode)
				this.sendCommand('camera ccu get wide_dynamic_range')
			},
		},

		savePset: {
			name: 'Save Preset',
			options: [Fields.Preset, Fields.Speed(1, 24, 1), Fields.IncludeCcu],
			callback: ({ options }) => {
				cmd = 'camera preset store ' + options.val
				if (!this.config.storeWithoutSpeed) {
					cmd += ' ' + options.speed
				}
				if (options.ccu === true) {
					cmd += ' save-ccu'
				}
				this.sendCommand(cmd)
			},
		},
		recallPset: {
			name: 'Recall Preset',
			options: [Fields.Preset],
			callback: ({ options }) => {
				this.sendCommand('camera preset recall ' + options.val)
			},
		},
		saveCCU: {
			name: 'Save CCU Preset',
			options: [Fields.CcuPresetSave],
			callback: ({ options }) => {
				this.sendCommand('camera ccu scene store custom ' + options.preset)
			},
		},
		recallCCU: {
			name: 'Recall CCU Preset',
			options: [Fields.CcuPresetRecall],
			callback: ({ options }) => {
				cmd =
					'camera ccu scene recall ' +
					(options.preset.substring(0, 1) == 'C' ? 'custom ' : 'factory ') +
					options.preset.substring(1, 2)
				this.sendCommand(cmd)
				this.sendCommand('camera ccu get all')
			},
		},
		setLed: {
			name: 'Set LED on/off',
			options: [Fields.OnOff],
			callback: ({ options }) => {
				this.sendCommand('camera led ' + options.mode)
			},
		},
		setStandby: {
			name: 'Set standby',
			options: [Fields.OnOffToggle],
			callback: ({ options }) => {
				this.sendCommand('camera standby ' + options.mode)
			},
		},
		setVidMute: {
			name: 'Set video mute',
			options: [Fields.OnOffToggle],
			callback: ({ options }) => {
				this.sendCommand('video mute ' + options.mode)
			},
		},
	})
}
