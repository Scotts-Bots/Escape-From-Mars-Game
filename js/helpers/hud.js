//HUD file
var helpText;
const loader = new THREE.FontLoader();

loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    var helperText = new THREE.TextGeometry("Complete all tasks before proceeding to next level", {
        font: font,
        size: 0.02,
        height: 0.001,
        curveSegments: 2,
    });

    textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    helpText = new THREE.Mesh(helperText, textMaterial);
    helpText.position.z = -1;
    helpText.position.y = 0.03;
    helpText.position.x = -0.325;
});

//function that shows a text pop up telling the player what needs to be done
function ShowHelp(help,camera){
    if (help){
        camera.add(helpText);
        scene.add(camera);
    }else{
        camera.remove(helpText);
        scene.add(camera);
    }
}


function HUD() {
    var check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Obar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("card");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    var Name = document.createElement('div');
    Name.id = "Name";
    Name.style.position = 'absolute';
    Name.style.color = "white";
    Name.style.fontSize = window.innerWidth*0.01+"px";
    Name.style.letterSpacing = window.innerWidth*0.001+"px";
    Name.style.fontFamily = "Helvetica";
    Name.style.width = 200;
    Name.style.height = 500;
    Name.innerHTML = Player.getName();
    Name.style.top = window.innerHeight*0.05 + 'px';
    Name.style.left =  window.innerWidth*0.02 + 'px';

    var Hbar = document.createElement('progress');
    Hbar.id = "Hbar";
    Hbar.style.position = 'absolute';
    Hbar.value = Player.getHealth();
    Hbar.max = 100;
    Hbar.style.top = window.innerHeight*0.075 + 'px';
    Hbar.style.left = window.innerWidth*0.02 + 'px';
    Hbar.style.backgroundColor = 'green';
    Hbar.style.width = window.innerWidth*0.1+ 'px';
    Hbar.style.height = window.innerHeight*0.02+ 'px';

    var Obar = document.createElement('progress');
    Obar = document.createElement('progress');
    Obar.id = "Obar";
    Obar.style.position = 'absolute';
    Obar.value = Player.getOxygen();
    Obar.max = 100;
    Obar.style.top = window.innerHeight*0.1 + 'px';
    Obar.style.left = window.innerWidth*0.02 + 'px';
    Obar.style.width = window.innerWidth*0.1+ 'px';
    Obar.style.height = window.innerHeight*0.02+ 'px';

    var ammo = document.createElement('div');
    ammo.id = "ammo"
    ammo.style.position = 'absolute';
    ammo.style.color = "white";
    ammo.style.fontSize = window.innerWidth*0.01+"px";
    ammo.style.letterSpacing = window.innerWidth*0.001+"px";
    ammo.style.fontFamily = "Helvetica";
    ammo.style.width = 200;
    ammo.style.height = 500;
    ammo.innerHTML = "Ammo: " + Player.getAmmo();
    ammo.style.top = window.innerHeight*0.7 + 'px';
    ammo.style.left = window.innerWidth*0.9 + 'px';

    var torch = document.createElement("img");
    torch.id = "torch";
    torch.style.position = 'absolute';
    torch.src = "Images/torch.png";
    torch.style.top = window.innerHeight*0.78 + 'px';
    torch.style.left = window.innerWidth*0.87 + 'px';
    torch.width = window.innerWidth*0.04;

    var gun = document.createElement("img");
    gun.id = "gun";
    gun.style.position = 'absolute';
    gun.src = "Images/gun.jpg";
    gun.style.top = window.innerHeight*0.78 + 'px';
    gun.style.left = window.innerWidth*0.925 + 'px';
    gun.width = window.innerWidth*0.045;

    var card = document.createElement("img");
    card.id = "card";
    card.style.position = 'absolute';
    card.src = "Images/keycard.jpg";
    card.style.top = window.innerHeight*0.6 + 'px';
    card.style.left = window.innerWidth*0.9 + 'px';
    card.height = window.innerWidth*0.0375;

    var helper = document.createElement('div');
    helper.id = "helper";
    helper.style.position = 'absolute';
    helper.style.color = "white";
    helper.style.fontSize = window.innerWidth*0.0075+"px";
    helper.style.letterSpacing = window.innerWidth*0.001+"px";
    helper.style.fontFamily = "Helvetica";
    helper.style.width = 1500;
    helper.style.height = 700;
    helper.innerHTML = "To aim center the mouse on the reticle and press r, Shoot - single click,    Interact - double click,         Movement - WASD           PAUSE - P";
    helper.style.top = window.innerHeight*0.02 + 'px';
    helper.style.left = window.innerWidth*0.25 + 'px';

    var Q = document.createElement('div');
    Q.id ="Q";
    Q.style.position = 'absolute';
    Q.style.color = "white";
    Q.style.fontSize = window.innerWidth*0.01+"px";
    Q.style.fontFamily = "Helvetica";
    Q.style.width = 200;
    Q.style.height = 500;
    Q.innerHTML = "Q";
    Q.style.top = window.innerHeight*0.75 + 'px';
    Q.style.left = window.innerWidth*0.8825 + 'px';

    document.body.appendChild(Hbar);
    document.body.appendChild(Obar);
    document.body.appendChild(Name);
    document.body.appendChild(ammo);
    document.body.appendChild(torch);
    document.body.appendChild(Q);
    document.body.appendChild(helper);
    //console.log(Player.checkGun());
    if (Player.checkGun()==1) {
        console.log('hi')
        document.body.appendChild(gun);
    }
    if (Player.getCards() > 0) {
        document.body.appendChild(card);
    }

}

function RemoveHUD(){
    var check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("card");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Obar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
}

