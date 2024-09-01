//qf - quaternion Factor array
//qf = [x1,y1,z1,x2,y2,z2,x3,y3,z3]
//Level 1 and 3 qf = [2000,1,2000,  2000,1,2000,  2000,1,2000]
//Level 2 qf = [1,1,1,  1,1,1,  1,1,1]

//adds reticle to the camera in the scene
function addReticle(cam, qF) {
    var reticle = new THREE.Group();

    var circle = new THREE.Mesh(
        new THREE.RingBufferGeometry(0.015, 0.02 , 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
    );
    var rect = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.06, 0.003, 0.008),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    var rect1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.003, 0.06, 0.008),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    circle.position.z = -2;
    circle.lookAt(cam.quaternion.x*qf[0],cam.quaternion.y*qf[1],cam.quaternion.z*qf[2]);///300, 50, 2000);
    rect.position.z = -2;
    rect.lookAt(cam.quaternion.x*qf[3],cam.quaternion.y*qf[4],cam.quaternion.z*qf[5]);
    rect1.position.z = -2;
    rect1.lookAt(cam.quaternion.x*qf[6],cam.quaternion.y*qf[7],cam.quaternion.z*qf[8]);
    reticle.add(circle);
    reticle.add(rect);
    reticle.add(rect1);

    cam.add(reticle);
}