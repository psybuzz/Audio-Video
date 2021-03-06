var i = 0;
var imgArray = [];
var colorArray = [];
var normalized = [];
console.log("Loaded js")
video = document.getElementById("video1")
video.addEventListener('loadeddata', function() {
    video.currentTime = i;
//4972 seconds in Totoro
    var sampleSize = 994;
    for (var j=0; j<sampleSize + 1; j++){
        (function (frame) {
            var time = frame * video.duration / sampleSize;
            setTimeout(function (){
                if (frame >= sampleSize){
                    generateAverageColors();
                } else {
                    video.currentTime = time;
                    setTimeout(function (){
                        generateThumbnail(time);
                    }, 600);
                }
            }, frame * 1000);
        })(j);
    }

}, false);

function playRandom (){
    video.play();
    (function abc (){
        setTimeout(function () {
            video.currentTime = Math.random() * video.duration - 1;
            if (!video.paused) abc();
        }, 1600);
    })();
}

function generateThumbnail(i) {
    //generate thumbnail URL data
    console.log("generated thumbnail");
    canvas = document.getElementById("imageCanvas")
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 600, 400);
    var imageData = context.getImageData(0, 0, 600, 400);
    imgArray.push(imageData.data);

/*    //append img in container div
    document.getElementById('thumbnailContainer').appendChild(img);*/
}

//Fills colorArray with averaged color values for each pixel
function generateAverageColors(){
    for (var i=0; i<imgArray.length; i++){
        var dataLength = imgArray[i].length;
        var data = imgArray[i];
        var red = 0;
        var green = 0;
        var blue = 0;
        for (var j=0; j<dataLength; j+=4) {

            red+=data[j]
            green+=data[j+1]
            blue+=data[j+2]
        }
        red/=dataLength/4
        green/=dataLength/4
        blue/=dataLength/4

        colorArray[i] = red + green + blue
    }
}

function normalize(){
    var sum = 0
    for (var i =0; i<colorArray.length; i++){
        sum+=colorArray[i]
    }
    var average = sum/colorArray.length;
    console.log(average);

    for (var i=0; i<colorArray.length; i++){
        normalized[i] = colorArray[i] - average;
    }

    console.log(normalized);
    console.log("Average: " + average);
    console.log("Highest luminence value: " + Math.max.apply(Math, normalized));
    console.log("Lowest luminence value: " + Math.min.apply(Math, normalized));
    var output = document.getElementById("output")
    output.innerHTML=colorArray;
}

normalize();
