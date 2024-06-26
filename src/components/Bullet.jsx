import { RigidBody, vec3 } from "@react-three/rapier";
import { isHost } from "playroomkit";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";
import { WEAPON_OFFSET } from "./CharacterController";

//25 - after this , go back to the CharacterController
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

    //
    // 37 Audio (after adding it), now go to the Experience.jsx
    const audio = new Audio("/audios/rifle.mp3");
    //
    //
  }, []);

  //
  //
  return (
    <group
      // 20 connected to the angle within the Joystick, check line 87 CharacterController.jsx
      position={[position.x, position.y, position.z]}
      rotation-y={angle}
    >
      //27 Wrap the bullet RIGID - go back to the CharacterController.jsx and
      implement the CrossHair
      <group
        position-x={WEAPON_OFFSET.x}
        position-y={WEAPON_OFFSET.y}
        position-z={WEAPON_OFFSET.z}
      >
        <RigidBody
          //   21
          ref={rigidbody}
          // 30 to avoid the gravity on it
          gravityScale={0}
          // 32 add the logic when it hits SOMETHING
          onIntersectionEnter={(e) => {
            // only the Host has the permission for the rigidBody, and if the other items ISNT a bullet(because I dont have any relation with a bullet hitting another bullet(optional) )
            if (isHost() && e.other.rigidBody.userData?.type !== "bullet") {
              // then i will disable the gravity to prevent that
              rigidbody.current.setEnabled(false);
              // in other words, once a bullet do somthing its disabled
              // 33 call it, and pass the position of where it was hit
              onHit(vec3(rigidbody.current.translation()));
            }
          }}
          //  31 to prevent the impact when hitting  another player
          sensor
          //34 i also need to add some user data
          userData={{
            type: "bullet",
            //pass the player ID
            player,
            // the damage of the bullet is hardcoded, but if you decide to have multiple weapons here it can be based on that
            damage: 10,
          }}
          //35 install: npm i @react-three/postprocessing, once installed go to the App.js
        >
          //22
          <mesh position-z={0.25} material={bulletMaterial} castShadow>
            <boxGeometry args={[0.05, 0.05, 0.5]}></boxGeometry>
          </mesh>
        </RigidBody>
      </group>
    </group>
  );
};
