song1 = "";
song2 = "";

lx = ""
ly = ""

rx = ""
ry = ""

scoreLeftWrist = 0
scoreRightWrist = 0

song1s = ""
song2s = ""



function preload() {
    song1 = loadSound("1.mp3");
    song2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        lx = results[0].pose.leftWrist.x
        ly = results[0].pose.leftWrist.y
        rx = results[0].pose.rightWrist.x
        ry = results[0].pose.rightWrist.y
        console.log(lx + " " + ly + " " + rx + " " + ry)
    }
}


function draw() {
    image(video, 0, 0, 500, 500);
    song1s = song1.isPlaying();
    
    fill("#FF0000")
    stroke("#FF0000")
    circle(rx, ry, 20);

    if (scoreLeftWrist > 0.2) {
        circle(rx, ry, 20);
        song2.stop();
        if(song1s== false){
            song1.play();
            document.getElementById("song").innerHTML = "Song Name : Da Diareah Song"
                }
    }
    song2s = song2.isPlaying()

    if (scoreRightWrist > 0.2) {
        circle(rx, ry, 20);
        song1.stop();
        if(song2s == false){
            song2.play();
            document.getElementById("song").innerHTML = "Song Name : Mystery Song"
                }
    }
   
}