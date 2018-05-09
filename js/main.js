require('./zepto')
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import WebVR from './WebVR'
import RollerCoaster from './RollerCoaster'
import Controls from './Controls'

class App extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let canvas = document.getElementById('mainCanvas')
        let store = applyMiddleware()(createStore)(reducers)
        return (
            <div>
                <WebVR canvas={canvas} />
                <Provider store={store}>
                    <RollerCoaster store={store} canvas={canvas} />
                </Provider>
            </div>
        )

        // return (
        //     <div>
        //         <WebVR canvas={canvas} />
        //         <Controls canvas={canvas} />
        //     </div>
        // )
    }
}

window.onload = function()
{
    $('<div></div>').attr('id', 'sceneContainer').css({ width: '100%', height: '100%' }).appendTo(document.body)
    $('<canvas></canvas>').attr({ id: 'mainCanvas' }).appendTo(document.body)

    ReactDOM.render(<App />, document.getElementById('sceneContainer'))
}
