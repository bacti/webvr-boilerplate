export default function(state = null, action)
{
	switch (action.type)
	{
		case 'SWITCH_STATE': 
			return action.payload
	}
	return state
}