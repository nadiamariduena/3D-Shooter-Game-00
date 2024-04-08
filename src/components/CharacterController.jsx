import { useRef } from "react";
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
  //
  return (
    <group ref={group}>
      <group ref={character}>
        <CharacterSoldier />
      </group>
    </group>
  );
  //
};
