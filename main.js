function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function draw() {
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}

previous_result = "";

function gotResult(error,results) {
  if (error) {
    console.log(error);
  }
  else {
    if (results[0].confidence > 0.5 && previous_result != results[0].label) {
      console.log(results);
      previous_result = results[0].label;
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = (results[0].confidence).toFixed(2);
    }
  }
}

function modelLoaded() {
  console.log("Model is Loaded");
}