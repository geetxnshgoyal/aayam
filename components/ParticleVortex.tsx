'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

const PARTICLE_COUNT = 8000;

// Pre-generate stable positions outside the render cycle to ensure purity
const preGeneratedPositions = (() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = 10 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
        pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = r * Math.cos(theta);
    }
    return pos;
})();

const preGeneratedStructures = (() => {
    return Array.from({ length: 50 }, () => ({
        position: [(Math.random() - 0.5) * 80, -20, (Math.random() - 0.5) * 60] as [number, number, number],
        targetH: 5 + Math.random() * 25,
        w: 0.5 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#ff007b' : '#00f2ff'
    }));
})();

function ParticleSystem({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
    const ref = useRef<THREE.Points>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Particle group rotation reacts to mouse
        const targetRotY = t * 0.05 + mouse.current.x * 0.5;
        const targetRotX = mouse.current.y * 0.5;

        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.05);
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.05);

        // Breathing effect
        const s = 1 + Math.sin(t * 0.5) * 0.1;
        ref.current.scale.set(s, s, s);
    });

    return (
        <Points ref={ref} positions={preGeneratedPositions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff007b"
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.4}
            />
        </Points>
    );
}

interface StructureData {
    position: [number, number, number];
    targetH: number;
    w: number;
    color: string;
}

function Building({ b, mouse }: { b: StructureData, mouse: React.MutableRefObject<THREE.Vector2> }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null!);

    useFrame(() => {
        // Screen space mouse to world space approximation for interaction
        const mouseX = mouse.current.x * 25;
        const mouseY = mouse.current.y * 15;

        const dist = new THREE.Vector3(meshRef.current.position.x, meshRef.current.position.y, 0)
            .distanceTo(new THREE.Vector3(mouseX, mouseY, 0));

        // Reactive scale on proximity
        const scaleFactor = Math.max(1, 4.5 - dist * 0.25);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, b.targetH * scaleFactor, 0.1);

        // Reactive Tilt: Tilt the building towards the mouse
        const tiltX = (mouseY - meshRef.current.position.y) * 0.02;
        const tiltZ = -(mouseX - meshRef.current.position.x) * 0.02;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tiltX, 0.1);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, tiltZ, 0.1);

        // Ghostly opacity shift
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.1 + (scaleFactor - 1) * 0.4, 0.1);

        // Color shift on proximity
        if (scaleFactor > 1.5) {
            materialRef.current.color.set(b.color);
        } else {
            materialRef.current.color.set('#333333');
        }
    });

    return (
        <mesh ref={meshRef} position={b.position}>
            <boxGeometry args={[b.w, 1, b.w]} />
            <meshBasicMaterial
                ref={materialRef}
                color={b.color}
                wireframe
                transparent
                opacity={0.1}
            />
        </mesh>
    );
}

function CityGrid({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        // Global parallax tilt
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.15, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.1, 0.05);
    });

    return (
        <group ref={groupRef}>
            {preGeneratedStructures.map((s, i) => (
                <Building key={i} b={s} mouse={mouse} />
            ))}
        </group>
    );
}

function InteractiveHologram({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
    const ringGroup = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Move hologram to cursor position
        ringGroup.current.position.x = THREE.MathUtils.lerp(ringGroup.current.position.x, mouse.current.x * 28, 0.1);
        ringGroup.current.position.y = THREE.MathUtils.lerp(ringGroup.current.position.y, mouse.current.y * 18, 0.1);

        ringGroup.current.rotation.z = t * 1.5;
        ringGroup.current.rotation.x = t * 0.5;

        const pulse = 1 + Math.sin(t * 4) * 0.05;
        ringGroup.current.scale.setScalar(pulse);
    });

    return (
        <group ref={ringGroup}>
            <mesh>
                <torusGeometry args={[2.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#ff007b" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.2, 0.01, 16, 60]} />
                <meshBasicMaterial color="#00f2ff" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <ringGeometry args={[0, 0.1, 4]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

function Scene() {
    const mouse = useRef(new THREE.Vector2(0, 0));

    useFrame((state) => {
        // Track mouse from state for smoother access within the frame loop
        mouse.current.x = state.mouse.x;
        mouse.current.y = state.mouse.y;

        // Camera parallax shift
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 5, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 5, 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <color attach="background" args={['#010103']} />
            <fog attach="fog" args={['#010103', 20, 80]} />
            <ambientLight intensity={0.2} />

            <ParticleSystem mouse={mouse} />
            <CityGrid mouse={mouse} />
            <InteractiveHologram mouse={mouse} />

            <gridHelper
                args={[250, 60, '#120024', '#050508']}
                position={[0, -25, 0]}
            />
        </>
    );
}

export default function ParticleVortex() {
    return (
        <div className="fixed inset-0 z-0 bg-[#010103] overflow-hidden">
            {/* HUD Overlay / Scanlines */}
            <div className="absolute inset-0 z-[10] pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] transition-opacity duration-1000" />

            {/* Mouse Glow */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-30 blur-[150px] bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--horror-magenta)_0%,transparent_50%)]"
                id="vortex-glow"
            />

            <Canvas camera={{ position: [0, 5, 35], fov: 50 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>

            <script dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    const glow = document.getElementById('vortex-glow');
                    if (glow) {
                        glow.style.setProperty('--mouse-x', x + '%');
                        glow.style.setProperty('--mouse-y', y + '%');
                    }
                });
            `}} />
        </div>
    );
}
