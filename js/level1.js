//setting global variables
var intensity = 0.4,len = 10;
var unLocked = false;
var shotTagets = false;
var isPlaying = false;
var success = 0;
var lines = [];
var paused = false;
var target1;
var frame = 0;
var rules;
var rulesText;
var rulesText2;
var successText;
var wall;
var wall1;
var wall2;
var wall3;
var helpCounter = 0;
var check;
var astro;
var view = 1;

//creating a scene, camera, and renderer
const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//adding audio to the level
const listener = new THREE.AudioListener();
cam.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('Sounds/Atmosphere inside.wav', function(buffer){
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
})

//assigning static variables
localStorage["health"] = 100;
localStorage["oxygen"] = 100;
localStorage["ammo"] = 0;
localStorage["cards"]  = 0;
localStorage["gun"] = 0;
localStorage["playtime"] = 0;

//player hitbox
var cubeGeometry = new THREE.BoxBufferGeometry(200, 200, 200, 3, 3, 3);
var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
MovingCube.visible = false;
MovingCube.position.set(0, 0, 0);
setCollisionDetection(cam, MovingCube); //collision detection hitbox added to camera

//setting the render size and camera position
renderer.setSize(innerWidth, innerHeight);
cam.position.set(2100, 50, 400);
cam.lookAt(2900, 0, 2000);

//adding amient light to the scene
var ambientLight = new THREE.AmbientLight(0xffffff, 0.05);//0.05
scene.add(ambientLight);

//setting camera for pause menu
pauseCam = cam;
var gltfLoader = new THREE.GLTFLoader();

//back right room
var brrlight = new THREE.PointLight(0xffffff, intensity, 2200, 2);
brrlight.position.set(-100, 375, 2100);
scene.add(brrlight);


//front right room
var frrlight = new THREE.PointLight(0xffffff, intensity, 2500, 2);
frrlight.position.set(-100, 375, 900);
scene.add(frrlight);

//passage light
var plight = new THREE.PointLight(0xffffff, intensity, 800, 2);
plight.position.set(1300, 375, 1500);
scene.add(plight);

//emergency light
var elight = new THREE.PointLight(0xff0000, 3, 900, 2);
elight.position.set(2000, 200, 1200);
scene.add(elight);

//flourescent light
var flight = new THREE.PointLight(0xffffff, intensity, 6000, 2);
flight.position.set(2500, 375, 1500);
flight.castShadow = true;
scene.add(flight);

//event for shooting
var bulletCount = 0;
window.addEventListener( 'mousedown', Attack, false );

function Attack(){
    if (Player.getAmmo()>0 && Player.checkGun() == 1){
        bullet1.visible = true;
        Player.decAmmo();
        bulletCount = 2;
    }
}

//creating and adding room to the scene
var room = Room();
room.scale.set(4, 4, 2.5);
room.rotateX(3 * Math.PI / 2);
scene.add(room);

//creating and adding doors to the scene
var door = new THREE.Mesh(
    new THREE.BoxBufferGeometry(30, 520, 400),
    new THREE.MeshLambertMaterial({ color: 0x808080 })
);
door.position.set(950, -120, 1850);
if (unLocked == false) {
    scene.add(door);
}

var door1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(30, 520, 400),
    new THREE.MeshLambertMaterial({ color: 0x808080 })
);
door1.rotateY(Math.PI / 2);
door1.position.set(1350, -120, 0);
scene.add(door1);

//adding doors to collision detection
collidableMeshList.push(door1);

collidableMeshList.push(door);

////////////////////////////////////////////////////////WATER///////////////////////////////////////////////////////////////////////////////////

//creating and adding water to the scene
const waterGeometry = new THREE.CircleGeometry(100, 1000);

var water;

water = new Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('Images/waternormals.jpg', function (texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    }
);
water.position.set(2300,-370,2500)

water.rotation.x = - Math.PI / 2;

scene.add(water);

//creating and adding cup to the scene
var cup = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/cup/cup.gltf', function (gltf) {
    cup = gltf.scene;
    cup.scale.set(15, 15, 15);
    cup.position.set(2400,-357,2500);
    cup.rotation.z = (Math.PI / 2);
    scene.add(cup);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//adding skybox to the scene
var box = skyBox();
box.scale.set(0.5, 0.5, 0.5);
box.translateY(14600);
scene.add(box);

//adding rticle to the scene
var qf = [2000, 1, 2000, 2000, 1, 2000, 2000, 1, 2000]
addReticle(cam, qf);
scene.add(cam);

//////////////////////////////////////////////////////////////ADDING OBJECTS TO THE SCENE////////////////////////////////////////////////////////////
//cone shape for sobject interaction pointer
const geometry = new THREE.ConeGeometry(20, 20, 4);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff99 });

//Ammo objects
var ammof = new THREE.Mesh(
    new THREE.BoxBufferGeometry(100, 100, 100),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
ammof.position.set(2100, -50, 200);
ammof.visible = false;
scene.add(ammof);

var AmmofPopup = new THREE.Mesh(geometry, material);
AmmofPopup.position.set(2100, -20, 200);
AmmofPopup.rotateZ(Math.PI);
scene.add(AmmofPopup);

//switch objects
var switchf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
switchf.position.set(1000, -10, 1550);
switchf.visible = false;
scene.add(switchf);

var switchfPopup = new THREE.Mesh(geometry, material);
switchfPopup.position.set(1000, 20, 1550);
switchfPopup.rotateZ(Math.PI);
scene.add(switchfPopup);

var switchf2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
switchf2.position.set(1000, -10, 200);
switchf2.visible = false;
scene.add(switchf2);

var switchf2Popup = new THREE.Mesh(geometry, material);
switchf2Popup.position.set(1000, 20, 200);
switchf2Popup.rotateZ(Math.PI);
scene.add(switchf2Popup);

//gun objects
var gunf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(150, 150, 150),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
gunf.position.set(-900, -120, 2600);
gunf.visible = false;
scene.add(gunf);

var gunfPopup = new THREE.Mesh(geometry, material);
gunfPopup.position.set(-900, -90, 2600);
gunfPopup.rotateZ(Math.PI);
scene.add(gunfPopup);

//bedroom light
var bedLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf', function (gltf) {
    bedLight = gltf.scene;
    bedLight.scale.set(175, 175, 200);
    bedLight.position.set(2150, 150, 1800);
    scene.add(bedLight);
});

//emergency light
var ELight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Warning Light/W Light.gltf', function (gltf) {
    ELight = gltf.scene;
    ELight.scale.set(30, 30, 30);
    ELight.rotation.z = 3 * Math.PI / 2;
    ELight.position.set(1780, 240, 1200);
    scene.add(ELight);
});

//hallway light
var hLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf', function (gltf) {
    hLight = gltf.scene;
    hLight.scale.set(175, 175, 200);
    hLight.position.set(1200, 150, 1800);
    scene.add(hLight);
});

//front roon light
var frLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf', function (gltf) {
    frLight = gltf.scene;
    frLight.scale.set(175, 175, 200);
    frLight.position.set(50, 150, 1300);
    scene.add(frLight);
});

//back room light
var brLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf', function (gltf) {
    brLight = gltf.scene;
    brLight.scale.set(175, 175, 200);
    brLight.position.set(50, 150, 2600);
    scene.add(brLight);
});

//ammo container object
var Ammo = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Ammo Box/AmmoBox.gltf', function (gltf) {
    Ammo = gltf.scene;
    Ammo.scale.set(20, 20, 20);
    Ammo.position.set(2100, -100, 200);
    scene.add(Ammo);
});

//event for ammo interaction
const ammoEvent = new THREEx.DomEvents(cam, renderer.domElement);

ammoEvent.addEventListener(ammof, 'dblclick', event => {
    scene.remove(Ammo);//must remove object
    scene.remove(AmmofPopup);
    Player.incAmmo();
});

//event for stwiches interactions and adding switches to the scene
var lswitch = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Switch/Switch.gltf', function (gltf) {
    lswitch = gltf.scene;
    lswitch.scale.set(200, 200, 200);
    lswitch.position.set(800, -200, 1750);
    scene.add(lswitch);
});

var switch1Event = new THREEx.DomEvents(cam, renderer.domElement);

switch1Event.addEventListener(switchf, 'dblclick', event => {
    isPlaying = true;
    playgame();
});

var lswitch2 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Switch/Switch.gltf', function (gltf) {
    lswitch2 = gltf.scene;
    lswitch2.scale.set(200, 200, 200);
    lswitch2.position.set(800, -200, 400);
    scene.add(lswitch2);
});

var switch2Event = new THREEx.DomEvents(cam, renderer.domElement);

switch2Event.addEventListener(switchf2, 'dblclick', event => {
    if (shotTagets == true && unLocked == true && Player.checkGun() != false && Player.getAmmo() > 0) {
        localStorage["playtime"] = parseInt(localStorage["playtime"]) + getDelta();
        window.location.href = "level2.html";
    } else {
        ShowHelp(true,cam);
        helpCounter = 60;
    }
});

//adding gun to scene and event for gun interaction
var pgun = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf', function (gltf) {
    pgun = gltf.scene;
    pgun.scale.set(175, 175, 175);
    pgun.rotation.z = (Math.PI / 2);
    pgun.position.set(-900, -170, 2600);
    scene.add(pgun);
});

var bullet1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 10),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
);
bullet1.scale.set(1, 2, 1);
bullet1.rotation.set(0, Math.PI/1.87, Math.PI/1.95);
bullet1.position.set(1.2, -0.5, -14);
bullet1.visible = false;
cam.add(bullet1);
scene.add(cam);

const gunEvent = new THREEx.DomEvents(cam, renderer.domElement);

gunEvent.addEventListener(gunf, 'dblclick', event => {
    scene.remove(pgun);
    scene.remove(gunfPopup);
    Player.pickUpGun();
    //adding gun to players hand after they pick it up

    var pistol = new THREE.Mesh();
    new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf', function (gltf) {
        pistol = gltf.scene;
        pistol.scale.set(3, 4, 4);
        pistol.rotation.y = Math.PI;
        pistol.position.z = -4;
        pistol.position.x = 2;
        pistol.position.y = -1;
        cam.add(pistol)
        scene.add(cam);
    });
});

//adding bedroom table to the scene
var bTable = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/table/Table.gltf', function (gltf) {
    bTable = gltf.scene;
    bTable.scale.set(175, 200, 175);
    bTable.rotation.y = (Math.PI / 2);
    bTable.position.set(2150, -400, 250);
    scene.add(bTable);
});

//adding bedrroom chair to the scene
var bChair = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/chair/Chair.gltf', function (gltf) {
    bChair = gltf.scene;
    bChair.scale.set(175, 200, 175);
    bChair.rotation.y = (Math.PI / 2);
    bChair.position.set(2050, -370, 300);
    scene.add(bChair);
});

//adding table to the lab
var Table = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/table/Table.gltf', function (gltf) {
    Table = gltf.scene;
    Table.scale.set(175, 155, 500);
    Table.position.set(-900, -400, 2800);
    scene.add(Table);
});

//adding chair to the lab
var Chair = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/chair/Chair.gltf', function (gltf) {
    Chair = gltf.scene;
    Chair.scale.set(175, 140, 175);
    Chair.position.set(-900, -370, 2600);
    scene.add(Chair);
});

//adding microscope objects to the lab
var mScope = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf', function (gltf) {
    mScope = gltf.scene;
    mScope.scale.set(50, 50, 50);
    mScope.rotation.y = (Math.PI / 2);
    mScope.position.set(-900, -170, 2300);
    scene.add(mScope);
});
var mScope1 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf', function (gltf) {
    mScope1 = gltf.scene;
    mScope1.scale.set(50, 50, 50);
    mScope1.rotation.y = (Math.PI / 2);
    mScope1.position.set(-900, -170, 2100);
    scene.add(mScope1);
});
var mScope2 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf', function (gltf) {
    mScope2 = gltf.scene;
    mScope2.scale.set(50, 50, 50);
    mScope2.rotation.y = (Math.PI / 2);
    mScope2.position.set(-900, -170, 2300);
    scene.add(mScope2);
});

//adding bed in the bedroom
var bed = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Bed/Bed.gltf', function (gltf) {
    bed = gltf.scene;
    bed.scale.set(200, 150, 150);
    //bed.rotation.y = (Math.PI/2);
    bed.position.set(2500, -400, 2900);
    scene.add(bed);
});

//adding shelf in bedroom
var shelf1 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/Shelf/Shelf.gltf', function (gltf) {
    shelf1 = gltf.scene;
    shelf1.scale.set(200, 300, 300);
    shelf1.rotation.y = (Math.PI / 2);
    shelf1.position.set(3150, -400, 300);
    scene.add(shelf1);
});

//adding shelf in the lab
var shelf2 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/Shelf/Shelf.gltf', function (gltf) {
    shelf2 = gltf.scene;
    shelf2.scale.set(200, 300, 300);
    shelf2.rotation.y = (Math.PI / 2);
    shelf2.position.set(500, -400, 2900);
    scene.add(shelf2);
});

//adding target to the frnt room
target1 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/target/target.gltf', function (gltf) {
    target1 = gltf.scene;
    target1.position.set(-1200, -100, 850);
    target1.scale.set(250, 250, 250);
    scene.add(target1);
});

//adding target objects and event for taget interaction
var targetf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(370, 370, 370),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
targetf.position.set(-1020, 150, 600);
targetf.visible = false;
scene.add(targetf);

var targetEvent = new THREEx.DomEvents(cam, renderer.domElement);

targetEvent.addEventListener(targetf, 'click', event => {
    if (Player.getAmmo() != 0 && Player.checkGun() == true) {
        scene.remove(target1);
        shotTagets = true;
    }
});

//creating and adding mirror to the scene
const geomet = new THREE.PlaneGeometry(490, 490);
verticalMirror = new Reflector(geomet, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x889999,
});
verticalMirror.position.set(2100, 25, 2940);
verticalMirror.rotation.y = Math.PI;
scene.add(verticalMirror);

//adding astronaut model
astro = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Astronaut/Astronauta1.gltf', function (gltf) {
    astro = gltf.scene;
    // camposition = new THREE.Vector3();
    // camposition.setFromMatrixPosition(cam.matrixWorld);
    // x = camposition.x;
    // z = camposition.z;
    view = 1;
    astro.position.z = 30;
    astro.rotation.y = Math.PI;
    // astro.rotation.x = Math.PI/8;
    astro.position.y = -420;
    astro.scale.set(200, 230, 200);
    cam.add(astro);
    scene.add(cam);
});

//creating an event for changing view
document.addEventListener('keydown', event => {
    if (event.code === "KeyV") {
        cam.remove(astro);
        if (view == 3){
            view = 1;
    astro.position.z = 30;
    astro.rotation.y = Math.PI;
    // astro.rotation.x = Math.PI/8;
    astro.position.y = -420;
    astro.scale.set(200, 230, 200);
    cam.add(astro);
    scene.add(cam);
        }else{
            view = 3;
    astro.position.z = -150;
    astro.rotation.y = Math.PI;
    astro.rotation.z = -Math.PI/30;
    astro.position.x = -30;
    astro.position.y = -380;
    astro.scale.set(150, 200, 150);
    cam.add(astro);
    scene.add(cam);
        }
    }
});


//calling HUD function and task function
HUD();
Tasks();

//initialize torch
initTorch();

document.body.appendChild(renderer.domElement);

//controls for player movement
let controls = new THREE.PointerLockControls(cam, renderer.domElement);
var lastKeyPressed;
let clock = new THREE.Clock();

function drawScene() {

    //waking up scene
    if (frame < 0.4) {
        flight.intensity = frame;
        elight.intensity = frame * 7.5;
        plight.intensity = frame;
        frrlight.intensity = frame;
        brrlight.intensity = frame;
        frame += 0.0015;
    }

    
    if (isPlaying == true) {//if the player is playing the game
        //hide HUD and TASKS
        RemoveHUD();
        RemoveTasks();

        //generate random lines for game
        let ran = Math.floor(Math.random() * 50);
        if (ran == 2) {

            if (lines.length < 4) {
                let line = new drawLine();
                cam.add(line);
                scene.add(cam);
                lines.push(line);
            }
        }
        //moving lines across the scene
        for (i = 0; i < lines.length; i++) {
            lines[i].position.x -= 0.01;
            if (lines[i].position.x < -1.55) {
                cam.remove(lines[i]);
                lines.splice(0, i);
            }
        }

        //check to to see if the game is finished
        if (success >= 5) {
            collidableMeshList.pop();
            EndGame();
            unLocked = true;
            scene.remove(switchfPopup);
        }
    } else if (paused == true) { //if paused dont do anything
    } else {
        //creating flashing lights using random numbers
        if (len == 0) {
            len = Math.floor(Math.random() * 10);
            ran = Math.floor(Math.random() * 20);
            if (ran == 2) {
                intensity = 0.2;
                flight.intensity = intensity;
                plight.intensity = intensity;
                frrlight.intensity = intensity;
                brrlight.intensity = intensity;
            } else {
                if (frame >= 0.4) {
                    intensity = 0.4;
                    flight.intensity = intensity;
                    elight.intensity = 3;
                    plight.intensity = intensity;
                    frrlight.intensity = intensity;
                    brrlight.intensity = intensity;
                }

            }
        } else {
            len = len - 1;
        }

        //check if door has been unlocked
        if (unLocked == true) {
            scene.remove(door);
        }

        //making water move
        water.material.uniforms[ 'time' ].value += 1 / 60.0;

        //checking if the player is close enough 
        checkPopUps();

        //rotating pop ups
        AmmofPopup.rotation.y += 0.02;
        switchfPopup.rotation.y += 0.02;
        switchf2Popup.rotation.y += 0.02;
        gunfPopup.rotation.y += 0.02;

        //help counter
        if (helpCounter == 0) {
            ShowHelp(false,cam);
        } else {
            helpCounter -= 1;
        }

    //     camposition = new THREE.Vector3();
    // camposition.setFromMatrixPosition(cam.matrixWorld);
    // x = camposition.x;
    // z = camposition.z;

    // astro.position.z = z-50;
    // astro.position.x = x;

        //updating tasks and hud
        HUD();
        Tasks();

    }

    if (bulletCount<=0){
        bullet1.visible = false;
    }else{
        bulletCount--;
    }


    renderer.render(scene, cam);
    checkCollision(cam, updateKeyboard, MovingCube);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

//function for checking popups
function checkPopUps() {
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition(cam.matrixWorld);
    x = camposition.x;
    y = camposition.z;
    //finder object
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition(ammof.matrixWorld);
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 700) {
        AmmofPopup.visible = true;
    } else {
        AmmofPopup.visible = false;
    }
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition(switchfPopup.matrixWorld);
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 700) {
        switchfPopup.visible = true;
    } else {
        switchfPopup.visible = false;
    }
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition(switchf2Popup.matrixWorld);
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 700) {
        switchf2Popup.visible = true;
    } else {
        switchf2Popup.visible = false;
    }
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition(gunfPopup.matrixWorld);
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 1500) {
        gunfPopup.visible = true;
    } else {
        gunfPopup.visible = false;
    }
}

//function for finishing the game
function EndGame() {
    if (lines.length > 0) {
        for (i = 0; i < lines.length; i++) {
            cam.remove(lines[i]);
        }
        for (i = 0; i < lines.length; i++) {
            lines.splice(0, i);
        }
    }
    ambientLight.intensity = 0.05;
    cam.remove(wall);
    cam.remove(wall1);
    cam.remove(wall2);
    cam.remove(wall3);
    cam.remove(rules);
    cam.remove(rulesText);
    cam.remove(rulesText2);
    isPlaying = false;
}

//function to start the game
function playgame() {
    ambientLight.intensity = 1;
    wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.8, 1.8, 5),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    wall.position.z = -5
    wall.position.x = -0.05;
    cam.add(wall);
    scene.add(cam);

    wall1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.6, 1.6, 5),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    wall1.position.z = -5;
    wall1.position.x = -0.05;
    cam.add(wall1);
    scene.add(cam);

    wall2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    wall2.position.z = -5;
    wall2.position.x = -0.05;
    cam.add(wall2);
    scene.add(cam);

    wall3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.1, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0xff0000 })
    );
    wall3.position.z = -5;
    wall3.position.x = -1;
    cam.add(wall3);
    scene.add(cam);

    var loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        let rulesGeo = new THREE.TextGeometry("Rules:", {

            font: font,

            size: 0.03,
            height: 0.001,
            curveSegments: 20,

        });

        let rulesTxtGeo = new THREE.TextGeometry("1. Press space bar when lines are inside the red area to score a point", {

            font: font,

            size: 0.02,
            height: 0.001,
            width: 0.0002,
            curveSegments: 20,

        });

        let rulesTxtGeo2 = new THREE.TextGeometry("2. Score 5 points to complete the game", {

            font: font,

            size: 0.02,
            height: 0.001,
            width: 0.0002,
            curveSegments: 20,

        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x110000 });

        rules = new THREE.Mesh(rulesGeo, textMaterial);
        rules.position.z = -1;
        rules.position.y = -0.08;
        rules.position.x = -0.62;

        rulesText = new THREE.Mesh(rulesTxtGeo, textMaterial);
        rulesText.position.z = -1;
        rulesText.position.y = -0.12;
        rulesText.position.x = -0.62;

        rulesText2 = new THREE.Mesh(rulesTxtGeo2, textMaterial);
        rulesText2.position.z = -1;
        rulesText2.position.y = -0.17;
        rulesText2.position.x = -0.62;

        cam.add(rules);
        cam.add(rulesText);
        cam.add(rulesText2);
        scene.add(cam);

    });
}


//window.addEventListener( 'mousemove', onMouseMove, false );

drawScene();

//lines for minigame
function drawLine() {
    let wall4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.02, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    wall4.position.z = -5;
    wall4.position.x = 1.45;

    return wall4;
}

// space bar for game interaction
document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        if (lines.length > 0) {
            line = lines[0];
            if (line.position.x < -0.93 && line.position.x > -1.052) {
                success++;
            }
            cam.remove(lines[0]);
            lines.shift();
        }
    }
});


//function for removing tasks
function RemoveTasks() {
    check = document.getElementById("task");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("task1");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    check1 = document.getElementById("task2");
    if (check1 != null) {
        check1.parentNode.removeChild(check1);
    }
    check = document.getElementById("task3");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
}

//function for adding tasks to the scene
function Tasks() {
    check = document.getElementById("task");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("task1");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    check1 = document.getElementById("task2");
    if (check1 != null) {
        check1.parentNode.removeChild(check1);
    }
    check = document.getElementById("task3");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    let task = document.createElement('div');
    task.id = "task";
    task.style.position = 'absolute';
    task.style.color = "white";
    task.style.fontSize = window.innerWidth * 0.01 + "px";
    task.style.letterSpacing = window.innerWidth * 0.001 + "px";
    task.style.fontFamily = "Helvetica";
    task.style.width = 200;
    task.style.height = 500;
    task.innerHTML = "Task(s)";
    task.style.top = window.innerHeight * 0.2 + 'px';
    task.style.left = window.innerWidth * 0.02 + 'px';

    let task1 = document.createElement('div');
    task1.id = "task1";
    task1.style.position = 'absolute';
    task1.style.color = "white";
    task1.style.fontSize = window.innerWidth * 0.01 + "px";
    task1.style.letterSpacing = window.innerWidth * 0.001 + "px";
    task1.style.fontFamily = "Helvetica";
    task1.style.width = 200;
    task1.style.height = 500;
    task1.innerHTML = "> Pick up Gun and ammo";
    task1.style.top = window.innerHeight * 0.23 + 'px';
    task1.style.left = window.innerWidth * 0.02 + 'px';

    let task2 = document.createElement('div');
    task2.id = "task2";
    task2.style.position = 'absolute';
    task2.style.color = "white";
    task2.style.fontSize = window.innerWidth * 0.01 + "px";
    task2.style.letterSpacing = window.innerWidth * 0.001 + "px";
    task2.style.fontFamily = "Helvetica";
    task2.style.width = 200;
    task2.style.height = 500;
    task2.innerHTML = "> Unlock Door";
    task2.style.top = window.innerHeight * 0.26 + 'px';
    task2.style.left = window.innerWidth * 0.02 + 'px';

    let task3 = document.createElement('div');
    task3.id = "task3";
    task3.style.position = 'absolute';
    task3.style.color = "white";
    task3.style.fontSize = window.innerWidth * 0.01 + "px";
    task3.style.letterSpacing = window.innerWidth * 0.001 + "px";
    task3.style.fontFamily = "Helvetica";
    task3.style.width = 200;
    task3.style.height = 500;
    task3.innerHTML = "> Shoot Targets";
    task3.style.top = window.innerHeight * 0.29 + 'px';
    task3.style.left = window.innerWidth * 0.02 + 'px';


    document.body.appendChild(task);
    if (Player.checkGun() == 0 || Player.getAmmo() == 0) {
        document.body.appendChild(task1);
    }
    if (unLocked == false) {
        document.body.appendChild(task2);
    }
    if (shotTagets == false) {
        document.body.appendChild(task3);
    }
}