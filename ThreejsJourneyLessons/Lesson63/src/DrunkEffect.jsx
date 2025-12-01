import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'


const fragmentShader = /* glsl */`
    uniform float frequency;
    uniform float amplitude;
    uniform float time;

    void mainUv(inout vec2 uv)
    {
        // uv.y += sin(uv.x * 10.0) * 0.1;
        uv.y += sin(uv.x * frequency + time) * amplitude;
    }
    
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        // outputColor = vec4(uv, 1.0, 1.0);
        // outputColor = inputColor;
        // vec4 color = inputColor;
        // color.rgb *= vec3(0.8, 1.0, 0.5);
        // outputColor = color;

        outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    }
`

export default class DrunkEffect extends Effect
{
    constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN })
    {
        // console.log(props)
        // console.log(frequency, amplitude)
        // console.log(blendFunction)

        super(
            'DrunkEffect',
            fragmentShader,
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    [ 'frequency', new Uniform(frequency) ],
                    [ 'amplitude', new Uniform(amplitude) ],
                    [ 'time', new Uniform(0) ]
                ])
            }
        )
        // console.log(props)
    }
    update(renderer, inputBuffer, deltaTime)
    {
        this.uniforms.get('time').value += deltaTime
    }
}