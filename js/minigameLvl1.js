const scene = new THREE.Scene();

scene.background = new THREE.Color(0x0000ff);

var isPlaying = false;
var success = 0;

var lines = [];

var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(innerWidth, innerHeight);
cam.position.set(2100, 50, 200);
cam.lookAt(2900, 0, 2000);

var ambientLight = new THREE.AmbientLight(0xffffff, 1);//0.05
scene.add(ambientLight);
//adding directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(100, 300, 300);
//scene.add(dirLight);

const wall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3.8, 1.8, 5),
    new THREE.MeshLambertMaterial({ color: 0x696969 })
);
wall.position.z = -5;
wall.position.x = -0.05;
cam.add(wall);
scene.add(cam);

const wall1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3.6, 1.6, 5),
    new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
);
wall1.position.z = -5;
wall1.position.x = -0.05;
cam.add(wall1);
scene.add(cam);

const wall2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 0.1, 5),
    new THREE.MeshLambertMaterial({ color: 0x000000 })
);
wall2.position.z = -5;
wall2.position.x = -0.05;
cam.add(wall2);
scene.add(cam);

const wall3 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.1, 0.1, 5),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
wall3.position.z = -5;
wall3.position.x = -1;
cam.add(wall3);
scene.add(cam);

document.body.appendChild(renderer.domElement);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);


let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', () => {
    controls.lock();
});

let keyboard = [];
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
});
function processKeyboard() {
    var speed = 15
    if (keyboard['w']) {
        controls.moveForward(speed);
    }
    else if (keyboard['a']) {
        controls.moveRight(-speed);
    }
    else if (keyboard['s']) {
        controls.moveForward(-speed);
    }
    else if (keyboard['d']) {
        controls.moveRight(speed);
    }
    else if (keyboard['r']) {
        controls.lock();
    }
}

function drawScene() {
    //wall4.position.x -= 0.01;
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}


document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        if (lines.length > 0){
            line = lines[0];
            if (line.position.x<-0.93 && line.position.x>-1.052){
                success++;
            }
            cam.remove(lines[0]);
            lines.shift();
        }
    }
});
drawScene();

// const finder = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(200,200,200),
//     new THREE.MeshLambertMaterial({color: 0xffffff})
// );
// finder.position.set(2500,25,1500);
// scene.add(finder);

function Line() {
    const wall4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.02, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    wall4.position.z = -5;
    wall4.position.x = 1.45;

    return wall4;
}