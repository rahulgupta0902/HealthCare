import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Clock, Mesh } from "three";
import { blinking, speaking } from "./animations.utils";

function PixelModel({ audioTune, speechMarks, setLoadedModel }: any) {
  const { gl } = useThree();

  // get all the glb files can be loaded according to user. gltf is skinned model and others are without skin
  // animations.
  const gltf = useGLTF("/gltf/female/female-1.glb");
  const waving = useGLTF("/gltf/female/female@waving.glb");
  const talking = useGLTF("/gltf/female/female@talking.glb");
  const idle = useGLTF("/gltf/female/female@idle-2.glb");
  const mesh = useRef();
  const speechMarksIndexRef = useRef<number>(0);
  const speakingClockRef = useRef<Clock>(new Clock());
  const getMeshByName = (gltf: any, name: string) => {
    let foundObj = null;
    gltf.scene.traverse((obj: any) => {
      if (obj.name === name) {
        foundObj = obj;
      }
    });
    return foundObj;
  };

  // Searching for head and teeth mesh in the model.
  const head = getMeshByName(gltf, "Wolf3D_Head")!;
  const teeth = getMeshByName(gltf, "Wolf3D_Teeth")!;

  const animations = [
    ...waving.animations,
    ...talking.animations,
    ...idle.animations,
  ];
  // added the speaking and blinking animation in head and teeth mesh.
  const actions = useAnimations(animations, mesh);
  const speakingActions = useAnimations([speaking], head);
  const speakingActionsTeeth = useAnimations([speaking], teeth);
  const blinkingActions = useAnimations([blinking], head);

  useEffect(() => {
    setLoadedModel(true);
    gltf.scene.traverse((obj) => {
      gl.shadowMap.enabled = true;
      obj.castShadow = true;
      obj.receiveShadow = true;
      if ((obj as Mesh).isMesh) {
        obj.frustumCulled = false;
      }
    });
    // play the idle animation to make model look real and not in T-pose shape. Also play eye blinking animation.
    actions.actions["idle"]?.play();
    blinkingActions.actions["eyeBlinking"]?.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioTune && speechMarks) {
      audioTune.play();
      speakingActions.actions["mouthOpen"]?.play();
      speakingActionsTeeth.actions["mouthOpen"]?.play();
      speechMarksIndexRef.current = 0;
      speakingClockRef.current.stop();
      speakingClockRef.current.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioTune, speechMarks]);

  // These hook gets called on each frame. Here we keep track of time and play speaking animation according to speechMarks.
  useFrame((state) => {
    const speakingClock = speakingClockRef.current;
    const speechMarkIndex = speechMarksIndexRef.current;
    if (audioTune && speechMarks) {
      if (!audioTune.paused && speechMarkIndex < speechMarks.length) {
        if (
          speakingClock.getElapsedTime() * 1000 >=
            speechMarks[speechMarkIndex].start &&
          speakingClock.getElapsedTime() * 1000 <=
            speechMarks[speechMarkIndex].end
        ) {
          speakingActions.actions["mouthOpen"]?.play();
          speakingActionsTeeth.actions["mouthOpen"]?.play();
        } else {
          speakingActions.actions["mouthOpen"]?.stop();
          speakingActionsTeeth.actions["mouthOpen"]?.stop();

          if (
            speakingClock.getElapsedTime() * 1000 >=
            speechMarks[speechMarkIndex].end
          ) {
            speechMarksIndexRef.current++;
          }
        }
      } else {
        speakingActions.actions["mouthOpen"]?.stop();
        speakingActionsTeeth.actions["mouthOpen"]?.stop();

        speakingClock.stop();
      }
    }
  });
  return (
    <mesh frustumCulled={false}>
      <primitive ref={mesh} object={gltf.scene} />
    </mesh>
  );
}

export default PixelModel;
