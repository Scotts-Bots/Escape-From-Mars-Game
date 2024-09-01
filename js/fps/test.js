var scene, camera, renderer, mesh, clock;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap, gun, MovingCube;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02, canShoot:0};
var USE_WIREFRAME = false;

var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;

// Meshes index
var meshes = {};

var bullets = [];

function init(){
	//Setting scene and clock
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	clock = new THREE.Clock();
	
	loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);
	
	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
		onResourcesLoaded();
	};
	
	//Setting up objects
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	// mesh.receiveShadow = true;
	// mesh.castShadow = true;
	//scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	//Lighting
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	// light.castShadow = true;
	// light.shadow.camera.near = 0.1;
	// light.shadow.camera.far = 25;
	scene.add(light);
	
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	scene.add(crate);
	crate.position.set(2.5, 3/2, 2.5);
	var cubeGeometry = new THREE.BoxBufferGeometry(1,2,1,5,5,5);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
	MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
	MovingCube.position.set(0,0,0);
	
	

    pistol = new THREE.Mesh();
    new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
        pistol = gltf.scene;
        // pistol.traverse(function (node){
        //     if (node.isMesh){
        //         node.castShadow = true;
        //     }
        // });
        scene.add(pistol);
    });
    
    gun = new THREE.Mesh();
    new THREE.GLTFLoader().load('Blender Models/Laser Turret/LaserTurret.gltf' , function (gltf)  {
        gun = gltf.scene;
        // gun.traverse(function (node){
        //     if (node.isMesh){
        //         node.castShadow = true;
        //     }
        // });
		setCollisionDetection(gun, MovingCube);
        scene.add(gun);
    });
	

	
	
	
	camera.position.set(0, player.height-1, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function inRadius(r, a, b, c){
    if (Math.pow(a - position.x, 2) + Math.pow(b - position.y, 2) + Math.pow(c - position.z, 2) <= Math.pow(r, 2)){
        crate.material.color.setHex(0xff0000);
        return 0;
    }
    else{
        crate.material.color.setHex(0x00ff00);
        return 1;
    }
}

//process keyboard
function processKeyboard(){
    if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	window.addEventListener("mousedown", function(){
		var bullet = new THREE.Mesh(
			new THREE.SphereGeometry(0.05, 8, 8),
			new THREE.MeshBasicMaterial({color: 0xffffff})
		);

		bullet.position.set(
			pistol.position.x,
			pistol.position.y,
			pistol.position.z,
		);

		bullet.velocity = new THREE.Vector3(
			-Math.sin(camera.rotation.y),
			0,
			Math.cos(camera.rotation.y)
		);

		bullet.alive = true;
		setTimeout(function(){
			bullet.alive = false;
			scene.remove(bullet);
		}, 1000);
		
		collidableMeshList.push(bullet);
		bullets.push(bullet);
		scene.add(bullet);
		player.canShoot = 10;
	});
	if (player.canShoot > 0) player.canShoot -= 1;
}

//rotate turret towards player if in certain range
function turnTurret(r){
	if (Math.pow(camera.position.x - gun.position.x, 2) + Math.pow(camera.position.y - gun.position.y, 2) + Math.pow(camera.position.z - gun.position.z, 2) <= Math.pow(r, 2)){
		var ang = Math.atan2( ( camera.position.x - gun.position.x ), ( camera.position.z - gun.position.z ) );
		gun.rotation.y = ang;
	}
}

//hit detection
function hitCrate(isCollision){
	if (isCollision){
		appendText(" Hit ");
		crate.material.color.setHex(0x00ff00);
	}
}

function animate(){

	requestAnimationFrame(animate);
	
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();
	
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;
	//crate.rotation.y += 0.1;
	// Uncomment for absurdity!
	// meshes["pirateship"].rotation.z += 0.01;
    turnTurret(10);
	checkCollision(gun, hitCrate, MovingCube);

	for (var index = 0; index < bullets.length; index+=1){
		if (bullets[index] == undefined) continue;
		if (bullets[index].alive == false){
			bullets.splice(index, 1);
			continue;
		}
		bullets[index].position.add(bullets[index].velocity);
	}
	
	processKeyboard();

    pistol.position.set(
		camera.position.x - Math.sin(camera.rotation.y + Math.PI/6) * 0.75,
		camera.position.y - 0.5 + Math.sin(time*4 + camera.position.x + camera.position.z)*0.01,
		camera.position.z + Math.cos(camera.rotation.y + Math.PI/6) * 0.75
	);
	pistol.rotation.set(
		camera.rotation.x,
		camera.rotation.y - Math.PI,
		camera.rotation.z
	);
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;