import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

BaseOptions = mp.tasks.BaseOptions
GestureRecognizer = mp.tasks.vision.GestureRecognizer
GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
GestureRecognizerResult = mp.tasks.vision.GestureRecognizerResult
VisionRunningMode = mp.tasks.vision.RunningMode


# def print_result(result: GestureRecognizerResult, output_image: mp.Image, timestamp_ms: int):
#     print('gesture recognition result: {}'.format(result))


# options = GestureRecognizerOptions(
#     base_options=BaseOptions(model_asset_path='gesture_recognizer.task'),
#     running_mode=VisionRunningMode.LIVE_STREAM,
#     result_callback=print_result)
# with GestureRecognizer.create_from_options(options) as recognizer:

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

    frame = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
    results = hands.process(frame)

    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    frame_height, frame_width, _ = frame.shape

    # mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
    # recognizer.recognize_async(mp_image, webcam.get(cv2.CAP_PROP_POS_MSEC))

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            for ids, landmrk in enumerate(hand_landmarks.landmark):
                cx, cy = landmrk.x * frame_width, landmrk.y*frame_height

            # print(hand_landmarks.landmark[5].x * 100,
            #       hand_landmarks.landmark[5].y * 100)

            mp_drawing.draw_landmarks(
                frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    cv2.imshow('MediaPipe Hands', frame)
    if cv2.waitKey(5) & 0xFF == ord("q"):
        break

webcam.release()
cv2.destroyAllWindows()
