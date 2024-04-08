/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/Character_Soldier.gltf -o src/components/CharacterSoldier.jsx -r public -k
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { Color, LoopOnce, MeshStandardMaterial } from "three";

//
//
import { SkeletonUtils } from "three-stdlib";

//
// 1) WEAPONS
const WEAPONS = [
  "GrenadeLauncher",
  "AK",
  "Knife_1",
  "Knife_2",
  "Pistol",
  "Revolver",
  "Revolver_Small",
  "RocketLauncher",
  "ShortCannon",
  "SMG",
  "Shotgun",
  "Shovel",
  "Sniper",
  "Sniper_2",
];

export function CharacterSoldier({
  // ------------
  // 2) PROPS by default: By default the character has  color, animation set to "Idle" and a weapon "AK mitrailleuse"
  color = "black",
  animation = "Idle", //**  check line 4920 on the Character_Soldier.gltf
  weapon = "AK", // if you dont like the AK by default , check the array in line 17, and choose from there
  ...props
  // -------------
  //
  //
}) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/Character_Soldier.gltf"
  );

  //-----------
  // The mesh is reusable, as we will have several players and it makes not sense remove it entirely once a player dies, that is why we clone it
  //
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  //
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  //
  //
  if (actions["Death"]) {
    //
    // once its dead, it stays in dead position
    actions["Death"].loop = LoopOnce;
    //
    actions["Death"].clampWhenFinished = true;
  }
  //  the fading connected to the character appearing or dying
  useEffect(() => {
    actions[animation].reset().fadeIn(0.2).play();
    return () => actions[animation]?.fadeOut(0.2);
  }, [animation]);

  const playerColorMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color(color),
      }),
    [color]
  );
  useEffect(() => {
    // HIDING NON-SELECTED WEAPONS
    WEAPONS.forEach((wp) => {
      const isCurrentWeapon = wp === weapon;
      nodes[wp].visible = isCurrentWeapon;
    });

    // ASSIGNING CHARACTER COLOR
    nodes.Body.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    nodes.Head.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
    });
    clone.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [nodes, clone]);

  return (
    <group {...props} dispose={null} ref={group}>
      <group name="Scene">
        <group name="CharacterArmature">
          {/*  */}
          <primitive object={nodes.Root} />

          {/*  */}
          <group name="Body_1">
            <skinnedMesh
              name="Cube004"
              geometry={nodes.Cube004.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube004.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_1"
              geometry={nodes.Cube004_1.geometry}
              material={materials.DarkGrey}
              skeleton={nodes.Cube004_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_2"
              geometry={nodes.Cube004_2.geometry}
              material={materials.Pants}
              skeleton={nodes.Cube004_2.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_3"
              geometry={nodes.Cube004_3.geometry}
              material={playerColorMaterial}
              skeleton={nodes.Cube004_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube004_4"
              geometry={nodes.Cube004_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube004_4.skeleton}
              castShadow
            />
          </group>
          {/*  */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Character_Soldier.gltf");
