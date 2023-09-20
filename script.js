// Function to start the webcam
const startCam = () => {
  // Get the video element by its ID
  const video = document.getElementById("video");

  // Check if the browser supports getUserMedia (WebRTC)
  if (navigator.mediaDevices.getUserMedia) {
    // Request access to the user's webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Set the video element's source to the webcam stream
        video.srcObject = stream;
      })
      .catch(function (error) {
        // Handle any errors that occur when accessing the webcam
        console.log("Something went wrong!");
      });
  }
};

// Function to stop the webcam
const stopCam = () => {
  // Get the video element by its ID
  let video = document.getElementById("video");

  // Get the stream from the video element
  let stream = video.srcObject;

  // Get all the tracks in the stream and stop each one
  let tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  // Clear the video element's source
  video.srcObject = null;
};

// Function to capture a photo from the webcam and store it in local storage
const capturePhoto = () => {
  // Get the video element by its ID
  const video = document.getElementById("video");

  // Create a canvas element for drawing the video frame
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set the canvas dimensions to match the video frame size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas content to a data URL (base64)
  const dataURL = canvas.toDataURL("image/jpeg"); // You can use "image/png" for PNG format

  // Store the data URL in local storage with a key "capturedPhoto"
  localStorage.setItem("capturedPhoto", dataURL);
};

// Event listener to start the webcam when the "Click Here to Start Cam" button is clicked
document.querySelector(".start-button").addEventListener("click", startCam);

// Event listener to stop the webcam when the "Click Here to Stop Cam" button is clicked
document.querySelector(".stop-button").addEventListener("click", stopCam);

// Event listener to capture a photo when the "Capture Photo" button is clicked
document
  .querySelector(".capture-button")
  .addEventListener("click", capturePhoto);
