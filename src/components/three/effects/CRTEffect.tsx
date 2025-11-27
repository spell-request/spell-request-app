import { forwardRef, useMemo } from 'react';
import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const CRTShaderFragment = `
  uniform float time;
  uniform float scanlineIntensity;
  uniform float vignetteIntensity;
  uniform float curvature;
  uniform float flickerIntensity;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Screen curvature
    vec2 curvedUV = uv * 2.0 - 1.0;
    vec2 offset = curvedUV.yx * curvature;
    curvedUV += curvedUV * offset * offset;
    curvedUV = curvedUV * 0.5 + 0.5;

    // Bounds check - black outside screen
    if (curvedUV.x < 0.0 || curvedUV.x > 1.0 || curvedUV.y < 0.0 || curvedUV.y > 1.0) {
      outputColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    vec4 color = texture2D(inputBuffer, curvedUV);

    // Scanlines effect
    float scanline = sin(curvedUV.y * 800.0 + time * 10.0) * scanlineIntensity;
    color.rgb -= scanline;

    // Horizontal scanline bars
    float bars = sin(curvedUV.y * 400.0) * 0.02;
    color.rgb -= bars;

    // Vignette effect
    float vignette = curvedUV.x * curvedUV.y * (1.0 - curvedUV.x) * (1.0 - curvedUV.y);
    vignette = clamp(pow(vignette * 16.0, vignetteIntensity), 0.0, 1.0);
    color.rgb *= vignette;

    // Green phosphor tint - enhance green channel
    color.r *= 0.3;
    color.g *= 1.0;
    color.b *= 0.4;

    // Subtle flicker effect
    color.rgb *= 0.97 + flickerIntensity * sin(time * 60.0);

    // Add subtle noise
    float noise = fract(sin(dot(curvedUV.xy + time * 0.001, vec2(12.9898, 78.233))) * 43758.5453);
    color.rgb += noise * 0.01;

    outputColor = color;
  }
`;

class CRTEffectImpl extends Effect {
  constructor({
    scanlineIntensity = 0.05,
    vignetteIntensity = 0.3,
    curvature = 0.03,
    flickerIntensity = 0.02,
  } = {}) {
    super('CRTEffect', CRTShaderFragment, {
      uniforms: new Map<string, Uniform>([
        ['time', new Uniform(0)],
        ['scanlineIntensity', new Uniform(scanlineIntensity)],
        ['vignetteIntensity', new Uniform(vignetteIntensity)],
        ['curvature', new Uniform(curvature)],
        ['flickerIntensity', new Uniform(flickerIntensity)],
      ]),
    });
  }

  update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number): void {
    const timeUniform = this.uniforms.get('time');
    if (timeUniform) {
      timeUniform.value += deltaTime;
    }
  }
}

interface CRTEffectProps {
  scanlineIntensity?: number;
  vignetteIntensity?: number;
  curvature?: number;
  flickerIntensity?: number;
}

export const CRTEffect = forwardRef<CRTEffectImpl, CRTEffectProps>(
  function CRTEffect(props, ref) {
    const effect = useMemo(
      () => new CRTEffectImpl(props),
      [props]
    );

    // Forward the ref
    if (typeof ref === 'function') {
      ref(effect);
    } else if (ref) {
      ref.current = effect;
    }

    return <primitive object={effect} dispose={null} />;
  }
);
