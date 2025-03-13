import '../style.css';
import BaseScene from './core/baseScene';

const globalState = {
    playerName: null,
    playerTime: 0,
    showScoreBoard: false
}

localStorage["scores"] = "";

const baseScene = new BaseScene();
baseScene.loadMainMenuScene();
