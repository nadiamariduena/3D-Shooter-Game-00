import { Loader, SoftShadows } from "@react-three/drei";
// 35
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  return (
    <>
      <Loader />
      <Leaderboard />

      <Canvas
        shadows
        camera={{ position: [0, 30, 0], fov: 30, near: 2 }}
        dpr={[1, 1.5]} // optimization to increase performance on retina/4k devices
      >
        <color attach="background" args={["#242424"]} />
        <SoftShadows size={42} />
        {/*  ✋ wrapping the "Experience" with a suspense and then with the physics

          the purpose of the suspense: `<Suspense>` lets you display a fallback until its children have finished loading.

          After the suspense and the physics you will need to add the Rigid Body with a collider type

          Rigidbody in Unity - Everything You Need to Know
          https://www.youtube.com/watch?v=Y3xkgpCukow
      */}
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
        {/* 36 bloom on the bullet, after this create the audios folder within the public folder, then go back to the Bullet,jsx */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;

/*
fov:
Field of view (FOV) is the open, observable area a person can see through their eyes or via an optical device, such as a camera. In the case of optical devices, FOV is the maximum area that the device can capture. In other words, it answers the question: "How much can the device see?"


*/
