import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { isHost } from "playroomkit";
import { useRef, useState } from "react";
import { CharacterSoldier } from "./CharacterSoldier";

//
//
const MOVEMENT_SPEED = 200;
// 7
const FIRE_RATE = 380;
//
// 26 to solve the bullet not being centered to the char
// i will use this to move the default pos of the bullet, now go back to the Bullet.jsx
export const WEAPON_OFFSET = {
  x: -0.2,
  y: 1.4,
  z: 0.8,
};

export const CharacterController = ({
  // the state comes from the Experience.jsx comp
  state,
  joystick,
  //   the user identifier
  userPlayer,
  // 8 after this, add a reference to know when was the last time we fired
  onFire,
  //
  //the rest of the props
  ...props
}) => {
  //

  const group = useRef();
  const character = useRef();

  //
  //
  // ** to move the character
  const rigidbody = useRef();
  // BY DEFAULT we have the IDLE animation, then when the character will move, the naim will change to RUN
  //
  //
  // camera will follow the character
  const controls = useRef();
  // 9 ref to know when was the last time we fired, after this go to the Experience.jsx
  const lastShoot = useRef(0);

  //
  //
  const [animation, setAnimation] = useState("Idle");
  //
  //
  useFrame((_, delta) => {
    //
    //------ camera controls
    /*
    16 : 20 etc ...
    In the context of a 3D graphics application, these values could represent units of measurement such as meters or feet, depending on the scale of the scene. For example, if the scene is modeled to represent real-world dimensions

    */
    if (controls.current) {
      // ** 1 ---- mob
      const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20; //  If the width of the window (window.innerWidth) is less than 1024 pixels, then cameraDistanceY will be set to 16, otherwise, it will be set to 20.
      // ** 2 --- mob
      const cameraDistanceZ = window.innerWidth < 1024 ? 12 : 16; // If the width of the window (window.innerWidth) is less than 1024 pixels, then cameraDistanceZ will be set to 12, otherwise, it will be set to 16.
      //
      // ** 3 ---
      // VEC3 is a method from @react-three/rapier TO CONVERT it from rapier to physics to threejs
      const playerWorldPos = vec3(rigidbody.current.translation());

      //  ** 4
      // using the setLookAt method,  to define where our camera is
      controls.current.setLookAt(
        playerWorldPos.x,
        playerWorldPos.y + (state.state.dead ? 12 : cameraDistanceY),
        playerWorldPos.z + (state.state.dead ? 2 : cameraDistanceZ),
        //
        // to look at the character POS
        playerWorldPos.x,
        playerWorldPos.y + 1.5,
        playerWorldPos.z,
        //
        true
      );
    }

    //------ camera controls
    //
    // update player position
    const angle = joystick.angle();
    //
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
    // ---- pos

    //
    //
    //** 🚀 Check if fire button is pressed
    if (joystick.isPressed("fire")) {
      // 1 if it's pressed, then set the idle_shoot anim
      setAnimation("Idle_Shoot");
      //2 only if its the "host" he will be able to do use the physics logic
      if (isHost()) {
        // 3 check the date of the last fire, so that we can shoot like 100 bullets  at the same time
        //
        if (Date.now() - lastShoot.current > FIRE_RATE) {
          // 4 then we define the last Shoot date (you have to create a new ref for that)
          lastShoot.current = Date.now();
          //
          //
          // 5 then we create a NEW bullet
          // we add an ID, so that we will be able to map it and avoid RENDER issues
          //
          const newBullet = {
            id: state.id + "-" + +new Date(),
            position: vec3(rigidbody.current.translation()),
            angle,
            // save whos player is firing (later we will be able to count the score and know "who" killed who)
            player: state.id,
          };
          // 6 call the "onFire" method, so to add the BULLET to the list of bullets, after this define the FIRE rate on zop of this comp
          onFire(newBullet);
        }
      }
      //
    }

    //
    //
  });

  //
  //
  return (
    <group ref={group} {...props}>
      {/*  NEW CAMERA */}

      {userPlayer && <CameraControls ref={controls} />}

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
          // crosshair 29, after this go to the BUllets.jsx
          {userPlayer && (
            <Crosshair
              // to set them at the right pos
              position={[WEAPON_OFFSET.x, WEAPON_OFFSET.y, WEAPON_OFFSET.z]}
            />
          )}
          //
        </group>
        {/* the CapsuleCollider  will wrap the actual character */}
        <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
      </RigidBody>
    </group>
  );
  //
};

//
// 28
const Crosshair = (props) => {
  //this will create a line of small boxes that will help you to see the direction of the shooting
  return (
    <group {...props}>
      <mesh position-z={1}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.9} />
      </mesh>
      <mesh position-z={2}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.85} />
      </mesh>
      <mesh position-z={3}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.8} />
      </mesh>

      <mesh position-z={4.5}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" opacity={0.7} transparent />
      </mesh>

      <mesh position-z={6.5}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" opacity={0.6} transparent />
      </mesh>

      <mesh position-z={9}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};
