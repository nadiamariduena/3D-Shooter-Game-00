import { RigidBody } from "@react-three/rapier";
import React from "react";

//15
const bulletMaterial = new MeshBasicMaterial({
  color: "hotpink",
  toneMapped: false,
});

// 16 multiplyScalar will handle the bloom effect by multiplying the pink 'color'
bulletMaterial.color.multiplyScalar(42);
//
//
export const Bullet = ({
  // 17
  player,
  angle,
  position,
  onHit,
}) => {
  //
  //
  //18
  const rigidbody = useRef();
  // 22
  //  We will apply the movement of our bullet
  // in other words the logic of the bullet has to match the angle of the char
  useEffect(() => {
    //
    const velocity = {
      x: Math.sin(angle) * BULLET_SPEED,
      // no shoot to the top, but you can change it if you want, just keep in mind you have to change it in line 96 on the CharacterController.jsx
      y: 0,
      z: Math.cos(angle) * BULLET_SPEED,
    };
  }, []);

  //
  //
  return (
    <group
      // 19 connected to the angle within the Joystick, check line 87 CharacterController.jsx
      position={[position.x, position.y, position.z]}
      rotation-y={angle}
    >
      <RigidBody
        //   20
        ref={rigidbody}
      >
        //21
        <mesh position-z={0.25} material={bulletMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]}></boxGeometry>
        </mesh>
      </RigidBody>
    </group>
  );
};
