import cv2
from cv2.typing import MatLike
import mediapipe as mp

import pickle
import time
import threading
import math


class GestureCamera:
    # def __init__(self):
    def __init__(self, app, sio, emitPointer, emitMode, emitClick, emitMovement):
        self.app = app
        self.sio = sio
        self.emitPointer = emitPointer
        self.emitMode = emitMode
        self.emitClick = emitClick
        self.emitMovement = emitMovement
        self.lastGesture = None

        self.BaseOptions = mp.tasks.BaseOptions
        self.GestureRecognizer = mp.tasks.vision.GestureRecognizer
        self.GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
        self.GestureRecognizerResult = mp.tasks.vision.GestureRecognizerResult
        self.VisionRunningMode = mp.tasks.vision.RunningMode
        self.cameraMatrix, self.dist = pickle.load(
            open("utils/calibration.pkl", "rb"))

        thread = threading.Thread(target=self.handRec)
        thread.daemon = True
        thread.start()

    def calculate_distance(self, x1, y1, x2, y2):
        distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

        res = 110*math.log(distance*100)-285

        return res if res > 0 and res < 100 else 0 if res < 0 else 100

    def undistort(self, img: MatLike):
        h, w = img.shape[:2]
        newCameraMatrix, roi = cv2.getOptimalNewCameraMatrix(
            self.cameraMatrix, self.dist, (w, h), 1, (w, h))

        dst = cv2.undistort(img, self.cameraMatrix,
                            self.dist, None, newCameraMatrix)
        x, y, w, h = roi
        dst = dst[y:y+h, x:x+w]
        return dst

    def result_handler(self, result, output_image: mp.Image, timestamp_ms: int):

        current = str(result.gestures[0][0].category_name) if len(
            result.gestures) > 0 else "None"

        if current != str(self.lastGesture):
            self.lastGesture = current
            with self.app.test_request_context():
                self.emitMode(self.sio, current)
        # print('gesture recognition result: {} at {}'.format(
        #     result.gestures[0][0].category_name if len(result.gestures) > 0 else [], timestamp_ms))

    def handRec(self):

        options = self.GestureRecognizerOptions(
            base_options=self.BaseOptions(
                model_asset_path='utils/gesture_recognizer.task'),
            running_mode=self.VisionRunningMode.LIVE_STREAM,
            result_callback=self.result_handler)

        # run mediapipe gesture model
        with self.GestureRecognizer.create_from_options(options) as recognizer:

            mp_hands = mp.solutions.hands
            # mp_drawing needed when displaying hand landmarks on cv2.imshow
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

                frame = self.undistort(frame)

                frame = cv2.cvtColor(cv2.flip(frame, 0), cv2.COLOR_BGR2RGB)
                results = hands.process(frame)

                frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
                frame_height, frame_width, _ = frame.shape

                mp_image = mp.Image(
                    image_format=mp.ImageFormat.SRGB, data=frame)
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

                        d = self.calculate_distance(x0, y0, x5, y5) / 100

                        with self.app.test_request_context():
                            self.emitPointer(self.sio, x5, d, y5)

                        # print("x:" + str(x5) + ", y:" +
                        #       str(y5) + ", z:" + str(d))

                        # cv2.putText(frame, "x:" + str(round(x5*frame_width)) + ", y:" + str(round(y5*frame_height)) + ", z:" + str(round(d)), (int(x0 * frame_width), int(y0 * frame_height)),
                        #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                        # mp_drawing.draw_landmarks(
                        #     frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # cv2.imshow('MediaPipe Hands', frame)
                if cv2.waitKey(5) & 0xFF == ord("q"):
                    break

            webcam.release()
            cv2.destroyAllWindows()


# if __name__ == "__main__":
#     Cam = GestureCamera()
