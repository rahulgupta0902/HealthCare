import { AnimationClip, NumberKeyframeTrack } from "three";

/**  These methods are used for creating animation keyframe in three.js library. Like for example:
    const keyFrame = new KeyframeTrack(
      ".morphTargetInfluences[15]",
      [0, 0.25, 0.5],
      [0, 0.6, 0]
    );
    In the above example, the keyframe track is created for the morphTargetInfluence of the 15th morph target,
    which according to model is the morph Target for A shape mouth.
*/

const keyFrame = new NumberKeyframeTrack(
  ".morphTargetInfluences[15]",
  [0, 0.25, 0.5],
  [0, 0.6, 0]
);
const keyFrameO = new NumberKeyframeTrack(
  ".morphTargetInfluences[18]",
  [0.5, 0.75, 1],
  [0, 0.6, 0]
);

const keyFrameE = new NumberKeyframeTrack(
  ".morphTargetInfluences[16]",
  [1, 1.25, 1.5],
  [0, 0.4, 0]
);
const eyeBlinking = new NumberKeyframeTrack(
  ".morphTargetInfluences[2]",
  [0, 0.1, 0.2, 2, 2.1, 2.2],
  [0, 1, 0, 0, 1, 0]
);

const speaking = new AnimationClip("mouthOpen", -1, [
  keyFrame,
  keyFrameO,
  keyFrameE,
]);
const blinking = new AnimationClip("eyeBlinking", -1, [eyeBlinking]);

export { blinking, speaking };
