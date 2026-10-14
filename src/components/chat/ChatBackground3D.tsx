import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import type { Theme } from '../../hooks/useTheme'
import type { Group } from 'three'

interface SceneProps {
  isDark: boolean
}

function Scene({ isDark }: SceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y += delta * 0.12
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
  })

  const primary = isDark ? '#2db742' : '#34c759'
  const secondary = isDark ? '#5eead4' : '#86efac'
  const accent = isDark ? '#4ade80' : '#22c55e'

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
        <Sphere args={[0.85, 32, 32]} position={[-1.4, 0.6, -0.5]}>
          <MeshDistortMaterial
            color={primary}
            transparent
            opacity={isDark ? 0.35 : 0.28}
            roughness={0.25}
            metalness={0.55}
            distort={0.35}
            speed={1.8}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[0.55, 28, 28]} position={[1.5, -0.4, 0.2]}>
          <MeshDistortMaterial
            color={secondary}
            transparent
            opacity={isDark ? 0.3 : 0.22}
            roughness={0.2}
            metalness={0.65}
            distort={0.45}
            speed={2.2}
          />
        </Sphere>
      </Float>
      <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.45}>
        <Sphere args={[0.38, 24, 24]} position={[0.2, 1.1, -0.8]}>
          <MeshDistortMaterial
            color={accent}
            transparent
            opacity={isDark ? 0.4 : 0.3}
            roughness={0.15}
            metalness={0.7}
            distort={0.3}
            speed={1.5}
          />
        </Sphere>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.55}>
        <mesh position={[-0.5, -1, 0]} rotation={[0.6, 0.4, 0.2]}>
          <torusKnotGeometry args={[0.42, 0.12, 96, 16]} />
          <meshStandardMaterial
            color={primary}
            transparent
            opacity={isDark ? 0.22 : 0.18}
            roughness={0.3}
            metalness={0.6}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

interface ChatBackground3DProps {
  theme: Theme
}

export function ChatBackground3D({ theme }: ChatBackground3DProps) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (reduceMotion) {
    return (
      <div
        className={`chat-messages__bg chat-messages__bg--static chat-messages__bg--${theme}`}
        aria-hidden
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <div className="chat-messages__bg" aria-hidden>
      <Canvas
        className="chat-messages__canvas"
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={isDark ? 0.55 : 0.75} />
        <directionalLight position={[3, 4, 2]} intensity={isDark ? 0.9 : 1.1} />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#86efac" />
        <Suspense fallback={null}>
          <Scene isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
