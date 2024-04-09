import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export const Map = () => {
  const map = useGLTF("models/map.glb");
  //
  //
  useEffect(() => {
    map.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });

  //
  // https://rapier.rs/docs/user_guides/javascript/colliders/
  return (
    <RigidBody colliders="trimesh">
      {/* After adding the colliders , the map will fall */}
      <primitive object={map.scene} />
    </RigidBody>
  );
};

useGLTF.preload("models/map.glb");
