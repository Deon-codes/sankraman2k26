'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// ─── Shaders for the energy vortex particles ───

const vortexVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uScrollProgress;
  uniform float uMouseX;
  uniform float uMouseY;

  attribute float aScale;
  attribute float aAngleOffset;
  attribute float aRadius;
  attribute float aHeight;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    // Vortex spiral motion
    float speed = 0.4 + aScale * 0.3;
    float angle = aAngleOffset + uTime * speed + uScrollProgress * 3.14159;
    float r = aRadius * (1.0 + sin(uTime * 0.5 + aAngleOffset) * 0.1);
    
    // Convergence toward center based on scroll
    float convergeFactor = mix(1.0, 0.02, uScrollProgress * 0.5);
    float currentR = r * convergeFactor;
    
    float x = cos(angle) * currentR;
    float z = sin(angle) * currentR;
    float y = aHeight + sin(uTime * 0.8 + aAngleOffset * 2.0) * 0.3;
    
    // Mouse interaction ripple
    float distFromCenter = length(vec2(x, z));
    float mouseInfluence = 1.0 / (distFromCenter * 2.0 + 1.0);
    y += sin(uTime * 2.0 + distFromCenter * 3.0) * mouseInfluence * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(x, y, z, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    float sizeAttenuation = 1.0 / -mvPosition.z;
    gl_PointSize = uSize * aScale * uPixelRatio * sizeAttenuation * 120.0;

    vColor = aColor;
    // Fade outer particles
    vOpacity = mix(0.08, 0.35, 1.0 - (r / 8.0));
  }
`;

const vortexFragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    strength = pow(strength, 5.0);
    if (strength < 0.01) discard;
    gl_FragColor = vec4(vColor, strength * vOpacity);
  }
`;

// ─── Shader for the central energy core ───

const coreVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    // Subtle pulsing distort
    pos += normal * sin(uTime * 2.0 + position.y * 4.0) * 0.04;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const coreFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Fresnel glow effect
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    
    vec3 cyanColor  = vec3(0.0, 0.898, 1.0);
    vec3 purpleColor = vec3(0.482, 0.184, 0.745);
    vec3 blueColor  = vec3(0.118, 0.565, 1.0);

    float t = sin(uTime * 0.5 + vUv.y * 6.28) * 0.5 + 0.5;
    vec3 color = mix(cyanColor, purpleColor, t);
    color = mix(color, blueColor, sin(uTime * 0.3) * 0.5 + 0.5);

    float alpha = fresnel * 0.3 + 0.02;
    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── VortexParticles ───

function VortexParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 3500;

  const [positions, angles, radii, heights, scales, colors] = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const angles = new Float32Array(COUNT);
    const radii = new Float32Array(COUNT);
    const heights = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    // Color palette: cyan, purple, blue, white
    const palette = [
      [0.0, 0.898, 1.0],   // cyan
      [0.482, 0.184, 0.745], // purple
      [0.118, 0.565, 1.0],  // blue
      [0.7, 0.5, 1.0],      // lavender
      [1.0, 1.0, 1.0],      // white
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      angles[i] = Math.random() * Math.PI * 2;
      // Distribute: dense core, sparse outer
      radii[i] = Math.pow(Math.random(), 0.6) * 7.5;
      heights[i] = (Math.random() - 0.5) * 6;
      scales[i] = 0.3 + Math.random() * 0.7;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];
    }
    return [positions, angles, radii, heights, scales, colors];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
    uSize: { value: 0.5 },
    uScrollProgress: { value: 0 },
    uMouseX: { value: 0 },
    uMouseY: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    const scroll = typeof window !== 'undefined'
      ? window.scrollY / (Math.max(document.body.scrollHeight - window.innerHeight, 1))
      : 0;
    mat.uniforms.uScrollProgress.value = THREE.MathUtils.lerp(mat.uniforms.uScrollProgress.value, scroll, 0.05);

    // Slow group rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aAngleOffset', new THREE.BufferAttribute(angles, 1));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));
    geo.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, angles, radii, heights, scales, colors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vortexVertexShader}
        fragmentShader={vortexFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── EnergyCore (glowing central orb) ───

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    // Breathing pulse
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <shaderMaterial
        vertexShader={coreVertexShader}
        fragmentShader={coreFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── NeuralNetLines ───

function NeuralNet() {
  const groupRef = useRef<THREE.Group>(null);

  const lineMeshes = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 5;
      nodes.push(new THREE.Vector3(
        Math.cos(angle) * r,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * r
      ));
    }
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        if (a.distanceTo(b) < 3.5) pairs.push([a, b]);
      });
    });

    const colors = ['#00E5FF', '#7B2FBE', '#1E90FF'];
    return pairs.map(([a, b], i) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]), 3
      ));
      const mat = new THREE.LineBasicMaterial({
        color: colors[i % 3],
        transparent: true,
        opacity: 0.15,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    const scroll = typeof window !== 'undefined'
      ? window.scrollY / (Math.max(document.body.scrollHeight - window.innerHeight, 1))
      : 0;
    const vis = Math.max(0.03, 0.35 - scroll * 0.5);
    groupRef.current.children.forEach((c) => {
      ((c as THREE.Line).material as THREE.LineBasicMaterial).opacity = vis;
    });
  });

  return (
    <group ref={groupRef}>
      {lineMeshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}

// ─── HolographicRings ───

function HolographicRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  const rings = [
    { r: 1.8, tube: 0.008, color: '#00E5FF', opacity: 0.15 },
    { r: 2.8, tube: 0.006, color: '#7B2FBE', opacity: 0.12 },
    { r: 4.0, tube: 0.004, color: '#1E90FF', opacity: 0.08 },
  ];

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI * 0.5 + i * 0.15, 0, i * 0.3]}>
          <torusGeometry args={[ring.r, ring.tube, 8, 160]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Camera Controller ───

function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const scroll = typeof window !== 'undefined'
      ? window.scrollY / (Math.max(document.body.scrollHeight - window.innerHeight, 1))
      : 0;

    // Cinematic scroll-driven camera
    const targetZ = 6 + scroll * 8;
    const targetY = Math.sin(scroll * Math.PI) * 2;
    const targetRotX = -scroll * 0.25;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.5, 0.04);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.04);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouseRef.current.x * -0.05, 0.04);
  });

  return null;
}

// ─── Scene ───

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={70} />
      <CameraController />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#00E5FF" />
      <pointLight position={[5, 3, -5]} intensity={0.2} color="#7B2FBE" />
      <pointLight position={[-5, -2, 3]} intensity={0.15} color="#1E90FF" />

      <VortexParticles />
      <EnergyCore />
      <NeuralNet />
      <HolographicRings />

      <Stars radius={120} depth={80} count={3000} factor={2} saturation={0} fade speed={0.5} />
    </>
  );
}

// ─── Export ───

export default function Experience() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
