import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { CharacterSoldier } from "./CharacterSoldier";

export const CharacterController = ({
  state,
  joystick,
  //   the user identifier
  userPlayer,
  //the rest of the props
  ...props
}) => {
  //

  const group = useRef();
  const character = useRef();
  //
  // ** to move the character
  const rigidbody = useRef();
  const [animation, setAnimation] = useState("Idle");
  //
  //
  useFrame(() => {
    // update player position
    const angle = joystick.angle();
    if (joystick.isJoystickPressed() && angle) {
      setAnimation("Run");
      character.current.rotation.y = angle;
      //
      // move character in its own direction
      const impulse = {
        x: Math.sin(angle) * MOVEMENT_SPEED * delta,
        y: 0,
        z: Math.cos(angle) * MOVEMENT_SPEED * delta,
      };
    }
  });

  //
  //
  return (
    <group ref={group} {...props}>
      <RigidBody ref={rigidbody} colliders={false}>
        <group ref={character}>
          <CharacterSoldier
            // bring the props from the CharacterSoldier.jsx line 40
            color={state.state.profile?.color}
            animation={animation}
          />
        </group>
        {/* the CapsuleCollider  will wrap the actual character */}
        <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
      </RigidBody>
    </group>
  );
  //
};
