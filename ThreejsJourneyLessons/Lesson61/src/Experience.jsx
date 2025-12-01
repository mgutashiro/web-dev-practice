import { shaderMaterial, Sparkles, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    // const model = useGLTF('./model/portal.glb')
    const { nodes } = useGLTF('./model/portal.glb')
    // console.log(nodes.baked.geometry)

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false
    // console.log(bakedTexture)

    const portalMaterial=useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={ [ '#000000' ] }  attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={ nodes.baked.geometry }>
                <meshBasicMaterial map={ bakedTexture } />
                <mesh geometry={ nodes.poleLightA.geometry } position={ nodes.poleLightA.position }>
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>
                <mesh geometry={ nodes.poleLightB.geometry } position={ nodes.poleLightB.position }>
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>
            </mesh>
            <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position } rotation={ nodes.portalLight.rotation }>
                {/* <meshBasicMaterial color="#ffffff" /> */}
                <portalMaterial ref={ portalMaterial } />
            </mesh>
            <Sparkles
                size={ 6 }
                scale={ [ 4, 2, 4 ] }
                position-y={ 1 }
                speed={ 0.2 }
                count={ 40 }
            />
        </Center>

    </>
}