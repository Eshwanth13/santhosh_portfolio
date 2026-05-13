import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const HologramMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#00f0ff'),
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;

    void main() {
      // Scan lines
      float scanLine = sin(vPosition.y * 50.0 - uTime * 5.0) * 0.5 + 0.5;
      scanLine = pow(scanLine, 2.0);

      // Edge glow (Fresnel-like)
      float edgeGlow = 1.0 - dot(vec3(0, 0, 1), normalize(vPosition));
      edgeGlow = pow(edgeGlow, 3.0);

      // Flicker effect
      float flicker = sin(uTime * 20.0) * 0.05 + 0.95;

      float alpha = (scanLine * 0.3 + edgeGlow * 0.7) * uOpacity * flicker;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ HologramMaterial });

// Type definitions for JSX
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        hologramMaterial: any;
      }
    }
  }
}

export default HologramMaterial;
