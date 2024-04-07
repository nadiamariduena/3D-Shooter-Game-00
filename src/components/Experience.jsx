import { Environment, OrbitControls } from "@react-three/drei";
import { insertCoin, Joystick, onPlayerJoin } from "playroomkit";
import { useEffect, useState } from "react";
import { Map } from "./Map";

export const Experience = () => {
  //
  // ** Players
  const [players, setPlayers] = useState([]);
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
      // The JOYSTICK, it replaces the arrows or the keys to move the player
      //------------
      //
      // this will handle the player that is joining
      // *
      // Joystick will only create UI for current player (myPlayer). (We need to create a joystick for each player. Its sync through the network so each client will have access to the joystick of all the other, but it will only create an UI for the current player)
      // *
      // For others, it will only sync their state

      const joystick = new Joystick(state, {
        //
      });
    });
    //
  }, []);
  // -------------------
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

      {/*  */}
      <OrbitControls />
      <Map />
      <Environment preset="sunset" />
    </>
  );
};
