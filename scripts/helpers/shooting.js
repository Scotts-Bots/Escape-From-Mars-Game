var bullets = [];
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02, canShoot:0};

function addShooting(){
    // scene = new THREE.Scene();
	// camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	// clock = new THREE.Clock();

    pistol = new THREE.Mesh();
    new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
        pistol = gltf.scene;
        scene.add(pistol);
    });

    // camera.position.set(0, player.height-1, -5);
	// camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	// renderer = new THREE.WebGLRenderer();
	// renderer.setSize(1280, 720);

	// renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.BasicShadowMap;
	
	// document.body.appendChild(renderer.domElement);

    animate();
}

function controls(){
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

function animate(){

	requestAnimationFrame(animate);
	
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	//checkCollision(gun, hitCrate, MovingCube);

	for (var index = 0; index < bullets.length; index+=1){
		if (bullets[index] == undefined) continue;
		if (bullets[index].alive == false){
			bullets.splice(index, 1);
			continue;
		}
		bullets[index].position.add(bullets[index].velocity);
	}
	
	controls();

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

window.onload = addShooting;