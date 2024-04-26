import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { isHost } from "playroomkit";
import { useEffect, useMemo, useRef } from "react";
import { Color, MathUtils, Vector3 } from "three";

//----color blo----
const bulletHitcolor = new Color("red");
bulletHitcolor.multiplyScalar(12);

//--------
//
//
// This component represents an animated box that scales and moves towards a target position over time.

const AnimatedBox = ({ scale, target, speed }) => {
  // Ref for accessing the instance of the box
  const ref = useRef();
  //
  // Use the useFrame hook to update the box's scale and position on each frame
  useFrame((_, delta) => {
    //
    //
    // Decrease the scale of the box in all dimensions if it hasn't reached zero yet

    if (ref.current.scale.x > 0) {
      ref.current.scale.x =
        ref.current.scale.y =
        ref.current.scale.z -=
          speed * delta;
    }
    // Move the box towards the target position using linear interpolation

    //
    ref.current.position.lerp(target, speed);
  });
  return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
};
//
//
// 🟨 Generate a number of small boxes with a random TARGET position
export const BulletHit = ({ nb = 100, position, onEnded }) => {
  const boxes = useMemo(
    () =>
      Array.from({ length: nb }, () => ({
        target: new Vector3(
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6)
        ),
        scale: 0.1, //MathUtils.randFloat(0.03, 0.09),
        speed: MathUtils.randFloat(0.1, 0.3),
      })),
    [nb]
  );

  useEffect(() => {
    setTimeout(() => {
      if (isHost()) {
        onEnded();
      }
    }, 500);
  }, []);

  return (
    <group position={[position.x, position.y, position.z]}>
      <Instances>
        <boxGeometry />
        <meshStandardMaterial toneMapped={false} color={bulletHitcolor} />
        {boxes.map((box, i) => (
          <AnimatedBox key={i} {...box} />
        ))}
      </Instances>
    </group>
  );
};
