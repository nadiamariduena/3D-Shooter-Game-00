import { SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    // Position the camera on the TOP
    <Canvas shadows camera={{ position: [0, 30, 0], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />

      <SoftShadows size={42} />
      <Experience />
    </Canvas>
  );
}

export default App;

/*

fov:
Field of view (FOV) is the open, observable area a person can see through their eyes or via an optical device, such as a camera. In the case of optical devices, FOV is the maximum area that the device can capture. In other words, it answers the question: "How much can the device see?"


*/
