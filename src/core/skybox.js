function skyBox(){
    const textureLoader = new THREE.TextureLoader();
    var materialArray = [];

    var texture_ft = textureLoader.load('Images/marslike01ft2.jpg');
    var texture_bk = textureLoader.load('Images/marslike01bk2.jpg');
    var texture_up = textureLoader.load('Images/marslike01up.jpg');
    var texture_dn = textureLoader.load('Images/marslike01dn1.jpg');
    var texture_rt = textureLoader.load('Images/marslike01rt1.jpg');
    var texture_lt = textureLoader.load('Images/marslike01lf1.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map : texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_lt}));

    for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }       

    var skyBoxGeometry = new THREE.BoxGeometry(200000,60000,200000);
    var skyBox = new THREE.Mesh(skyBoxGeometry,materialArray);

    return skyBox;
}