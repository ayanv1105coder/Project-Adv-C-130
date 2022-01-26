peter_pan_song = "";
Harry_Potter_Theme_song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
song_peter_pan = "";

scoreRightWrist = 0;
song_harry_potter_theme = "";

function setup() {
    canvas = createCanvas(550, 550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    Harry_Potter_Theme_song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 550, 550);

    fill('#ff9900');
    stroke('#ff0000');

    song_peter_pan = peter_pan_song.isPlaying();
    console.log("PeterPanSong = " + song_peter_pan);

    song_harry_potter_theme = Harry_Potter_Theme_song.isPlaying();
    console.log("HarryPotterThemeSong = " + song_harry_potter_theme);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        Harry_Potter_Theme_song.stop();
        if (song_peter_pan == false) {
            peter_pan_song.play();
        }
        else {
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan Song";
        }    
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        peter_pan_song.stop();
        if (song_harry_potter_theme == false) {
            Harry_Potter_Theme_song.play();
        }
        else {
            document.getElementById("song_name").innerHTML = "Song Name: Harry Potter Theme Song";
        }    
    }
}


function modelLoaded() {
    console.log("PoseNet Has Been Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
    
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreRightWist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " & Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right Wrist X = " + rightWristX + " & right Wrist Y = " + rightWristY);

        console.log("right Wrist X = " + rightWristX + " & right Wrist Y = " + rightWristY + " & Left Wrist X = " + leftWristX + " & Left Wrist Y = " + leftWristY);
    }
}
