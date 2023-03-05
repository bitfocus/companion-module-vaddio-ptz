/**
 * INTERNAL: initialize variables.
 *
 * @access protected
 * @since 1.0.0
 */
export function updateVariables() {
	let variables = []

	variables.push({ variableId: 'pan_speed', name: 'Pan Speed' })
	variables.push({ variableId: 'tilt_speed', name: 'Tilt Speed' })
	variables.push({ variableId: 'zoom_speed', name: 'Zoom Speed' })
	variables.push({ variableId: 'focus_speed', name: 'Focus Speed' })
	variables.push({ variableId: 'gain', name: 'Gain' })
	variables.push({ variableId: 'red_gain', name: 'Red Gain' })
	variables.push({ variableId: 'blue_gain', name: 'Blue Gain' })
	variables.push({ variableId: 'iris', name: 'Iris' })
	variables.push({ variableId: 'detail', name: 'Detail' })
	variables.push({ variableId: 'chroma', name: 'Chroma' })
	variables.push({ variableId: 'gamma', name: 'Gamma' })

	this.setVariableDefinitions(variables)

	this.setVariableValues({ pan_speed: this.panSpeed })
	this.setVariableValues({ tilt_speed: this.tiltSpeed })
	this.setVariableValues({ zoom_speed: this.zoomSpeed })
	this.setVariableValues({ focus_speed: this.focusSpeed })
	this.setVariableValues({ gain: this.state.gain })
	this.setVariableValues({ red_gain: this.state.red_gain })
	this.setVariableValues({ blue_gain: this.state.blue_gain })
	this.setVariableValues({ iris: this.state.iris })
	this.setVariableValues({ detail: this.state.detail })
	this.setVariableValues({ chroma: this.state.chroma })
	this.setVariableValues({ gamma: this.state.gamma })
}
