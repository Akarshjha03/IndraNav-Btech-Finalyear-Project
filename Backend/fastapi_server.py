import cv2
import dlib
import imutils
import numpy as np
from scipy.spatial import distance
from imutils import face_utils
from pygame import mixer
from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import threading
import time

app = FastAPI()

# ---------------- CORS CONFIGURATION ---------------- 
# Allow requests from frontend running on different port
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",  # Vite default port (if used)
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- GLOBAL STATE ----------------
IS_RUNNING = False            # toggled by /start and /stop
frame_lock = threading.Lock() # thread safety
output_frame = None           # latest processed frame

# ---------------- INITIAL SETUP ----------------
mixer.init()
mixer.music.load("music.wav")

thresh = 0.25
frame_check = 20
flag = 0

detect = dlib.get_frontal_face_detector()
predict = dlib.shape_predictor("models/shape_predictor_68_face_landmarks.dat")

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

# Try multiple camera indexes
cap = None
for idx in [0, 1, 2]:
    cam = cv2.VideoCapture(idx)
    if cam.isOpened():
        cap = cam
        break

if cap is None:
    raise RuntimeError("No available camera device found.")

time.sleep(2)  # allow camera warm-up

# ---------------- EAR FUNCTION ----------------
def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)


# ---------------- BACKGROUND PROCESSING THREAD ----------------
def process_frames():
    global output_frame, flag, IS_RUNNING

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame = imutils.resize(frame, width=450)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        if IS_RUNNING:
            subjects = detect(gray, 0)
            for subject in subjects:
                shape = predict(gray, subject)
                shape = face_utils.shape_to_np(shape)

                leftEye = shape[lStart:lEnd]
                rightEye = shape[rStart:rEnd]

                leftEAR = eye_aspect_ratio(leftEye)
                rightEAR = eye_aspect_ratio(rightEye)
                ear = (leftEAR + rightEAR) / 2.0

                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)

                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

                if ear < thresh:
                    flag += 1
                    if flag >= frame_check:
                        cv2.putText(
                            frame, "****************ALERT!****************", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2
                        )
                        mixer.music.play()
                else:
                    flag = 0
        else:
            # Running OFF → zero overlay, only show raw webcam frames
            pass

        # Save frame for streaming
        _, jpeg = cv2.imencode(".jpg", frame)
        with frame_lock:
            output_frame = jpeg.tobytes()


# Start background processing thread
threading.Thread(target=process_frames, daemon=True).start()


# ---------------- FASTAPI ENDPOINTS ----------------

@app.get("/")
def root():
    return {"status": "backend live", "running": IS_RUNNING}


@app.post("/start")
def start_system():
    global IS_RUNNING
    IS_RUNNING = True
    return {"message": "Drowsiness detection started."}


@app.post("/stop")
def stop_system():
    global IS_RUNNING
    IS_RUNNING = False
    return {"message": "Drowsiness detection stopped."}


@app.get("/video_feed")
def video_feed():
    def mjpeg_stream():
        while True:
            with frame_lock:
                if output_frame is None:
                    time.sleep(0.1)
                    continue
                frame = output_frame

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )
            time.sleep(0.033)  # ~30 FPS

    return StreamingResponse(mjpeg_stream(),
                             media_type="multipart/x-mixed-replace; boundary=frame")
