import { useGLTF } from "@react-three/drei";

export const Map = () => {
  const map = useGLTF("models/map.glb");
};

useGLTF.preload("models/map.glb");
