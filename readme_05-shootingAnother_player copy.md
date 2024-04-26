## Shooting another player

- As we did on the **Bullet.jsx** , add another event

- go to the **CharacterController.jsx**

```javascript

// before
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

//
//  ✋ AFTER
//
```
