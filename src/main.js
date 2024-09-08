import { sceneManager } from './core/scene_manager'

const SCENES = {
    MAIN_MENU: "./scenes/mainIndex.html",
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    END_SCREEN: 4
}

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