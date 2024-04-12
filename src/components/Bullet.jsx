import { RigidBody } from "@react-three/rapier";
import React from "react";

const bulletMaterial = new MeshBasicMaterial({
  color: "hotpink",
  toneMapped: false,
});

// multiplyScalar will handle the bloom effect by multiplying the pink 'color'
bulletMaterial.color.multiplyScalar(42);
//
//
export const Bullet = ({ player, angle, position, onHit }) => {
  return (
    <group position={[position.x, position.y, position.z]} rotation-y={angle}>
      <RigidBody>
        <mesh position-z={0.25} material={bulletMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]}></boxGeometry>
        </mesh>
      </RigidBody>
    </group>
  );
};
