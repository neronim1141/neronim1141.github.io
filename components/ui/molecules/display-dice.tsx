import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { Dice } from "@/components/models/dice";

export function MovingDice() {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (group.current)
      group.current.rotation.x = group.current.rotation.y += 0.005;
  });
  return <Dice ref={group} />;
}

export const DisplayDice = () => {
  return (
    <div className="h-full">
      <Canvas camera={{ fov: 35, zoom: 1 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.9} penumbra={1} />
        <pointLight position={[-10, 10, -10]} />
        <MovingDice />
      </Canvas>
    </div>
  );
};
