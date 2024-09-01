//creating global variables
var restartText, mainMenuText, titleText, restartButton, mainMenuButton, loader;

// screating scene, camera and renderer
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// creating the background
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mars = new THREE.Mesh(geometry, material);

const starsGeometry = new THREE.SphereGeometry(50, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

// creating a directional light
const light = new THREE.DirectionalLight(0xffffff, 0.5);

// setting the renderers size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//setting the cameras' and lights' position
cam.position.z = 3;
light.position.set(5, 3, 5);

//creating and adding an ambient light to the scene
var ambientLight = new THREE.AmbientLight(0xff0000, 0.3);//0.05
scene.add(ambientLight);


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
ShowOptions();

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

//creating an event for when the player clicks the restart button
const restartGame = new THREEx.DomEvents(cam,  renderer.domElement);

restartGame.addEventListener(restartButton, 'click', event =>{
    localStorage["health"] = 100;
    localStorage["oxygen"] = 100;
    localStorage["ammo"] = 0;
    localStorage["cards"]  = 0;
    localStorage["gun"] = 0;
    window.location.href = "level1.html";
});

//creating an event for when the player clicks the Main Menu button
const mainMenuGame = new THREEx.DomEvents(cam,  renderer.domElement);

mainMenuGame.addEventListener(mainMenuButton, 'click', event =>{
    window.location.href = "mainIndex.html";
});

// Pause menu function
function ShowOptions(){

    //creating and setting buttons to be pressed
    restartButton = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    restartButton.position.z = -1;
    restartButton.position.y = 0.19;
    cam.add(restartButton);
    scene.add(cam);

    mainMenuButton = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    mainMenuButton.position.z = -1;
    mainMenuButton.position.y = -0.16;
    cam.add(mainMenuButton);
    scene.add(cam);


    //creating and setting words 
    loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        let restartGeo = new THREE.TextGeometry("Restart", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let mainMenuGeo = new THREE.TextGeometry("Main Menu", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let titleGeo = new THREE.TextGeometry("YOU WON", {

            font: font,

            size: 0.19,
            height: 0.05,
            curveSegments: 20,

            bevelThickness: 0.005,
        bevelSize: 0.005,
        bevelEnabled: true

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x110000 });
        const textMaterial1 = new THREE.MeshPhongMaterial({ color: 0x00bbcc });

        restartText = new THREE.Mesh(restartGeo, textMaterial);
        restartText.position.z = -1;
        restartText.position.y = 0.17;
        restartText.position.x = -0.1;

        mainMenuText = new THREE.Mesh(mainMenuGeo, textMaterial);
        mainMenuText.position.z = -1;
        mainMenuText.position.y = -0.18;
        mainMenuText.position.x = -0.155;

        titleText = new THREE.Mesh(titleGeo, textMaterial1);
        titleText.position.z = -1;
        titleText.position.y = 0.4;
        titleText.position.x = -0.6;

        //adding words to the scene
        cam.add(restartText);
        cam.add(mainMenuText);
        cam.add(titleText);
        scene.add(cam);

    });
}
