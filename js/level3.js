//LEVEL 3//

//scene
const scene = new THREE.Scene();

//camera and renderer
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 200000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2000, 50, -14000);
cam.lookAt(5000, 0, -50000);
//cam.lookAt(-2000,0,15000)
document.body.appendChild(renderer.domElement);

//music for outside level
const listener = new THREE.AudioListener();
cam.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('Sounds/Outside ambience.wav', function(buffer){
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

//player hitbox
var cubeGeometry = new THREE.BoxBufferGeometry(200, 200, 200, 3, 3, 3);
var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
MovingCube.position.set(0, 0, 0);
//setting collision detection to camera which is the player
setCollisionDetection(cam, MovingCube); 

//LIGHTING
//directional light
var directionalLight = new THREE.PointLight(0xffdead, 0.7);
directionalLight.position.set(47500, 8000, 20000);
directionalLight.castShadow = true;
scene.add(directionalLight);
//ambient light
var ambientLight = new THREE.AmbientLight(0xffdead, 0.45);//0.05
scene.add(ambientLight);

// const finder = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(5000, 5000, 5000),
//     new THREE.MeshLambertMaterial({ color: 0xffffff })
// );
// finder.position.set(47500, 8000, 20000);
// scene.add(finder);

//setting camera for pause menu
pauseCam = cam;

//SCENE MODELING - actual scene stored in floor1.js
const room = Room();
room.scale.set(4, 8, 5);
room.position.set(0, 300, 0);
room.rotateX(3 * Math.PI / 2);
room.castShadow = true;
scene.add(room);

//skybox
const box = skyBox();
box.translateY(29600);
box.receiveShadow = true;
scene.add(box);

//mouse pointing
let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

//enemy models
var enemy1, enemy2, enemy3, enemy4, bullet;
var frameCount = 0;

//enemy hitboxes and counters
var enemy1HitCount=0, enemy2HitCount=0, enemy3HitCount=0, enemy4HitCount=0;
var enemy1Hitbox, enemy2Hitbox, enemy3Hitbox, enemy4Hitbox;

//moving rover model
var rover;
var roverCount = 0;
var otank1, otank2;

//loading blender models
const gltfLoader = new THREE.GLTFLoader();
loadAssets();

//reticle and HUD
var qf = [2000, 1, 2000, 2000, 1, 2000, 2000, 1, 2000];
addReticle(cam, qf);
scene.add(cam);
HUD();
Tasks();

//sandstorm
particleSystem();

//event for shooting
var bulletCount = 0;

window.addEventListener( 'mousedown', Attack, false );

function Attack(){
    if (Player.getAmmo()>0){
        bullet1.visible = true;
        Player.decAmmo();
        bulletCount = 2;
    }
}

//initialize torch
initTorch();

//ACTION!
drawScene();

//ADDING ALL THE BLENDER MODELS INTO THE SCENE
function loadAssets() {
    ////////////////////////////////////////rock assets////////////////////////////////////////
    var rock1 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/Rocks/Rock3.gltf', function (gltf) {
        rock1 = gltf.scene;
        rock1.scale.set(10000, 10000, 10000);
        rock1.position.set(47500, 0, 20000);
        scene.add(rock1);
    });
    var rock2 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/Rocks/Rock3.gltf', function (gltf) {
        rock2 = gltf.scene;
        rock2.scale.set(10000, 10000, 10000);
        rock2.position.set(47500, -1000, 20000);
        scene.add(rock2);
    });
    var rock3 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/Rocks/Rock1.gltf', function (gltf) {
        rock3 = gltf.scene;
        rock3.scale.set(10000, 10000, 10000);
        rock3.position.set(100500, -10000, 100000);
        scene.add(rock3);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //rocket model with rocket hitbox
    var rocket = new THREE.Mesh();
    gltfLoader.load('Blender Models/rocketship/rocket.gltf', function (gltf) {
        rocket = gltf.scene;
        rocket.scale.set(75, 75, 75);
        rocket.position.set(5000, -2000, -50000);
        scene.add(rocket);
    });

    const rocketf = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4000, 30000, 4000),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    rocketf.position.set(5000, -2000, -50000);
    rocketf.visible = false;
    scene.add(rocketf);

    const RocketClick = new THREEx.DomEvents(cam, renderer.domElement);

    RocketClick.addEventListener(rocketf, 'dblclick', event => {
        camposition = new THREE.Vector3();
        camposition.setFromMatrixPosition(cam.matrixWorld);
        x = camposition.x;
        y = camposition.z;
        //finder object
        finderposition = new THREE.Vector3();
        finderposition.setFromMatrixPosition(rocketf.matrixWorld);
        fx = finderposition.x;
        fy = finderposition.z;
        if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 10000) {
            localStorage["playtime"] = parseInt(localStorage["playtime"]) + getDelta();
            //alert(localStorage["playtime"] + " secs");

            //update leaderboard
            
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + "-" + mm + '-' + dd ;
            localStorage["scores"] += localStorage["name"]+","+today+","+localStorage["playtime"] + ",";
            console.log(localStorage["scores"]);
            window.location.href = "WinGame.html";
        } else {
            console.log(Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)));
        }
    });

    //gun and laser bullet for gun
    bullet1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 10),
        new THREE.MeshBasicMaterial({color: 0x0000ff})
    );
    bullet1.scale.set(1, 2, 1);
    bullet1.rotation.set(0, Math.PI/1.87, Math.PI/1.95);
    bullet1.position.set(1.2, -0.5, -14);
    bullet1.visible = false;
    cam.add(bullet1);
    scene.add(cam);

    var pistol = new THREE.Mesh();
    gltfLoader.load('Blender Models/GunModel/Gun Model.gltf', function (gltf) {
        pistol = gltf.scene;
        pistol.scale.set(3, 4, 4);
        pistol.rotation.y = Math.PI;
        pistol.position.z = -4;
        pistol.position.x = 2;
        pistol.position.y = -1;
        cam.add(pistol);
        scene.add(cam);
    });

    //////////////////////////enemies and the trajectory bullets for enemies/////////////////////////////////////////////
    bullet2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    bullet2.scale.set(500, 500, 500);
    bullet2.position.set(2000, 100, -20000);

    enemy1 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
        enemy1 = gltf.scene;
        enemy1.scale.set(350, 350, 350);
        enemy1.position.x = 100*Math.cos(frameCount) + 2000;
        enemy1.position.y = 100;
        enemy1.position.z = 100*Math.sin(frameCount) - 20000;
        scene.add(bullet2);
        scene.add(enemy1);
    });

    //hit detection implemented for enemies
    enemy1Hitbox = new THREE.Mesh(
        new THREE.BoxBufferGeometry(500, 500, 500),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    enemy1Hitbox.position.x = 100*Math.cos(frameCount) + 2050;
    enemy1Hitbox.position.y = 100;
    enemy1Hitbox.position.z = 100*Math.sin(frameCount) - 20000;
    enemy1Hitbox.visible = false;
    scene.add(enemy1Hitbox);
    
    const attackEnemy1 = new THREEx.DomEvents(cam, renderer.domElement);
    
    attackEnemy1.addEventListener(enemy1Hitbox, 'click', event => {
        
        if (Player.getAmmo() > 0){
            enemy1HitCount++;
            Player.decAmmo();
            if (enemy1HitCount >= 3){
                scene.remove(enemy1);
                scene.remove(bullet2);
                scene.remove(enemy1Hitbox);
            }
        }
    });

    bullet = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    bullet.scale.set(500, 500, 500);

    enemy2 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Laser Turret/LaserTurret.gltf', function (gltf) {
        enemy2 = gltf.scene;
        enemy2.scale.set(350, 350, 350);
        enemy2.position.x = 100*Math.cos(frameCount) + 7000;
        enemy2.position.y = -400;
        enemy2.position.z = 100*Math.sin(frameCount) - 15000;
        bullet.position.set(7000, -210, -15000);
        scene.add(bullet);
        scene.add(enemy2);
    });

    enemy2Hitbox = new THREE.Mesh(
        new THREE.BoxBufferGeometry(500, 500, 500),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    enemy2Hitbox.position.x = 100*Math.cos(frameCount) + 7000;
    enemy2Hitbox.position.y = -400;
    enemy2Hitbox.position.z = 100*Math.sin(frameCount) - 15000;
    enemy2Hitbox.visible = false;
    scene.add(enemy2Hitbox);
    
    const attackEnemy2 = new THREEx.DomEvents(cam, renderer.domElement);
    
    attackEnemy2.addEventListener(enemy2Hitbox, 'click', event => {
        
        if (Player.getAmmo() > 0){
            enemy1HitCount++;
            Player.decAmmo();
            if (enemy1HitCount >= 3){
                scene.remove(enemy2);
                scene.remove(bullet);
                scene.remove(enemy2Hitbox);
            }
        }
    });

    bullet3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    bullet3.scale.set(500, 500, 500);
    bullet3.position.set(2000, 100, -20000);

    enemy3 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
        enemy3 = gltf.scene;
        enemy3.scale.set(350, 350, 350);
        enemy3.position.x = 100*Math.cos(frameCount) + 5000;
        enemy3.position.y = 100;
        enemy3.position.z = 100*Math.sin(frameCount) - 30000;
        scene.add(bullet3);
        scene.add(enemy3);
    });

    enemy3Hitbox = new THREE.Mesh(
        new THREE.BoxBufferGeometry(500, 500, 500),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    enemy3Hitbox.position.y = 100;
    enemy3Hitbox.position.x = 2000*Math.cos(frameCount) + 5050;
    enemy3Hitbox.position.z = 6000*Math.sin(frameCount) - 30000;
    enemy3Hitbox.visible = false;
    scene.add(enemy3Hitbox);
    
    const attackEnemy3 = new THREEx.DomEvents(cam, renderer.domElement);
    
    attackEnemy3.addEventListener(enemy3Hitbox, 'click', event => {
        
        if (Player.getAmmo() > 0){
            enemy1HitCount++;
            Player.decAmmo();
            if (enemy1HitCount >= 3){
                scene.remove(enemy3);
                scene.remove(bullet3);
                scene.remove(enemy3Hitbox);
            }
        }
    });

    bullet4 = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    bullet4.scale.set(500, 500, 500);
    bullet4.position.set(2000, 100, -20000);

    enemy4 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
        enemy4 = gltf.scene;
        enemy4.scale.set(350, 350, 350);
        enemy4.position.x = 100*Math.cos(frameCount) - 1000;
        enemy4.position.y = 100;
        enemy4.position.z = 100*Math.sin(frameCount) - 27000;
        scene.add(bullet4);
        scene.add(enemy4);
    });

    enemy4Hitbox = new THREE.Mesh(
        new THREE.BoxBufferGeometry(500, 500, 500),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    enemy4Hitbox.position.y = 100;
    enemy4Hitbox.position.x = 4200*Math.cos(frameCount) - 1000;
    enemy4Hitbox.position.z = 5700*Math.sin(frameCount) - 27000;
    enemy4Hitbox.visible = false;
    scene.add(enemy4Hitbox);
    
    const attackEnemy4 = new THREEx.DomEvents(cam, renderer.domElement);
    
    attackEnemy4.addEventListener(enemy4Hitbox, 'click', event => {
        
        if (Player.getAmmo() > 0){
            enemy4HitCount++;
            Player.decAmmo();
            if (enemy4HitCount >= 3){
                scene.remove(enemy4);
                scene.remove(bullet4);
                scene.remove(enemy4Hitbox);
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //mars rover model
    rover = new THREE.Mesh();
    gltfLoader.load('Blender Models/Rover/Rover.gltf', function (gltf) {
        rover = gltf.scene;
        rover.scale.set(150, 150, 150);
        rover.position.x = 100*Math.cos(frameCount) - 1000;
        rover.position.y = -400;
        rover.position.z = 100*Math.sin(frameCount) - 27000;
        scene.add(rover);
    });

    //health pack model
    otank1 = new THREE.Mesh();
    gltfLoader.load('Blender Models/Health Packs/HealthPack.gltf', function (gltf) {
        otank1 = gltf.scene;
        otank1.scale.set(100, 100, 100);
        otank1.position.set(-20000, -250, -11000);
        scene.add(otank1);
    });

    //oxygen tank model
    otank2 = new THREE.Mesh();
    gltfLoader.load('Blender Models/oxygen tank/Otank.gltf', function (gltf) {
        otank2 = gltf.scene;
        otank2.scale.set(100, 100, 100);
        otank2.position.set(-7000, -250, -22000);
        scene.add(otank2);
    });
}

//translation functions to have bullet from enemies travel towards the player
function lerp(a, b, t) {return a + (b - a) * t}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
var t = 0;
function loop(mesh, x, y, z){
    var newX = lerp(mesh.position.x, x, t);
    var newY = lerp(mesh.position.y, y, t);
    var newZ = lerp(mesh.position.z, z, t);
    t += 0.0002;
    mesh.position.set(newX, newY, newZ);
}

//have the enemy track the player within a certain radius
function turnTurret(r, obj, bullet, x, y, z) {
    //check if player is in enemy radius
    if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)) {
        //determine which direction to look at player
        var ang = Math.atan2((cam.position.x - obj.position.x), (cam.position.z - obj.position.z));
        //turn towards player
        obj.rotation.y = ang;
        ran = Math.floor(Math.random() * 20);
        loop(bullet, cam.position.x, cam.position.y, cam.position.z)
        if (ran == 2){
            //decrease health when being shot
            Player.decHealth(1);
        }
    } else {
        //return to enemy
        bullet.position.set(x, y, z);
    }
}

//replenish health when picking up health pack
function getPacks(r, obj) {
    if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)) {
        Player.resetHealth();
        scene.remove(obj);
        
    }
}

//replenish oxygen when picking up oxygen tank
function getAir(r, obj) {
    if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)) {
        Player.resetOxygen();
        scene.remove(obj);
        
    }
}

function drawScene() {
    renderer.render(scene, cam);
    otank1.rotation.y += 0.05;
    otank2.rotation.y += 0.05;
    checkCollision(cam, updateKeyboard, MovingCube);
    processKeyboard();
    turnTurret(5000, enemy1, bullet2, enemy1.position.x, enemy1.position.y, enemy1.position.z);
    turnTurret(5000, enemy2, bullet, 7000, -210, -15000);
    turnTurret(5000, enemy3, bullet3, enemy3.position.x, enemy3.position.y, enemy3.position.z);
    turnTurret(5000, enemy4, bullet4, enemy4.position.x, enemy4.position.y, enemy4.position.z);
    getPacks(500, otank1);
    getAir(500, otank2);

    requestAnimationFrame(drawScene);
    

    //decrease player health through level
    if (Player.getHealth() <= 0) {
        window.location.href = "GameOver.html";
    }else{
        if (Player.getOxygen() == 0) {
            //decrease health when oxygen runs out
            Player.decHealth(0.07);
        } else {
            Player.decHealth(0.03);
            Player.decOxygen(0.07);
        }
    }

    //enemy and rover movements
    enemy1.position.x = 9000*Math.cos(frameCount) + 2000;
    enemy1.position.z = 1000*Math.sin(frameCount) - 20000;
    enemy1Hitbox.position.x = 9000*Math.cos(frameCount) + 2050;
    enemy1Hitbox.position.z = 1000*Math.sin(frameCount) - 20000;
    enemy3.position.x = 2000*Math.cos(frameCount) + 5000;
    enemy3.position.z = 6000*Math.sin(frameCount) - 30000;
    enemy3Hitbox.position.x = 2000*Math.cos(frameCount) + 5050;
    enemy3Hitbox.position.z = 6000*Math.sin(frameCount) - 30000;
    enemy4.position.x = 4200*Math.cos(frameCount) - 1000;
    enemy4.position.z = 5700*Math.sin(frameCount) - 27000;
    enemy4Hitbox.position.x = 4200*Math.cos(frameCount) - 1000;
    enemy4Hitbox.position.z = 5700*Math.sin(frameCount) - 27000;
    rover.position.x = 12000*Math.cos(roverCount) + 2000;
    rover.position.z = 6000*Math.sin(roverCount) - 27000;
    rover.rotation.y = (-roverCount % 360);

    roverCount+=0.002;
    frameCount+=0.007;
    HUD();
    Tasks();
    updateParticleSystem();
    //determine if the player has ammo, shoot if yes
    if (bulletCount<=0){
        bullet1.visible = false;
    }else{
        bulletCount--;
    }
}

//display current tasks on screen
function Tasks() {
    check = document.getElementById("task");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("task1");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    var task = document.createElement('div');
    task.id = "task";
    task.style.position = 'absolute';
    task.style.color = "white";
    task.style.fontSize = window.innerWidth*0.01+"px";
    task.style.letterSpacing = window.innerWidth*0.001+"px";
    task.style.fontFamily = "Helvetica";
    task.style.width = 200;
    task.style.height = 500;
    task.innerHTML = "Task(s)";
    task.style.top = window.innerHeight*0.2 + 'px';
    task.style.left = window.innerWidth*0.02 + 'px';

    var task1 = document.createElement('div');
    task1.id = "task1";
    task1.style.position = 'absolute';
    task1.style.color = "white";
    task1.style.fontSize = window.innerWidth*0.01+"px";
    task1.style.letterSpacing = window.innerWidth*0.001+"px";
    task1.style.fontFamily = "Helvetica";
    task1.style.width = 200;
    task1.style.height = 500;
    task1.innerHTML = "> Get to the rocketship";
    task1.style.top = window.innerHeight*0.23 + 'px';
    task1.style.left = window.innerWidth*0.02 + 'px';

    document.body.appendChild(task);
    document.body.appendChild(task1);
}