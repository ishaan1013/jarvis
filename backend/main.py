import cv2
from cv2.typing import MatLike
import mediapipe as mp
import numpy as np
import tensorflow as tf

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

import pickle

import time
import math

BaseOptions = mp.tasks.BaseOptions
GestureRecognizer = mp.tasks.vision.GestureRecognizer
GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
GestureRecognizerResult = mp.tasks.vision.GestureRecognizerResult
VisionRunningMode = mp.tasks.vision.RunningMode


def calculate_distance(x1, y1, x2, y2):
    distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    return distance


cameraMatrix, dist = pickle.load(open("utils/calibration.pkl", "rb"))


def undistort(img: MatLike):
    h, w = img.shape[:2]
    newCameraMatrix, roi = cv2.getOptimalNewCameraMatrix(
        cameraMatrix, dist, (w, h), 1, (w, h))

    dst = cv2.undistort(img, cameraMatrix, dist, None, newCameraMatrix)
    x, y, w, h = roi
    dst = dst[y:y+h, x:x+w]
    return dst


def print_result(result: GestureRecognizerResult, output_image: mp.Image, timestamp_ms: int):
    print('gesture recognition result: {} at {}'.format(
        result.gestures[0] if len(result.gestures) > 0 else [], timestamp_ms))


options = GestureRecognizerOptions(
    base_options=BaseOptions(model_asset_path='utils/gesture_recognizer.task'),
    running_mode=VisionRunningMode.LIVE_STREAM,
    result_callback=print_result)
with GestureRecognizer.create_from_options(options) as recognizer:

    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils

    hands = mp_hands.Hands(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.7,
        max_num_hands=2,
    )

    webcam = cv2.VideoCapture(0)

    while webcam.isOpened():
        ret, frame = webcam.read()
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        frame = undistort(frame)

        frame = cv2.cvtColor(cv2.flip(frame, 0), cv2.COLOR_BGR2RGB)
        results = hands.process(frame)

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        frame_height, frame_width, _ = frame.shape

        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
        recognizer.recognize_async(
            mp_image, mp.Timestamp.from_seconds(time.time()).value)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:

                for ids, landmrk in enumerate(hand_landmarks.landmark):
                    cx, cy = landmrk.x * frame_width, landmrk.y*frame_height

                x0 = hand_landmarks.landmark[0].x
                y0 = hand_landmarks.landmark[0].y
                x5 = hand_landmarks.landmark[5].x
                y5 = hand_landmarks.landmark[5].y

                d = calculate_distance(x0, y0, x5, y5)

                cv2.putText(frame, str(d*100), (int(x0 * frame_width), int(y0 * frame_height)),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                mp_drawing.draw_landmarks(
                    frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        cv2.imshow('MediaPipe Hands', frame)
        if cv2.waitKey(5) & 0xFF == ord("q"):
            break

    webcam.release()
    cv2.destroyAllWindows()
