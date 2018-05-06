import React from 'react'

export default class RollerCoasterShadow extends React.Component
{
    constructor(props)
    {
		super(props)
		this.InitGeometry(props.curve, 500)
    }

    componentDidMount()
    {
        this.refs.mesh.position.y = 0.1
    }

    render()
    {
		return (
            <mesh ref='mesh'>
                <bufferGeometry
                    position={new THREE.BufferAttribute( new Float32Array( this.vertices ), 3 )}
                />
                <meshBasicMaterial color={0x305000} depthWrite={false} transparent={true} />
            </mesh>
		)
    }
    
    InitGeometry(curve, divisions)
    {
        this.vertices = [];

        var up = new THREE.Vector3( 0, 1, 0 );
        var forward = new THREE.Vector3();

        var quaternion = new THREE.Quaternion();
        var prevQuaternion = new THREE.Quaternion();
        prevQuaternion.setFromAxisAngle( up , Math.PI / 2 );

        var point = new THREE.Vector3();

        var prevPoint = new THREE.Vector3();
        prevPoint.copy( curve.getPointAt( 0 ) );
        prevPoint.y = 0;

        var vector1 = new THREE.Vector3();
        var vector2 = new THREE.Vector3();
        var vector3 = new THREE.Vector3();
        var vector4 = new THREE.Vector3();

        for (var i = 1; i <= divisions; i ++)
        {
            point.copy( curve.getPointAt( i / divisions ) );
            point.y = 0;

            forward.subVectors( point, prevPoint );

            var angle = Math.atan2( forward.x, forward.z );

            quaternion.setFromAxisAngle( up, angle );

            vector1.set( -0.3, 0, 0 );
            vector1.applyQuaternion( quaternion );
            vector1.add( point );

            vector2.set(  0.3, 0, 0 );
            vector2.applyQuaternion( quaternion );
            vector2.add( point );

            vector3.set(  0.3, 0, 0 );
            vector3.applyQuaternion( prevQuaternion );
            vector3.add( prevPoint );

            vector4.set( -0.3, 0, 0 );
            vector4.applyQuaternion( prevQuaternion );
            vector4.add( prevPoint );

            this.vertices.push( vector1.x, vector1.y, vector1.z );
            this.vertices.push( vector2.x, vector2.y, vector2.z );
            this.vertices.push( vector4.x, vector4.y, vector4.z );

            this.vertices.push( vector2.x, vector2.y, vector2.z );
            this.vertices.push( vector3.x, vector3.y, vector3.z );
            this.vertices.push( vector4.x, vector4.y, vector4.z );

            prevPoint.copy( point );
            prevQuaternion.copy( quaternion );
        }
    }
}