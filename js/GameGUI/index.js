import React from 'react'
import { connect } from 'react-redux'

global.INTERSTITIAL_DEFAULT_WIDTH = 1334

import Preload from './Preload'
import Splash from './Splash'
import Ingame from './Ingame'

class GameGUI extends React.Component
{
    constructor(props)
    {
        super(props)
        global.INTERSTITIAL_SCALE = window.innerWidth / INTERSTITIAL_DEFAULT_WIDTH
    }

	render()
	{
        let GUI = null
        switch (this.props.gameState)
        {
            case 'SPLASH': GUI = Splash; break
            case 'INGAME': GUI = Ingame; break
            default: GUI = Preload
        }
        return (
            <object3D position={new THREE.Vector3(INTERSTITIAL_DEFAULT_WIDTH / 2,INTERSTITIAL_DEFAULT_HEIGHT / 2, 0)}>
                <GUI store={this.props.store} />
            </object3D>
        )
	}
}

function mapStateToProps(state)
{
    return {
        gameState: state.currentState
    }
}
export default connect(mapStateToProps)(GameGUI)
