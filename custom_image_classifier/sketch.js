let mobilenet;
let video;
let classifier;
let cupButton;
let sizzorButton;
let trainButton;

function modelReady(){
    console.log('Model loaded!')
    document.getElementById('ModelStatus').innerHTML = 'Model status: ready!'
    document.getElementById('ModelStatus').style.cssText = "color: green; margin-left: 2%;"
    //mobilenet.predict(gotResults)
}

function videoReady(){
    console.log('Video is ready!')
}

function whileTraining(loss){
    if(loss == null){
        console.log('Training done')
        classifier.classify(gotResults)
    }else{
        console.log(loss)
    }
}

function gotResults(error, result){
    if (error) console.error(error)
    else{
        console.log(result)
        let label = result;
        document.getElementById('imageClassification').innerHTML = "Label: " + label;
        document.getElementById('imageClassification').style.cssText = "color: green; margin-left: 2%;"
        classifier.classify(gotResults)
    }
}

function setup(){
    createCanvas(640, 480)
    background(0)
    video = createCapture(VIDEO);
    video.hide()
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    cupButton = createButton('happy');
    cupButton.mousePressed(function(){
        classifier.addImage('happy');
    });

    sizzorButton = createButton('sad');
    sizzorButton.mousePressed(function(){
        classifier.addImage('sad');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        classifier.train(whileTraining);
    });
}

function draw(){
    image(video, 0, 0)
}