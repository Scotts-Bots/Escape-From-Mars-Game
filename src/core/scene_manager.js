const loadScene = (file) => {
    document.getElementById("scene").innerHTML=`<object type="text/html" data="${file}" ></object>`;
}

export const sceneManager= {
    loadScene
}