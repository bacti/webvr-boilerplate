import { combineReducers } from 'redux'

const rootReducer = combineReducers(
{
	currentState: (state = null, action) =>
	{
		switch (action.type)
		{
			case 'MAIN_SCENE':
				return action.payload
		}
		return state
	},
})
export default rootReducer