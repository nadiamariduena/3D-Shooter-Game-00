import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";

//25
const BULLET_SPEED = 20;
//  AFTER defining the bullet speed , go back to the Experience.jsx and import the BUllet

//
//
//16
const bulletMaterial = new MeshBasicMaterial({
  color: "hotpink",
  toneMapped: false,
});

// 17 multiplyScalar will handle the bloom effect by multiplying the pink 'color' from line 13
bulletMaterial.color.multiplyScalar(42);
//
//
export const Bullet = ({
  // 18
  player,
  angle,
  position,
  onHit,
}) => {
  //
  //
  //19
  const rigidbody = useRef();
  // 23
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
    // 24
    //Defining the linear velocity because its a fixed speed for the bullet, after this go to the top and define the Bullet speed.
    rigidbody.current.setLinvel(velocity, true);
    //SETLINVEL: https://rapier.rs/docs/user_guides/javascript/rigid_bodies/
  }, []);

  //
  //
  return (
    <group
      // 20 connected to the angle within the Joystick, check line 87 CharacterController.jsx
      position={[position.x, position.y, position.z]}
      rotation-y={angle}
    >
      <RigidBody
        //   21
        ref={rigidbody}
      >
        //22
        <mesh position-z={0.25} material={bulletMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]}></boxGeometry>
        </mesh>
      </RigidBody>
    </group>
  );
};
