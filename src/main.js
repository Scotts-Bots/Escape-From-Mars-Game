import { SCENES, sceneManager } from './core/scene_manager'

const globalState = {
    playerName: null,
    playerTime: 0,
    showScoreBoard: false
}

localStorage["scores"] = "";

const runGame = () => {
    sceneManager.loadScene(SCENES.LEVEL_1)
}

//MAIN
sceneManager.loadScene(SCENES.MAIN_MENU)