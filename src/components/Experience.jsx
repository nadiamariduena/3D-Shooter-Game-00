import { Environment, OrbitControls } from "@react-three/drei";
import { insertCoin, Joystick, myPlayer, onPlayerJoin } from "playroomkit";
import { useEffect, useState } from "react";
import { Bullet } from "./Bullet";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";

export const Experience = () => {
  //
  // ** Players
  const [players, setPlayers] = useState([]);
  //
  // ** Bullets
  // 11 by default it s empty
  const [bullets, setBullets] = useState([]);
  //  12
  const onFire = (bullet) => {
    // Setting the bullets to the previous bullets array with the new one. after this you will render the bullets, scroll down to step 13
    setBullets((bullets) => [...bullets, bullet]);
  };
  //
  // 15
  const onHit = (bulletId) => {
    // we will set the bullet to the previous array of bullets, filtered with the one that has been hit, so it will make it disappear from our array.
    setBullets((bullets) => bullets.filter((b) => b.id !== bulletId));
    // after this create the comp  Bullet
  };
  //
  //
  // ** LOG ROOM/session ----
  const start = async () => {
    await insertCoin();
  };

  useEffect(() => {
    start();
    // ** Players handler
    onPlayerJoin((state) => {
      //------------
      // 🟠 The JOYSTICK, it replaces the arrows or the keys to move the player
      // once you enter on the link, you will have some examples, click on the "launch", to test it
      // https://docs.joinplayroom.com/components/joystick
      //------------
      //
      // this will handle the player that is joining
      // *
      // Joystick will only create UI for current player (myPlayer). (We need to create a joystick for each player. Its sync through the network so each client will have access to the joystick of all the other, but it will only create an UI for the current player)
      // *
      // For others, it will only sync their state

      const joystick = new Joystick(state, {
        //Use type: ANGULAR to rotate at 360deg
        type: "angular",
        // to shoot
        buttons: [{ id: "fire", label: "fire" }],
      });
      // copy the above and use it for the new player (the state & joystick carries it)
      const newPlayer = { state, joystick };
      state.setState("health", 100);
      state.setState("deaths", 0);
      state.setState("kills", 0);
      // ** Adding the new player to the existing array of players
      setPlayers((players) => [...players, newPlayer]);
      //* when the user quits the session */
      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id));
      });
    });
    //
    //
  }, []);
  //
  //
  //
  //
  return (
    <>
      <directionalLight
        position={[25, 18, -25]}
        intensity={0.3}
        castShadow
        shadow-camera-near={0}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0001}
      />

      {/*   <OrbitControls /> */}

      <Map />

      {players.map(({ state, joystick }, idx) => (
        <CharacterController
          key={state.id}
          // the below is temporary
          position-x={idx * 2}
          //
          state={state}
          joystick={joystick}
          userPlayer={state.id === myPlayer()?.id}
          //
          // 10 after this, create the list of bullets at the top of this comp
          onFire={onFire}
        />
      ))}

      {/* 13 render de fire*/}
      {bullets.map((bullet) => (
        <Bullet
          //we haven created the Bullet component yet
          key={bullet.id}
          {...bullet}
          //
          //14 to know when we will make the bullet disappear
          onHit={() => onHit(bullet.id)}
        />
      ))}
      <Environment preset="sunset" />
    </>
  );
};
