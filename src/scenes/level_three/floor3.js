//SCENE MODELLING FOR LEVEL 3

//generic wall mesh
function Wall(x, y, z) {
    var wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xfaebd7 })
    );
    collidableMeshList.push(wall); //add wall to objects that affect collision detection
    return wall;
}

//window mesh
function Window(x, y, z) {
    var wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
    );
    collidableMeshList.push(wall); //add window to objects that affect collision detection
    return wall;
}

//entire level structure
function Room() {
    var room = new THREE.Group();
    var level1 = new THREE.Group();
    var level2 = new THREE.Group();
    var level22 = new THREE.Group();

    var b1 = Wall(553, 25, 300);
    var b12 = Wall(100, 25, 100);
    var b2 = Wall(450, 25, 300);
    var b3 = Wall(750, 25, 300);
    var fl = Wall(775, 1106.5, 10);
    var b5 = Wall(1100, 25, 300);
    var b6 = Wall(225, 25, 300);
    var b613 = Wall(400, 25, 70);
    var b13 = Wall(225, 25, 300);
    var b14 = Wall(400, 25, 70);
    var window = Window(400, 23, 160);
    var roof = Wall(775, 1106.5, 10);

    b1.translateX(10);
    b3.rotateZ(Math.PI / 2);
    b12.translateX(335);
    b12.translateZ(100);
    b2.translateX(610);
    b3.translateX(-387);
    b3.translateY(254);
    fl.translateZ(-155);
    fl.rotateZ(Math.PI / 2);
    fl.translateX(-375);
    fl.translateY(-286.5);
    b5.translateY(-750);
    b5.translateX(290);
    b6.rotateZ(Math.PI / 2);
    b6.translateY(-827);
    b6.translateX(-100);
    b13.rotateZ(Math.PI / 2);
    b13.translateY(-827);
    b13.translateX(-650);
    b613.rotateZ(Math.PI / 2);
    b613.translateY(-827);
    b613.translateX(-400);
    b613.translateZ(115);
    b14.rotateZ(Math.PI / 2);
    b14.translateY(-827);
    b14.translateX(-400);
    b14.translateZ(-115);
    window.rotateZ(Math.PI / 2);
    window.translateY(-827);
    window.translateX(-400);
    roof.translateZ(155);
    roof.rotateZ(Math.PI / 2);
    roof.translateX(-375);
    roof.translateY(-286.5);

    //add meshes to level 1 group
    var level1Meshes = [b3,b1,b2,b12,fl,b5,b6,b13,b613,b14,window,roof];
    for (let i=0; i<level1Meshes.length; ++i) {
        level1.add(level1Meshes[i]);
    }
    //transform level 1 group and add to room
    level1.translateY(-600);
    level1.translateZ(20);
    level1.scale.set(1,1,1.2);
    room.add(level1);

    //add tunnel bridge between level 1 structure and level 2 structure
    var geometry = new THREE.CylinderGeometry(150, 150, 600, 32);
    var material = new THREE.MeshLambertMaterial({ color: 0xfaebd7 });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.scale.set(1,1,2)
    cylinder.translateX(400);
    cylinder.translateY(-300);
    cylinder.translateZ(-150);
    room.add(cylinder);

    var _b1 = Wall(1100, 25, 300);
    var _b3 = Wall(750, 25, 300);
    var _fl = Wall(775, 1106.5, 10);
    var _b5 = Wall(1100, 25, 300);
    var _b6 = Wall(225, 25, 300);
    var _b613 = Wall(400, 25, 70);
    var _b13 = Wall(225, 25, 300);
    var _b14 = Wall(400, 25, 70);
    var _window = Window(400, 23, 160);
    var _roof = Wall(775, 1106.5, 10);

    _b1.translateX(290);
    _b3.rotateZ(Math.PI / 2);
    _b3.translateX(-387);
    _b3.translateY(254);
    _fl.translateZ(-155);
    _fl.rotateZ(Math.PI / 2);
    _fl.translateX(-375);
    _fl.translateY(-286.5);
    _b5.translateY(-750);
    _b5.translateX(290);
    _b6.rotateZ(Math.PI / 2);
    _b6.translateY(-827);
    _b6.translateX(-100);
    _b13.rotateZ(Math.PI / 2);
    _b13.translateY(-827);
    _b13.translateX(-650);
    _b613.rotateZ(Math.PI / 2);
    _b613.translateY(-827);
    _b613.translateX(-400);
    _b613.translateZ(115);
    _b14.rotateZ(Math.PI / 2);
    _b14.translateY(-827);
    _b14.translateX(-400);
    _b14.translateZ(-115);
    _window.rotateZ(Math.PI / 2);
    _window.translateY(-827);
    _window.translateX(-400);
    _roof.translateZ(155);
    _roof.rotateZ(Math.PI / 2);
    _roof.translateX(-375);
    _roof.translateY(-286.5);

    //add meshes to level 2 group
    var level2Meshes = [_b3,_b1,_fl,_b5,_b6,_b13,_b613,_b14,_window,_roof];
    for (let i=0; i<level2Meshes.length; ++i) {
        level1.add(level2Meshes[i]);
    }
    //transform level 2 group and add to room
    level2.rotateZ(Math.PI);
    level2.translateY(13);
    level2.translateX(-200);
    room.add(level2);

    var _2b1 = Wall(1100, 25, 300);
    var _2b3 = Wall(750, 25, 300);
    var _2fl = Wall(775, 1106.5, 10);
    var _2b5 = Wall(1100, 25, 300);
    var _2b6 = Wall(750, 25, 300);
    var _2roof = Wall(775, 1106.5, 10);

    _2b1.translateX(290);
    _2b3.rotateZ(Math.PI / 2);
    _2b3.translateX(-387);
    _2b3.translateY(254);
    _2fl.translateZ(-155);
    _2fl.rotateZ(Math.PI / 2);
    _2fl.translateX(-375);
    _2fl.translateY(-286.5);
    _2b5.translateY(-750);
    _2b5.translateX(290);
    _2b6.rotateZ(Math.PI / 2);
    _2b6.translateY(-830);
    _2b6.translateX(-387);
    _2roof.translateZ(155);
    _2roof.rotateZ(Math.PI / 2);
    _2roof.translateX(-375);
    _2roof.translateY(-286.5);

    level22.add(_2b3);
    level22.add(_2b1);
    level22.add(_2fl);
    level22.add(_2b5);
    level22.add(_2b6);
    level22.add(_2roof);

    //transform level 22 group and add to room
    level22.translateY(1500);
    level22.translateZ(160);
    level22.scale.set(1,2,2);
    room.add(level22);

    return room;
}