import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'

import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router'

const ConnectedSwitch = connect(state => ({ location: state.location }))(Switch)

class ReactJasmine extends React.Component
{
    render()
    {
        return (
            <ConnectedSwitch>
                <Route exact path="/" component={() => (<h1>Home <Link to="/about">About</Link></h1>)} />
                <Route path="/about" component={() => (<h1>About <Link to="/">Home</Link></h1>)} />
            </ConnectedSwitch>
        )  
    }
}
export default connect(state => ({ location: state.location }))(ReactJasmine)