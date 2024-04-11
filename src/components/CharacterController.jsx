import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { isHost } from "playroomkit";
import { useRef, useState } from "react";
import { CharacterSoldier } from "./CharacterSoldier";

//
//
const MOVEMENT_SPEED = 200;
//
//

export const CharacterController = ({
  // the state comes from the Experience.jsx comp
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
  // BY DEFAULT we have the IDLE animation, then when the character will move, the naim will change to RUN
  const [animation, setAnimation] = useState("Idle");
  //
  //
  useFrame((_, delta) => {
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
      //
      rigidbody.current.applyImpulse(impulse, true);

      //
    } else {
      //
      // set the anim to default if the user isn't using the joystick
      setAnimation("Idle");
      //
    }

    //
    // ** ---- pos
    // the isHost comes from "playroomkit";
    if (isHost()) {
      //
      state.setState("pos", rigidbody.current.translation());
      //
    } else {
      // if we are not the host, we will get the POS from the state
      const pos = state.getState("pos");
      // and if we find one we apply it to the rigid body
      if (pos) {
        rigidbody.current.setTranslation(pos);
      }
    }
    //
    // ---- pos
  });

  //
  //
  return (
    <group ref={group} {...props}>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        // will lower the friction
        linearDamping={20}
        // will stop the character rotation
        lockRotations
        // checking if I am the host
        // ** the isHost comes from "playroomkit";
        type={isHost() ? "dynamic" : "kinematicPosition"}
      >
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
