/**
 * INTERNAL: initialize variables.
 *
 * @access protected
 * @since 1.0.0
 */
export function updateVariables() {
	this.setVariableDefinitions([
		{ variableId: 'pan_speed', name: 'Pan Speed' },
		{ variableId: 'tilt_speed', name: 'Tilt Speed' },
		{ variableId: 'zoom_speed', name: 'Zoom Speed' },
		{ variableId: 'focus_speed', name: 'Focus Speed' },
		{ variableId: 'gain', name: 'Gain' },
		{ variableId: 'red_gain', name: 'Red Gain' },
		{ variableId: 'blue_gain', name: 'Blue Gain' },
		{ variableId: 'iris', name: 'Iris' },
		{ variableId: 'detail', name: 'Detail' },
		{ variableId: 'chroma', name: 'Chroma' },
		{ variableId: 'gamma', name: 'Gamma' },
	])

	this.setVariableValues({
		pan_speed: this.panSpeed,
		tilt_speed: this.tiltSpeed,
		zoom_speed: this.zoomSpeed,
		focus_speed: this.focusSpeed,
		gain: this.state.gain,
		red_gain: this.state.red_gain,
		blue_gain: this.state.blue_gain,
		iris: this.state.iris,
		detail: this.state.detail,
		chroma: this.state.chroma,
		gamma: this.state.gamma,
	})
}
