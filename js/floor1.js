//SCENE MODELLING FOR LEVEL 1

//texture image
const materialimg = new THREE.MeshPhongMaterial();
materialimg.map = new THREE.TextureLoader().load('Images/wall_texture.jpg');

//generic wall mesh
function Wall(x, y, z) {
    var wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        materialimg
    );
    collidableMeshList.push(wall); //add wall to objects that affect collision detection
    return wall;
}

//window mesh
function Window1(x, y, z) {
    var window = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.8})
    );
    collidableMeshList.push(window); //add window to objects that affect collision detection
    return window;
}

//entire room of level
function Room() {

    // D - DOOR     | - WALL
    //               [b1]                  [b12]              [b2]
    // ||||||||||||||||||||||||||||||||||||D D D|||||||||||||||||||||||||
    // |                            |                 |                 |   
    // |                            |[b7]             |[b11]            |
    // |[b3]                        |                 |                 |[b6]
    // |                            D                 D                 |
    // |                            D[b78]            D[b1112]          |
    // |                            D                 D                 |
    // |            [b4]            |[b8]             |                 | 
    // ||||||||||||||||||||||||||||||                 |                 |[b613][b14][window]
    // |                            |[b9]             |                 | 
    // |                            D                 |                 |
    // |                            D[b910]           |[b_12]           |
    // |                            D                 |                 |
    // |[b3]                        |                 |                 |[b13]
    // |                            |[b10]            |                 |
    // |                            |                 |                 |
    // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||  
    //               [b5]                   [b5]              [b5]       

    var room = new THREE.Group();

    var b1 = Wall(553, 25, 300);
    var b12 = Wall(100, 25, 100);
    var b2 = Wall(450, 25, 300);
    var b3 = Wall(750, 25, 300);
    var fl = Wall(775, 1100, 10);
    fl.receiveShadow = true;
    var b4 = Wall(500, 25, 300);
    var b5 = Wall(1100, 25, 300);
    var b6 = Wall(225, 25, 300);
    var b7 = Wall(240, 25, 300);
    b7.receiveShadow = true;
    b7.castShadow = true;
    var b78 = Wall(100, 25, 100);
    var b8 = Wall(30, 25, 300);
    //var b9 = Wall(30, 25, 300);
    var b910 = Wall(100, 25, 100);
    var b10 = Wall(240, 25, 300);
    var b11 = Wall(240, 25, 300);
    b11.castShadow = true;
    var b1112 = Wall(100, 25, 100);
    b1112.castShadow = true;
    var b_12 = Wall(410, 25, 300);
    b_12.castShadow = true;
    var b613 = Wall(400, 25, 70);
    var b13 = Wall(225, 25, 300);
    var b14 = Wall(400, 25, 70);
    var window = Window1(400,23,160);
    var roof = Wall(775, 1100, 10);

    b1.translateX(10);
    b3.rotateZ(Math.PI / 2);
    b12.translateX(335);
    b12.translateZ(100);
    b2.translateX(610);
    b3.translateX(-387);
    b3.translateY(252.5);
    fl.translateZ(-155);
    fl.rotateZ(Math.PI / 2);
    fl.translateX(-375);
    fl.translateY(-280);
    b4.translateY(-375);
    b4.translateX(-20);
    b5.translateY(-750);
    b5.translateX(290);
    b6.rotateZ(Math.PI / 2);
    b6.translateY(-825);
    b6.translateX(-100);
    b13.rotateZ(Math.PI / 2);
    b13.translateY(-825);
    b13.translateX(-650);
    b7.rotateZ(Math.PI / 2);
    b7.translateY(-237);
    b7.translateX(-130);
    b78.rotateZ(Math.PI / 2);
    b78.translateY(-237);
    b78.translateX(-297.5);
    b78.translateZ(100);
    b78.scale.set(0.95,1,1);
    b8.rotateZ(Math.PI / 2);
    b8.translateY(-237);
    b8.translateX(-380);
    b8.scale.set(2.4,1,1);
    // b9.rotateZ(Math.PI / 2);
    // b9.translateY(-237);
    // b9.translateX(-400);
    b910.rotateZ(Math.PI / 2);
    b910.translateY(-237);
    b910.translateX(-462.5);
    b910.translateZ(100);
    b910.scale.set(0.95,1,1);
    b10.rotateZ(Math.PI / 2);
    b10.translateY(-237);
    b10.translateX(-630);
    b11.rotateZ(Math.PI / 2);
    b11.translateY(-430);
    b11.translateX(-130);
    b1112.rotateZ(Math.PI / 2);
    b1112.translateY(-430);
    b1112.translateX(-297.5);
    b1112.translateZ(100);
    b1112.scale.set(0.95,1,1);
    b_12.rotateZ(Math.PI / 2);
    b_12.translateY(-430);
    b_12.translateX(-550);
    b613.rotateZ(Math.PI / 2);
    b613.translateY(-825);
    b613.translateX(-375);
    b613.translateZ(115);
    b613.scale.set(0.815,1,1);
    b14.rotateZ(Math.PI / 2);
    b14.translateY(-825);
    b14.translateX(-375);
    b14.translateZ(-115);
    b14.scale.set(0.815,1,1);
    window.rotateZ(Math.PI / 2);
    window.translateY(-825);
    window.translateX(-375);
    window.scale.set(0.815,1,1);
    roof.translateZ(155);
    roof.rotateZ(Math.PI / 2);
    roof.translateX(-375);
    roof.translateY(-280);

    //add all objects to the room group
    var addMeshList = [b3,b1,b2,b12,fl,b4,b5,b6,b7,b78,b8,b910,b10,b11,b1112,b_12,b13,b613,b14,window,roof];
    for (let i=0; i<addMeshList.length; ++i) {
        room.add(addMeshList[i]);
    }

    return room;
}