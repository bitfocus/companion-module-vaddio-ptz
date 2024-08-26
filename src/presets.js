import { combineRgb } from '@companion-module/base'
import { Choices, Presets } from './setup.js'

/**
 * INTERNAL: initialize presets.
 *
 * @access protected
 * @since 1.0.0
 */
export function updatePresets() {
	let presets = []

	for (let pt in Presets.PanTilt) {
		presets[`pt_${Presets.PanTilt[pt].id}`] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: Presets.PanTilt[pt].label,
			style: {
				text: '',
				png64: Presets.PanTilt[pt].icon,
				pngalignment: 'center:center',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: Presets.PanTilt[pt].id,
						},
					],
					up: [
						{
							actionId: 'stop',
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	presets['pt_home'] = {
		type: 'button',
		category: 'Pan/Tilt',
		name: 'HOME',
		style: {
			text: 'HOME',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'home',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	for (let num = 1; num <= 16; num++) {
		for (let type in Presets.Presets) {
			presets[`preset_${num}_${Presets.Presets[type].id}_${Presets.Presets[type].speed}`] = {
				type: 'button',
				category: Presets.Presets[type].group,
				name: Presets.Presets[type].label + num,
				style: {
					text: Presets.Presets[type].label + num,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: Presets.Presets[type].id,
								options: {
									val: num,
									speed: Presets.Presets[type].speed,
									ccu: false,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	for (let type in Choices.CcuScenesR) {
		presets[`ccu_r_${Choices.CcuScenesR[type].id}`] = {
			type: 'button',
			category: 'CCU Presets',
			name: 'Recall ' + Choices.CcuScenesR[type].label,
			style: {
				text: 'Recall ' + Choices.CcuScenesR[type].label,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'recallCCU',
							options: {
								preset: Choices.CcuScenesR[type].id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	for (let type in Choices.CcuScenesS) {
		presets[`ccu_s_${Choices.CcuScenesS[type].id}`] = {
			type: 'button',
			category: 'CCU Presets',
			name: 'Save ' + Choices.CcuScenesS[type].label,
			style: {
				text: 'Save ' + Choices.CcuScenesS[type].label,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'saveCCU',
							options: {
								preset: Choices.CcuScenesS[type].id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	for (let pt in Presets.States) {
		presets[`state_${Presets.States[pt].action}`] = {
			type: 'button',
			category: Presets.States[pt].group,
			name: Presets.States[pt].label,
			style: {
				text: Presets.States[pt].label,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: Presets.States[pt].action,
							options: {
								mode: Presets.States[pt].actionValue,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: Presets.States[pt].feedback,
					options: {
						mode: Presets.States[pt].fbValue,
					},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}
	}

	for (let pt in Presets.Values) {
		let pst = {
			type: 'button',
			category: Presets.Values[pt].group,
			name: Presets.Values[pt].label,
			style: {
				text: Presets.Values[pt].label,
				size: Presets.Values[pt].size,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: Presets.Values[pt].action,
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		if (Presets.Values[pt].release !== null) {
			pst.steps[0].up = [
				{
					actionId: Presets.Values[pt].release,
				},
			]
		}

		presets[`values_${Presets.Values[pt].action}`] = pst
	}

	this.setPresetDefinitions(presets)
}
