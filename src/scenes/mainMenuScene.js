import * as THREE from 'three';
import diffuseTexture from '../../assets/textures/diffuse.jpg';
import bumpTexture from '../../assets/textures/bump.jpg';
import starsTexture from '../../assets/textures/stars.jpg';

export default class MainMenu {
    constructor(addToScene, loadTexture, camera) {
        this.addToScene = addToScene;
        this.loadTexture = loadTexture;
        this.camera = camera;
    }

    loadMainMenu() {
        this._createBackground();
    }

    _createBackground() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial();
        material.map = this.loadTexture(diffuseTexture);
        material.bumpMap = this.loadTexture(bumpTexture);
        material.bumpScale = 0.025;
        this.mars = new THREE.Mesh(geometry, material);

        const starsGeometry = new THREE.SphereGeometry(50, 32, 32);
        const starsMaterial = new THREE.MeshBasicMaterial();
        starsMaterial.map = this.loadTexture(starsTexture);
        starsMaterial.side = THREE.BackSide;
        this.starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

        this.light = new THREE.DirectionalLight(0xaaaaaa, 1);
        this.camera.position.z = 2.5;
        this.light.position.set(5, 3, 5);

        this.addToScene([
            this.mars, 
            this.light, 
            this.starsMesh
        ])
    }

    update() {
        this.starsMesh.rotation.y += 0.0001;
        this.starsMesh.rotation.x += 0.0003;
        this.mars.rotation.y -= 0.001;
        this.mars.rotation.z -= 0.0005;
        this.light.rotation.y -= 0.001;
    };
}