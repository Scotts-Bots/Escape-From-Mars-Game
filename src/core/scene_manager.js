export const SCENES = {
    MAIN_MENU: "../scenes/main_menu/mainIndex.html",
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    END_SCREEN: 4
}

const loadScene = (file) => {
    document.getElementById("scene").innerHTML=`<object type="text/html" data="${file}" ></object>`;
}

export const sceneManager= {
    loadScene
}