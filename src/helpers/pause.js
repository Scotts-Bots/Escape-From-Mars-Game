
var mesh, mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9, mesh10, mesh11, mesh12;
var back, back1, back2, back3, back4, cback;

//if the pause menu is up
var isPaused = false;
var pauseCam;

//Press <P> to go to pause menu
document.addEventListener('keydown', event => {
    if (event.code === "KeyP") {
        RemoveHUD();
        paused = true;
        ambientLight.intensity = 1;
        AddPause(pauseCam);
    }
});

//keys only respond if game is paused - check ifPaused
//Press left key to leave pause menu and resume game.
document.addEventListener('keydown', event => {
    if (event.code === "ArrowLeft" && isPaused) {
        paused = false;
        ambientLight.intensity = 0.05;
        RemoveCredit(pauseCam);
        RemovePause(pauseCam);
    }
});

//Press up key to restart game.
document.addEventListener('keydown', event => {
    if (event.code === "ArrowUp" && isPaused) {
        //assigning static variables
        localStorage["health"] = 100;
        localStorage["oxygen"] = 100;
        localStorage["ammo"] = 0;
        localStorage["cards"] = 0;
        localStorage["gun"] = 0;
        window.location.href = "level1.html";
    }
});

//Press right key to go back to main menu
document.addEventListener('keydown', event => {
    if (event.code === "ArrowRight" && isPaused) {
        //assigning static variables
        localStorage["health"] = 100;
        localStorage["oxygen"] = 100;
        localStorage["ammo"] = 0;
        localStorage["cards"] = 0;
        localStorage["gun"] = 0;
        window.location.href = "index.html";
    }
});

//Adds pause menu to the scene
//cam is the camera
function AddPause(cam) {
    //enable pause keys functionality
    isPaused = true;

    back = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back.position.z = -1;
    back.position.x = -0.05;
    cam.add(back);
    scene.add(cam);

    back1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.9, 0.6, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    back1.position.z = -1;
    back1.position.x = -0.05;
    cam.add(back1);
    scene.add(cam);

    back2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back2.position.z = -1;
    back2.position.y = 0.19;
    back2.position.x = -0.04;
    cam.add(back2);
    scene.add(cam);

    back3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back3.position.z = -1;
    back3.position.y = 0.01;
    back3.position.x = -0.04;
    cam.add(back3);
    scene.add(cam);

    back4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back4.position.z = -1;
    back4.position.y = -0.16;
    back4.position.x = -0.04;
    cam.add(back4);
    scene.add(cam);


    var loader = new THREE.FontLoader();
    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        var restartText = new THREE.TextGeometry("Restart", {
            font: font,
            size: 0.05,
            height: 0.001,
            curveSegments: 2,
        });

        var resumeText = new THREE.TextGeometry("Resume", {
            font: font,
            size: 0.05,
            height: 0.001,
            curveSegments: 2,
        });

        var creditText = new THREE.TextGeometry("Main Menu", {
            font: font,
            size: 0.05,
            height: 0.001,
            curveSegments: 2,
        });

        var rArrow = new THREE.TextGeometry("right arrow key", {
            font: font,
            size: 0.015,
            height: 0.001,
            curveSegments: 2,
        });

        var lArrow = new THREE.TextGeometry("left arrow key", {
            font: font,
            size: 0.015,
            height: 0.001,
            curveSegments: 2,
        });

        var uArrow = new THREE.TextGeometry("up arrow key", {
            font: font,
            size: 0.015,
            height: 0.001,
            curveSegments: 2,
        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        mesh = new THREE.Mesh(restartText, textMaterial);
        mesh.position.z = -1;
        mesh.position.y = 0.17;
        mesh.position.x = -0.15;

        mesh1 = new THREE.Mesh(resumeText, textMaterial);
        mesh1.position.z = -1;
        mesh1.position.y = -0.01;
        mesh1.position.x = -0.15;

        mesh2 = new THREE.Mesh(creditText, textMaterial);
        mesh2.position.z = -1;
        mesh2.position.y = -0.18;
        mesh2.position.x = -0.2;

        mesh3 = new THREE.Mesh(rArrow, textMaterial);
        mesh3.position.z = -1;
        mesh3.position.y = -0.205;
        mesh3.position.x = -0.1;

        mesh4 = new THREE.Mesh(lArrow, textMaterial);
        mesh4.position.z = -1;
        mesh4.position.y = -0.035;
        mesh4.position.x = -0.1;

        mesh5 = new THREE.Mesh(uArrow, textMaterial);
        mesh5.position.z = -1;
        mesh5.position.y = 0.145;
        mesh5.position.x = -0.1;

        cam.add(mesh);
        cam.add(mesh1);
        cam.add(mesh2);
        cam.add(mesh3);
        cam.add(mesh4);
        cam.add(mesh5);
        scene.add(cam);
    });
}

//Removes the pause menu when player resumes game
function RemovePause(cam) {
    //Disable pause keys functionality
    isPaused = false;

    var removeMeshes = [mesh, mesh1, mesh2, mesh3, mesh4, mesh5, back, back1, back2, back3, back4];
    for (let i = 0; i < removeMeshes.length; ++i) {
        cam.remove(removeMeshes[i])
    }
    scene.add(cam);
}

//Adds credits screen
function AddCredit(cam) {
    cback = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    cback.position.z = -1;
    cback.position.x = -0.05;
    cam.add(cback);
    scene.add(cam);

    let loader = new THREE.FontLoader();
    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var credit1 = new THREE.TextGeometry("SkyBox images: MegaKosan - https://gamebanana.com/mods/7912", {
            font: font,
            size: 0.017,
            height: 0.001,
            curveSegments: 2,
        });

        var credit2 = new THREE.TextGeometry("Threex library: Jerome Etienne - https://github.com/jeromeetienne/threex.domevents", {
            font: font,
            size: 0.017,
            height: 0.001,
            curveSegments: 2,
        });

        var credit = new THREE.TextGeometry("Credits", {
            font: font,
            size: 0.05,
            height: 0.001,
            curveSegments: 2,
        });

        let credit3 = new THREE.TextGeometry("Collision dectection: Three.js tutorials by Lee Stemkoski Date: July 2013 (three.js v59dev)", {
            font: font,
            size: 0.017,
            height: 0.001,
            curveSegments: 2,
        });

        let credit4 = new THREE.TextGeometry("Gun view: saucecode - https://github.com/saucecode/threejs-demos/tree/master/08_GunView", {
            font: font,
            size: 0.0155,
            height: 0.001,
            curveSegments: 2,
        });

        let credit5 = new THREE.TextGeometry("Main menu background: flowforfrank - https://github.com/flowforfrank/threejs", {
            font: font,
            size: 0.017,
            height: 0.001,
            curveSegments: 2,
        });

        let dArrow = new THREE.TextGeometry("Down arrow to close", {
            font: font,
            size: 0.013,
            height: 0.001,
            curveSegments: 2,
        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        mesh6 = new THREE.Mesh(credit1, textMaterial);
        mesh6.position.z = -1;
        mesh6.position.y = 0.17;
        mesh6.position.x = -0.5;

        mesh7 = new THREE.Mesh(credit2, textMaterial);
        mesh7.position.z = -1;
        mesh7.position.y = -0.01;
        mesh7.position.x = -0.5;

        mesh8 = new THREE.Mesh(credit, textMaterial);
        mesh8.position.z = -1;
        mesh8.position.y = 0.25;
        mesh8.position.x = -0.15;

        mesh9 = new THREE.Mesh(credit3, textMaterial);
        mesh9.position.z = -1;
        mesh9.position.y = 0.08;
        mesh9.position.x = -0.5;

        mesh10 = new THREE.Mesh(credit4, textMaterial);
        mesh10.position.z = -1;
        mesh10.position.y = -0.105;
        mesh10.position.x = -0.5;

        mesh12 = new THREE.Mesh(credit5, textMaterial);
        mesh12.position.z = -1;
        mesh12.position.y = -0.19;
        mesh12.position.x = -0.5;

        mesh11 = new THREE.Mesh(dArrow, textMaterial);
        mesh11.position.z = -1;
        mesh11.position.y = 0.3;
        mesh11.position.x = 0.25;

        cam.add(mesh6);
        cam.add(mesh7);
        cam.add(mesh8);
        cam.add(mesh9);
        cam.add(mesh10);
        cam.add(mesh11);
        cam.add(mesh12);
        scene.add(cam);

    });
}

//Removes credits screen
function RemoveCredit(cam) {
    var removeMeshes = [mesh6, mesh7, mesh8, mesh9, mesh10, mesh11, mesh12, cback];
    for (let i = 0; i < removeMeshes.length; ++i) {
        cam.remove(removeMeshes[i])
    }
    scene.add(cam);
}
