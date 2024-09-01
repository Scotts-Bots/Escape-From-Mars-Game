/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

//add meshes to this list so that they are detected during collision detection
var collidableMeshList = [];

//sets collision detection by adding a hitbox to the object its being applied to
function setCollisionDetection(obj,hitBox){
    obj.add(hitBox);
}

//test functions for collision detection
function clearText()
{   document.getElementById('message').innerHTML = '..........';   }

function appendText(txt)
{   document.getElementById('message').innerHTML += txt;   }


//main function called to check for collision detection called every time the scene is rendered
//it has three inputs, the object, its hitbox and the reaction function
//the reaction function is what should happen if a collision is detected
function checkCollision(obj,reactionFunction,hitBox){
    var originPoint = obj.position;

	//clearText();
	var cubeArr = hitBox.geometry.attributes.position.array;
	for (var vertexIndex = 0; vertexIndex < cubeArr.length/3; vertexIndex+=3)
	{
		var localVertex = new THREE.Vector3(cubeArr[vertexIndex],cubeArr[vertexIndex+1],cubeArr[vertexIndex+2]);
		var globalVertex = localVertex.applyMatrix4( hitBox.matrix );
		var directionVector = globalVertex.sub( hitBox.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		//if there is a collision with any object
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
            reactionFunction(true);
        } 
		//if there is no collision
        else{
            reactionFunction(false);
        }   
	}
}

//example of a hit box
// var cubeGeometry = new THREE.BoxBufferGeometry(200,200,200,3,3,3);
//     var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
//     MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
//     MovingCube.position.set(0, 0, 0);
