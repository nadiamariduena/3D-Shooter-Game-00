import { Environment, OrbitControls } from "@react-three/drei";
import { insertCoin } from "playroomkit";
import { useEffect } from "react";
import { Map } from "./Map";

export const Experience = () => {
  //
  //

  // LOG ROOM/session ----
  const start = async () => {
    await insertCoin();
  };
  useEffect(() => {
    start();
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
