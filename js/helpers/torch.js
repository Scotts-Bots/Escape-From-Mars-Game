//Functional torch that is equipped when player presses Q.

//boolean to check if torch is equipped
var torchEquipped = false;

var lookAtVector, torch, spotlight, torchPointLight;

function initTorch(){
    //reticle position
    // lookAtVector = new THREE.Vector3(0,0, -1);
    // lookAtVector.applyQuaternion(pauseCam.quaternion);

    //spotlight for torch
    // spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( -30, -20, -60);
    // spotLight.target.position.set(lookAtVector.x,lookAtVector.y,lookAtVector.z);
    // spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;
    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;

    torchPointLight = new THREE.PointLight( 0xffffff, 0.8, 3000, 3);
    torchPointLight.position.set(-30,-20,-100);
    torchPointLight.castShadow = true; // default false
    //pauseCam.add(torchPointLight);

    //torch blender model
    torch = new THREE.Mesh();
    gltfLoader.load('Blender Models/torch/torch.gltf' , function (gltf)  {
        torch = gltf.scene;
        torch.scale.set(100,100,100);
        torch.position.set(-30,-20,-50);
        torch.rotateX(-Math.PI/2);
        torch.rotateY(-3*Math.PI/4);
        //pauseCam.add(torch);
    });
}

//Event listener to check if player presses Q
document.addEventListener('keydown', event => {
    if (event.code === "KeyQ") {
        if (torchEquipped) {
            pauseCam.remove(torchPointLight);
            pauseCam.remove(torch);
            torchEquipped = false;
        } else {
            pauseCam.add(torch); // uses function above to load blender model and add to camera
            pauseCam.add(torchPointLight);
            torchEquipped = true;
        }
    }
});
