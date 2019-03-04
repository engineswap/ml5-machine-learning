let mobilenet;
let video;
let predictor;
let slider;
let addButton;
let trainButton;
let value = 0;

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
        predictor.predict(gotResults)
    }else{
        console.log(loss)
    }
}

function gotResults(error, result){
    if (error) console.error(error)
    else{
        console.log(result)
        value = result;
        document.getElementById('imageClassification').innerHTML = "value: " + value;
        document.getElementById('imageClassification').style.cssText = "color: green; margin-left: 2%;"
        predictor.predict(gotResults)
    }
}

function setup(){
    createCanvas(640, 480)
    background(0)
    video = createCapture(VIDEO);
    video.hide()
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    predictor = mobilenet.regression(video, videoReady);

    slider = createSlider(0,1,0.5,0.01);

    addButton = createButton('add example image')
    addButton.mousePressed(function(){
        predictor.addImage(slider.value());
    })

    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        predictor.train(whileTraining);
    });
}

function draw(){
    image(video, 0, 0)
    rectMode(CENTER)
    fill(255, 0, 200)
    rect(value*width, height/2, 50, 50)
}