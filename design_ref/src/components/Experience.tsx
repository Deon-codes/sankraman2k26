import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, useScroll, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// --- SHADERS ---

const particleVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uMouseX;
  uniform float uMouseY;
  uniform float uMorphProgress;
  
  attribute float aScale;
  attribute vec3 aTargetPosition;
  
  varying vec3 vColor;
  
  void main() {
    // Morph between random position and target logo position
    vec3 mixedPosition = mix(position, aTargetPosition, uMorphProgress);
    
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    
    // Mouse interaction
    float dist = distance(modelPosition.xy, vec2(uMouseX, uMouseY));
    float strength = 1.0 / (dist * 5.0 + 1.0);
    modelPosition.z += strength * 2.0;
    
    // Subtle movement
    modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 10.0) * 0.1 * (1.0 - uMorphProgress);
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
    
    vColor = mix(vec3(0.4, 0.6, 1.0), vec3(0.9, 0.9, 1.0), uMorphProgress);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);
    
    gl_FragColor = vec4(vColor, strength);
  }
`;

// --- COMPONENTS ---

function Particles() {
  const count = 3000;
  const meshRef = useRef<THREE.Points>(null);
  const { viewport, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [positions, targetPositions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Initial random positions
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Target positions (forming a "P" shape)
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 0.5;
      
      if (i < count * 0.6) {
        // The curve of the P
        const curveAngle = (Math.random() * Math.PI * 1.5) - Math.PI * 0.75;
        targetPositions[i * 3 + 0] = Math.cos(curveAngle) * 1.5 + 0.5;
        targetPositions[i * 3 + 1] = Math.sin(curveAngle) * 1.5 + 1.5;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      } else {
        // The stem of the P
        targetPositions[i * 3 + 0] = (Math.random() - 0.5) * 0.4 - 1.0;
        targetPositions[i * 3 + 1] = (Math.random() * 6) - 3;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }
      
      scales[i] = Math.random();
    }
    return [positions, targetPositions, scales];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 80 },
    uMouseX: { value: 0 },
    uMouseY: { value: 0 },
    uMorphProgress: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouseX.value = THREE.MathUtils.lerp(material.uniforms.uMouseX.value, mouse.current.x * 5, 0.1);
    material.uniforms.uMouseY.value = THREE.MathUtils.lerp(material.uniforms.uMouseY.value, mouse.current.y * 5, 0.1);
    
    // Morph progress based on scroll
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    // Morph into logo at the very beginning, then disperse
    const morph = Math.max(0, 1 - scroll * 4); 
    material.uniforms.uMorphProgress.value = THREE.MathUtils.lerp(material.uniforms.uMorphProgress.value, morph, 0.05);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aTargetPosition" count={count} array={targetPositions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        uniforms={uniforms}
      />
    </points>
  );
}

function NeuralNetwork() {
  const count = 40;
  const linesRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ));
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    // Only visible during Sankraman transition (around 0.4 to 0.7 scroll)
    const visibility = Math.max(0, 1 - Math.abs(scroll - 0.55) * 5);
    linesRef.current.visible = visibility > 0.1;
    linesRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line) {
        (child.material as THREE.LineBasicMaterial).opacity = visibility * 0.3;
      }
    });
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={linesRef}>
      {points.map((p, i) => {
        const neighbors = points.slice(i + 1).filter(other => p.distanceTo(other) < 4).slice(0, 2);
        return neighbors.map((n, j) => (
          <line key={`${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([p.x, p.y, p.z, n.x, n.y, n.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#6495ED" transparent opacity={0.2} />
          </line>
        ));
      })}
    </group>
  );
}

function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x = -Math.PI * 0.5;
    gridRef.current.position.y = -2;
    gridRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[40, 40, 0x6495ED, 0x191970]} />
    </group>
  );
}

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    if (cameraRef.current) {
      // Cinematic Camera Motion
      cameraRef.current.position.z = 5 + scroll * 12;
      cameraRef.current.position.y = Math.sin(scroll * Math.PI) * 2;
      cameraRef.current.rotation.x = -scroll * 0.3;
      cameraRef.current.rotation.y = Math.sin(scroll * 2) * 0.1;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scroll * 2;
    }

    // Dynamic Color Transition based on scroll
    // Challenges (Dark/Purple) -> Sankraman (Blue) -> Future (Cyan/White)
    const colorA = new THREE.Color("#1B003F"); // Night Indigo
    const colorB = new THREE.Color("#6495ED"); // Dusky Blue
    const colorC = new THREE.Color("#E6E6FA"); // Lavender Haze
    
    let targetColor;
    if (scroll < 0.5) {
      targetColor = colorA.clone().lerp(colorB, scroll * 2);
    } else {
      targetColor = colorB.clone().lerp(colorC, (scroll - 0.5) * 2);
    }
    
    state.scene.background = targetColor.multiplyScalar(0.1);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#6495ED" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#4B0082" />
      
      <group ref={groupRef}>
        <Particles />
        <NeuralNetwork />
        <HolographicGrid />
        
        {/* Floating Abstract Shapes */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[3, 2, -5]}>
            <MeshDistortMaterial
              color="#4B0082"
              speed={3}
              distort={0.4}
              radius={1}
            />
          </Sphere>
        </Float>

        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[-4, -1, -8]}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#6495ED" wireframe />
          </mesh>
        </Float>
      </group>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function Experience() {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  );
}
