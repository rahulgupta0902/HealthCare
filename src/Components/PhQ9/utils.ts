import * as faceapi from "face-api.js";
import { FaceDetection, FaceLandmarks68, WithFaceExpressions, WithFaceLandmarks } from "face-api.js";
import AngryIcon from "../../Assets/EmotionsIcons/angryicon.png";
import FearIcon from "../../Assets/EmotionsIcons/fearicon.png";
import HappyIcon from "../../Assets/EmotionsIcons/Happyicon.png";
import NeutralIcon from "../../Assets/EmotionsIcons/neutralicon.png";
import SadIcon from "../../Assets/EmotionsIcons/sadicon.png";
import SurprisedIcon from "../../Assets/EmotionsIcons/surpriseicon.png";
import IrritatedIcon from "../../Assets/Relaximages/irritated.png";
const ModelsURL = "/faceapi-models";

const loadModels = () => {
  return Promise.all([
    faceapi.nets.faceExpressionNet.loadFromUri(ModelsURL),
    faceapi.nets.faceRecognitionNet.loadFromUri(ModelsURL),
    faceapi.nets.faceLandmark68Net.loadFromUri(ModelsURL),
    faceapi.nets.tinyFaceDetector.loadFromUri(ModelsURL)
  ]);
};

const detectFaces = async (image: HTMLVideoElement): Promise<
  WithFaceExpressions<WithFaceLandmarks<{detection: FaceDetection;}, FaceLandmarks68>>[] | null
  > => {
  // if (!image) {
  //   return null;
  // }
  const imgSize = image.getBoundingClientRect();
  const displaySize = {
    width: imgSize.width,
    height: imgSize.height
  };
  if (displaySize.height <= 0) {
    return null;
  }
  const faces = await faceapi
                        .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions({inputSize: 320}))
                        .withFaceLandmarks()
                        .withFaceExpressions()
  return faceapi.resizeResults(faces, displaySize);
};

const drawResults = async (
  image: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  results: faceapi.WithFaceExpressions<faceapi.WithFaceLandmarks<{detection: faceapi.FaceDetection;}, faceapi.FaceLandmarks68>>[] | null,
  type: ("landmarks" | "expressions" | "box" | "boxLandmarks")
  ) => {
  if (image && canvas && results) {
    const imgSize = image.getBoundingClientRect();
    const displaySize = { width: imgSize.width, height: imgSize.height };
    faceapi.matchDimensions(canvas, displaySize);
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    const resizedDetections = faceapi.resizeResults(results, displaySize);

    switch (type) {
      case 'landmarks':
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      case 'expressions':
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        break;
      case 'box':
        faceapi.draw.drawDetections(canvas, resizedDetections);
        break;
      case 'boxLandmarks':
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      default:
        break;
    }
  }
};

const EmojiIconMap = new Map<string, string>([
  ["angry", AngryIcon],
  ["disgust", IrritatedIcon],
  ["scared", FearIcon],
  ["happy", HappyIcon],
  ["sad", SadIcon],
  ["surprised", SurprisedIcon],
  ["neutral", NeutralIcon],
]);

const getEmojiForEmotion = (emotion: string): string => {
  return EmojiIconMap.get(emotion)!;
};

export {
  loadModels,
  detectFaces,
  drawResults,
  EmojiIconMap,
  getEmojiForEmotion
};
