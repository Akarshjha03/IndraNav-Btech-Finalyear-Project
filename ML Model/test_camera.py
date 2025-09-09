import cv2
import time

def test_camera():
    print("Testing camera access...")
    
    # Try different camera indices
    for i in range(3):
        print(f"Trying camera index {i}...")
        cap = cv2.VideoCapture(i)
        
        if cap.isOpened():
            print(f"Camera {i} opened successfully!")
            
            # Try to read a frame
            ret, frame = cap.read()
            if ret and frame is not None:
                print(f"Camera {i} can capture frames successfully!")
                print(f"Frame shape: {frame.shape}")
                cap.release()
                return i
            else:
                print(f"Camera {i} opened but cannot capture frames")
                cap.release()
        else:
            print(f"Camera {i} failed to open")
    
    print("No working camera found!")
    return None

if __name__ == "__main__":
    working_camera = test_camera()
    if working_camera is not None:
        print(f"Use camera index {working_camera} in your main script")
    else:
        print("Camera troubleshooting tips:")
        print("1. Make sure no other application is using the camera")
        print("2. Check if your camera is enabled in Windows settings")
        print("3. Try updating your camera drivers")
        print("4. Restart your computer")



