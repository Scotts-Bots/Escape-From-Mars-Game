//crearing global variables
var startText, creditText, titleText, creditText, credit1Text, credit2Text, credit3Text, credit4Text, credit5Text, credit6Text, credit7Text, credit8Text, exitCredits
var startButton, creditsButton, creditBackGround, loader;

// screating scene, camera and renderer and setting the renderers size
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// creating the background
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mars = new THREE.Mesh(geometry, material);

const starsGeometry = new THREE.SphereGeometry(50, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

// creating a directional light
const light = new THREE.DirectionalLight(0xcccccc, 1);

//setting the cameras' and lights' position
cam.position.z = 3;
light.position.set(5, 3, 5);

function getInputValue() {
    //get name input
    var name = document.getElementById("nameInput").value;
    localStorage["name"] = name;

    alert("Name saved");
}

//adding the texture for mars and bump map
material.map = new THREE.TextureLoader().load('textures/diffuse.jpg');
material.bumpMap = new THREE.TextureLoader().load('textures/bump.jpg');
material.bumpScale = 0.015;

// adding the textures onto the sphere to create a skybox
starsMaterial.map = new THREE.TextureLoader().load('textures/stars.jpg');
starsMaterial.side = THREE.BackSide;

// adding mars, stars and light to to scene
scene.add(mars);
scene.add(light);
scene.add(starsMesh);

//adding audio to the level
const listener = new THREE.AudioListener();
cam.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('Sounds/Atmosphere With Jump Scare.wav', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

//loading options 
ShowOptions();

// //loading leader board for times
// LeaderBoard();

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, cam);

    // rotating the stars to create a dynamic skybox and rotating mars  and light for realism
    starsMesh.rotation.y += 0.0001;
    starsMesh.rotation.x += 0.0003;
    mars.rotation.y -= 0.001;
    mars.rotation.z -= 0.0005;
    light.rotation.y -= 0.001;
};

animate();



//creating an event for when the player clicks the start button
const startGame = new THREEx.DomEvents(cam, renderer.domElement);

startGame.addEventListener(startButton, 'click', event => {
    //assigning static variables
    localStorage["health"] = 100;
    localStorage["oxygen"] = 100;
    localStorage["ammo"] = 0;
    localStorage["cards"] = 0;
    localStorage["gun"] = 0;
    window.location.href = "level1.html";
});

//creating an event for when the player clicks the credits button
const viewCredits = new THREEx.DomEvents(cam, renderer.domElement);

viewCredits.addEventListener(creditsButton, 'click', event => {
    RemovePause();
    document.getElementById("overlay").style.visibility = "hidden";
    AddCredit();

});

//creating an event for when the player clicks the down key arrow
document.addEventListener('keydown', event => {
    if (event.code === "ArrowDown") {
        RemoveCredit();
        ShowOptions();
        document.getElementById("overlay").style.visibility = "visible";
    }
});

//creating function to show the different options on main menu
function ShowOptions() {

    //creating and adding start button to scene
    startButton = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    startButton.position.z = -1;
    startButton.position.y = 0.19;
    cam.add(startButton);
    scene.add(cam);

    //creating and adding credits button to scene
    creditsButton = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    creditsButton.position.z = -1;
    creditsButton.position.y = -0.16;
    cam.add(creditsButton);
    scene.add(cam);


    //creating and setting words for each button
    loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        let startGeo = new THREE.TextGeometry("Start", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let creditGeo = new THREE.TextGeometry("Credits", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let titleGeo = new THREE.TextGeometry("Escape Mars", {

            font: font,

            size: 0.1,
            height: 0.05,
            curveSegments: 2,

            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelEnabled: true

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const textMaterial1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        startText = new THREE.Mesh(startGeo, textMaterial);
        startText.position.z = -1;
        startText.position.y = 0.17;
        startText.position.x = -0.08;

        creditText = new THREE.Mesh(creditGeo, textMaterial);
        creditText.position.z = -1;
        creditText.position.y = -0.18;
        creditText.position.x = -0.1;

        titleText = new THREE.Mesh(titleGeo, textMaterial1);
        titleText.position.z = -1;
        titleText.position.y = 0.5;
        titleText.position.x = -0.4;

        //adding the wors to the scene
        cam.add(startText);
        cam.add(creditText);
        cam.add(titleText);
        scene.add(cam);

    });
}

//function to remove credits from the scene
function RemoveCredit() {
    cam.remove(creditText);
    cam.remove(credit1Text);
    cam.remove(credit2Text);
    cam.remove(credit3Text);
    cam.remove(credit4Text);
    cam.remove(exitCredits);
    cam.remove(credit5Text);
    cam.remove(creditBackGround);

    scene.add(cam);
}

//function to remove options from the scene
function RemovePause() {
    cam.remove(startText);
    cam.remove(creditText);
    cam.remove(titleText);
    cam.remove(startButton);
    cam.remove(creditsButton);


    scene.add(cam);
}

//function to add credits to the scene
function AddCredit() {

    //adding background for credits
    creditBackGround = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    creditBackGround.position.z = -1;
    creditBackGround.position.x = -0.05;
    cam.add(creditBackGround);
    scene.add(cam);

    //creating and settting words for credits
    loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        let credit1 = new THREE.TextGeometry("SkyBox images: MegaKosan - https://gamebanana.com/mods/7912", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit2 = new THREE.TextGeometry("Threex library: Jerome Etienne - https://github.com/jeromeetienne/threex.domevents", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit = new THREE.TextGeometry("Credits", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let credit3 = new THREE.TextGeometry("Collision dectection and sandstorm: Three.js tutorials by Lee Stemkoski ", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit4 = new THREE.TextGeometry("Gun view: saucecode - https://github.com/saucecode/threejs-demos/tree/master/08_GunView", {

            font: font,

            size: 0.0155,
            height: 0.001,
            curveSegments: 2,

        });

        let credit5 = new THREE.TextGeometry("Main menu background: flowforfrank - https://github.com/flowforfrank/threejs", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit6 = new THREE.TextGeometry("Music and Audio by: Dulane McCabe", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit7 = new THREE.TextGeometry("astronaut model by jgilhutton : https://blendswap.com/blend/12622", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit8 = new THREE.TextGeometry("water code and picture by mrdoob: https://github.com/mrdoob/three.js/tree/master/examples ", {

            font: font,

            size: 0.0155,
            height: 0.001,
            curveSegments: 2,

        });

        let dArrow = new THREE.TextGeometry("Down arrow to close", {

            font: font,

            size: 0.018,
            height: 0.001,
            curveSegments: 2,

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        creditText = new THREE.Mesh(credit1, textMaterial);
        creditText.position.z = -1;
        creditText.position.y = 0.17;
        creditText.position.x = -0.5;

        credit1Text = new THREE.Mesh(credit2, textMaterial);
        credit1Text.position.z = -1;
        credit1Text.position.y = 0.03;
        credit1Text.position.x = -0.5;

        credit2Text = new THREE.Mesh(credit, textMaterial);
        credit2Text.position.z = -1;
        credit2Text.position.y = 0.25;
        credit2Text.position.x = -0.15;

        credit3Text = new THREE.Mesh(credit3, textMaterial);
        credit3Text.position.z = -1;
        credit3Text.position.y = 0.1;
        credit3Text.position.x = -0.5;

        credit4Text = new THREE.Mesh(credit4, textMaterial);
        credit4Text.position.z = -1;
        credit4Text.position.y = -0.035;
        credit4Text.position.x = -0.5;

        credit5Text = new THREE.Mesh(credit5, textMaterial);
        credit5Text.position.z = -1;
        credit5Text.position.y = -0.09;
        credit5Text.position.x = -0.5;

        credit6Text = new THREE.Mesh(credit6, textMaterial);
        credit6Text.position.z = -1;
        credit6Text.position.y = -0.15;
        credit6Text.position.x = -0.5;

        credit7Text = new THREE.Mesh(credit7, textMaterial);
        credit7Text.position.z = -1;
        credit7Text.position.y = -0.21;
        credit7Text.position.x = -0.5;

        credit8Text = new THREE.Mesh(credit8, textMaterial);
        credit8Text.position.z = -1;
        credit8Text.position.y = -0.27;
        credit8Text.position.x = -0.5;

        exitCredits = new THREE.Mesh(dArrow, textMaterial);
        exitCredits.position.z = -1;
        exitCredits.position.y = 0.3;
        exitCredits.position.x = 0.2;

        //adding credits words to the scene
        cam.add(creditText);
        cam.add(credit1Text);
        cam.add(credit2Text);
        cam.add(credit3Text);
        cam.add(credit4Text);
        cam.add(exitCredits);
        cam.add(credit5Text);
        cam.add(credit6Text);
        cam.add(credit7Text);
        cam.add(credit8Text);
        scene.add(cam);

    });
}

