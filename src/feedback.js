import { combineRgb } from '@companion-module/base'
import { Fields } from './setup.js'

/**
 * INTERNAL: Get the available feedbacks.
 *
 * @access protected
 * @since 1.0.0
 */
export function updateFeedbacks() {
	this.setFeedbackDefinitions({
		standby: {
			type: 'boolean',
			name: 'Change style by camera standby state',
			description: 'If the camera standby state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.standby == options.mode
			},
		},
		auto_focus: {
			type: 'boolean',
			name: 'Change style by auto focus state',
			description: 'If the auto focus state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.auto_focus == options.mode
			},
		},
		auto_iris: {
			type: 'boolean',
			name: 'Change style by auto iris state',
			description: 'If the auto iris state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.auto_iris == options.mode
			},
		},
		auto_white_balance: {
			type: 'boolean',
			name: 'Change style by auto white balance state',
			description: 'If the auto white balance state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.auto_white_balance == options.mode
			},
		},
		backlight_compensation: {
			type: 'boolean',
			name: 'Change style by backlight compensation state',
			description: 'If the backlight compensation state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.backlight_compensation == options.mode
			},
		},
		led: {
			type: 'boolean',
			name: 'Change style by LED state',
			description: 'If the front LED state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.led == options.mode
			},
		},
		mute: {
			type: 'boolean',
			name: 'Change style by video mute state',
			description: 'If the video mute state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.mute == options.mode
			},
		},
		pt_speed: {
			type: 'boolean',
			name: 'Change style by pan & tilt speed',
			description: 'If the the pan and tilt speeds selected are action, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Pan Speed',
					id: 'panSpeed',
					min: 1,
					max: 24,
					default: 12,
					required: true,
					range: true,
				},
				{
					type: 'number',
					label: 'Tilt Speed',
					id: 'tiltSpeed',
					min: 1,
					max: 20,
					default: 10,
					required: true,
					range: true,
				},
			],
			callback: ({ options }) => {
				return this.panSpeed == options.panSpeed && this.tiltSpeed == options.tiltSpeed
			},
		},
		wide_dynamic_range: {
			type: 'boolean',
			name: 'Change style by wide dynamic range state',
			description: 'If the wide dynamic range state specified is active, change the style of the bank',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 255, 0),
			},
			options: [Fields.OnOff],
			callback: ({ options }) => {
				return this.state.wide_dynamic_range == options.mode
			},
		},
	})
}
