import { useEffect, useState } from "react";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Float } from "@react-three/drei";

gsap.registerPlugin(useGSAP);

const Geometry = ({ r, position, geometry, materials, soundEffects }) => {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const startingMaterial = gsap.utils.random(materials);

  const handleClick = (e) => {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = gsap.utils.random(materials);
  };

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useGSAP(() => {
    setVisible(true);
    gsap.from(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: "elastic.out(1,0.3)",
      delay: 0.3,
    });
  });

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
};

export function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // D20 shape
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // Soccer Ball
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 62), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshNormalMaterial({ wireframe: true }),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x049ef4 }),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      opacity: 0.6,
      transparent: true,
      roughness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2980b9,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  const soundEffects = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ];

  return geometries.map((shape) => (
    <Geometry
      key={JSON.stringify(shape.position)}
      position={shape.position.map((p) => p * 2)}
      geometry={shape.geometry}
      materials={materials}
      r={shape.r}
      soundEffects={soundEffects}
    />
  ));
}
