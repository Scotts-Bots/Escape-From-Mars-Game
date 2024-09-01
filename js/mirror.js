
const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 5;
cam.position.y = 0;
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

geometry = new THREE.PlaneGeometry(100, 100);
verticalMirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x889999,
});
verticalMirror.position.y = 0;
verticalMirror.position.x = 15;
verticalMirror.position.z = - 5;
scene.add(verticalMirror);

geometry1 = new THREE.PlaneGeometry(10, 10);
let bMat2 = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false });
verticalMirror1 = new  Mesh(geometry1, bMat2);
verticalMirror1.position.y = 0;
verticalMirror1.position.x = 15;
verticalMirror1.position.z = - 5;
scene.add(verticalMirror1);

let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({ color: 0x00ff00, wireframe: false });
let cube = new THREE.Mesh(bGeo, bMat);
scene.add(cube);

let bGeo1 = new THREE.BoxGeometry(1, 1, 1);
let bMat1 = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: false });
let cube1 = new THREE.Mesh(bGeo1, bMat1);
cam.add(cube1);
scene.add(cam);

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
    var speed = 0.1;
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
}

function drawScene() {
    renderer.render(scene, cam);
    processKeyboard()
    requestAnimationFrame(drawScene);
}

drawScene();