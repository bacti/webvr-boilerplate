import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from 'resource-loader'
import Jasmine from '../../libs/jasmine/'
import Actions from '../actions/'

class Preload extends React.Component
{
    constructor(props)
    {
        super(props)
        resource.load_buffer(resource.get_embed_src('data/all1.bsprite'), response =>
        {
            new Jasmine.Loader(response, pixma =>
            {
                let images = pixma.images
                images.push(...
                [
                    'image/vr-icon.png',
                    'image/crate.png',
                    'image/loading_wheel.png',
                ])
                
                let textureLoader = new Loader()
                images.forEach(imageUrl => {
                    textureLoader.add(imageUrl, resource.get_embed_src(`data/${imageUrl}`), { loadType: Loader.Resource.LOAD_TYPE.XHR });
                })
                textureLoader.load((loader, resources) =>
                {
                    // setTimeout(_ => this.props.SwitchState('SPLASH'), 2000)
                })
            })
        })
    }

	render()
	{
		return (
            <sprite ref='sprite' scale={new THREE.Vector3(64, 64, 1)}>
                <spriteMaterial>
                    <texture url={resource.get_embed_src('data/image/loading_wheel.png')} />
                </spriteMaterial>
            </sprite>
        )
	}
}

let mapStateToProps = state =>
{
    return {}
}

let mapDispatchToProps = dispatch =>
{
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload)