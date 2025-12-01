import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.js'

extend({ OrbitControls })

export default function Experience()
{
    const {camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) =>
    {
        // console.log(state.camera)
        // console.log(state.clock.elapsedTime)
        // console.log('tick')

        //animation
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.sin(angle) * 8
        // state.camera.lookAt(0, 0, 0)

        cubeRef.current.rotation.y += delta
    })

    return <>
        <orbitControls args={ [ camera, gl.domElement ] } />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <group ref={ groupRef }>
            <mesh position-x={ - 2}>
                <sphereGeometry />
                <meshStandardMaterial color="#3eb9ff" />
            </mesh>
            
            <mesh ref={ cubeRef } rotation-y={Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
                {/* <sphereGeometry args={ [ 1.5, 32, 32 ] } /> */}
                {/* <meshBasicMaterial args={ [  { color: 'red', wireframe: true } ] } /> */}
                <boxGeometry scale={ 1.5 } />
                <meshStandardMaterial color="#e53eff" />
            </mesh>
        </group>

         <mesh position-y={ -1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="#B9FF3E" />
        </mesh>

        <CustomObject />
    </>
} 