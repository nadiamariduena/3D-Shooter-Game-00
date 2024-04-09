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
  const [animation, setAnimation] = useState("Idle");
  //
  //
  return (
    <group ref={group} {...props}>
      <RigidBody colliders={false}>
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
