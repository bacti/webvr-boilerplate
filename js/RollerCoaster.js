import React from 'react'
import React3 from '../libs/react-three-renderer/src'

export default class RollerCoaster extends React.Component
{
    constructor(props, context)
    {
        super(props, context)

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.
        this.cameraPosition = new THREE.Vector3(0, 0, 5)
  
        this.state =
        {
            cubeRotation: new THREE.Euler(),
        }

        this.OnAnimate = _ =>
        {
            this.setState(
            {
                cubeRotation: new THREE.Euler(
                    this.state.cubeRotation.x + 0.1,
                    this.state.cubeRotation.y + 0.1,
                    0
                ),
            })
        }
    }
  
    render()
    {
        const width = window.innerWidth
        const height = window.innerHeight
  
        return (
            <React3
                canvas={this.props.canvas}
                mainCamera='perspective'
                width={width}
                height={height}
                onAnimate={this.OnAnimate}
            >
                <scene>
                    <perspectiveCamera
                        name='perspective'
                        fov={75}
                        aspect={width / height}
                        near={0.1}
                        far={1000}
                        position={this.cameraPosition}
                    />
                    <mesh rotation={this.state.cubeRotation}>
                        <boxGeometry
                            width={1}
                            height={1}
                            depth={1}
                        />
                        <meshBasicMaterial color={0x00ff00} />
                    </mesh>
                </scene>
            </React3>
        )
    }
}