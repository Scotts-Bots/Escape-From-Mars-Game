import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import BASE_CONFIG from './baseConfig';
import MainMenu from '../scenes/mainMenuScene';

import diffuseTexture from '../../assets/textures/diffuse.jpg';
import bumpTexture from '../../assets/textures/bump.jpg';
import starsTexture from '../../assets/textures/stars.jpg';

export default class BaseScene {
    constructor() {
        this._scene = null;
        this._renderer = null;
        this._camera = null;
        this._controls = null;
        this._axesHelper = null;

        this._textureLoader = null;
        this._audioLoader = null;
        this._fontLoader = null;

        this._windowSizes = {};
        this._isAssetsLoaded = false;
        
        this._init();
    }



    loadMainMenuScene() {
        this._mainMenu = new MainMenu(this._addToScene, this._loadTexture, this._camera);
        this._mainMenu.loadMainMenu()

        const animate = () => {
            requestAnimationFrame(animate);
            this._renderer.render(this._scene, this._camera);
            this._mainMenu.update();
        }

        animate()
    }

    _init() {
        this._initThreeJS();
    }

    _initThreeJS() {
        this._initScene();
        this._initRenderer();
        this._initCamera();
        this._initOnResize();
        this._initLoaders();
      }

    _addToScene = (meshList) => meshList.forEach(mesh => {
        this._scene.add(mesh)
    });
    
    _loadTexture = (texture) => this._textureLoader.load(texture);

    _initScene() {
        this._scene = new THREE.Scene();
    }

    _initRenderer() {
        this._windowSizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const canvas = document.querySelector('canvas.webgl');
        const renderer = this._renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: BASE_CONFIG.antialias,
        });

        renderer.setSize(this._windowSizes.width, this._windowSizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    }

    _initCamera() {
        const camera = this._camera = new THREE.PerspectiveCamera(BASE_CONFIG.camera.fov, this._windowSizes.width / this._windowSizes.height, BASE_CONFIG.camera.near, BASE_CONFIG.camera.far);
        this._scene.add(camera);
    
        const startPosition = BASE_CONFIG.camera.startPosition;
        camera.position.set(startPosition.x, startPosition.y, startPosition.z);
      }

    _initOnResize() {
        window.addEventListener('resize', () => {
            this._windowSizes.width = window.innerWidth;
            this._windowSizes.height = window.innerHeight;

            this._camera.aspect = this._windowSizes.width / this._windowSizes.height;
            this._camera.updateProjectionMatrix();

            this._renderer.setSize(this._windowSizes.width, this._windowSizes.height);
            this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    _initLoaders() {
        this._textureLoader = new THREE.TextureLoader();
        this._audioLoader = new THREE.AudioLoader();
        this._fontLoader = new FontLoader();
    }

    afterAssetsLoaded() {
        this._isAssetsLoaded = true;
        this._controls.enabled = true;
    }
}