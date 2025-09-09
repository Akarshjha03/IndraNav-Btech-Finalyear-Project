import cv2
import imutils
import dlib
from imutils import face_utils

print("Testing camera with drowsiness detection components...")

# Initialize camera
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open camera")
    exit()

print("Camera opened successfully")

# Try to read a frame
ret, frame = cap.read()
if not ret or frame is None:
    print("Error: Could not capture frame")
    cap.release()
    exit()

print(f"Frame captured successfully, shape: {frame.shape}")

# Test imutils resize
try:
    resized_frame = imutils.resize(frame, width=450)
    print(f"Frame resized successfully, new shape: {resized_frame.shape}")
except Exception as e:
    print(f"Error resizing frame: {e}")

# Test dlib face detection
try:
    detect = dlib.get_frontal_face_detector()
    gray = cv2.cvtColor(resized_frame, cv2.COLOR_BGR2GRAY)
    faces = detect(gray, 0)
    print(f"Face detection successful, found {len(faces)} faces")
except Exception as e:
    print(f"Error in face detection: {e}")

# Test shape predictor
try:
    predict = dlib.shape_predictor("models/shape_predictor_68_face_landmarks.dat")
    print("Shape predictor loaded successfully")
    
    if len(faces) > 0:
        shape = predict(gray, faces[0])
        shape = face_utils.shape_to_np(shape)
        print(f"Facial landmarks detected, shape: {shape.shape}")
except Exception as e:
    print(f"Error with shape predictor: {e}")

cap.release()
print("Test completed")



