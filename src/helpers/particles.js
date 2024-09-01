/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

//sandstorm
var particleGroup, particleAttributes;
var camposition;

//laser beam
var laserGroup;

function laserBeam() {
    var particleTexture = new THREE.TextureLoader().load( 'Images/spark.png' );

    laserGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    var totalParticles = 100;
    var radiusRange = 20;
    for( var i = 0; i < totalParticles; i++ ) 
    {
        var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, color: 0x00ff00 } );
        
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 2, 2, 0.125/2 ); // imageWidth, imageHeight
        sprite.position.set( 1.5, -0.5, i*0.04 );
        // for a cube:
        sprite.position.multiplyScalar( radiusRange );
        // for a solid sphere:
        //sprite.position.setLength( radiusRange * Math.random() );
        // for a spherical shell:
        //sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
        
        //sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
        //sprite.material.color.setHSL( Math.random(), 0.9, 0.7 ); 
        
        //sprite.opacity = 0.20; // translucent particles
        //sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        
        laserGroup.add(sprite);
        // add variable qualities to arrays, if they need to be accessed later
        particleAttributes.startPosition.push( sprite.position.clone() );
        particleAttributes.randomness.push( Math.random() );
    }
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( cam.matrixWorld );
    x = camposition.x;
    z = camposition.z;

    laserGroup.position.set(-130,40,-850);
    laserGroup.scale.set(5,5,10);

    pauseCam.add( laserGroup );
}

function particleSystem() {
    var particleTexture = new THREE.TextureLoader().load( 'Images/smokeparticle.png' );

    particleGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    var totalParticles = 500;
    var radiusRange = 100;
    for( var i = 0; i < totalParticles; i++ ) 
    {
        var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, color: 0x754312 } );
        
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 4, 4, 0.125 ); // imageWidth, imageHeight
        sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
        // for a cube:
        //sprite.position.multiplyScalar( radiusRange );
        // for a solid sphere:
        sprite.position.setLength( radiusRange * Math.random() );
        // for a spherical shell:
        //sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
        
        //sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
        //sprite.material.color.setHSL( Math.random(), 0.9, 0.7 ); 
        
        //sprite.opacity = 0.20; // translucent particles
        //sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        
        particleGroup.add( sprite );
        // add variable qualities to arrays, if they need to be accessed later
        particleAttributes.startPosition.push( sprite.position.clone() );
        particleAttributes.randomness.push( Math.random() );
    }
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( cam.matrixWorld );
    x = camposition.x;
    z = camposition.z;

    particleGroup.position.set(x,200,z);
    particleGroup.scale.set(100,100,100);
    scene.add( particleGroup );
    
}

function updateParticleSystem() {
	var time = 4 * clock.getElapsedTime();
	
	for ( var c = 0; c < particleGroup.children.length; c ++ ) 
	{
		var sprite = particleGroup.children[ c ];

		// particle wiggle
		// var wiggleScale = 2;
		// sprite.position.x += wiggleScale * (Math.random() - 0.5);
		// sprite.position.y += wiggleScale * (Math.random() - 0.5);
		// sprite.position.z += wiggleScale * (Math.random() - 0.5);
		
		// pulse away/towards center
		// individual rates of movement
		var a = particleAttributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.01 + 0.9;
		sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
		sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
		sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;	
	}

	// rotate the entire group
	particleGroup.rotation.x = time * -0.05;
	particleGroup.rotation.y = time * -0.05;
	//particleGroup.rotation.z = time * -0.02;

    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( cam.matrixWorld );
    x = camposition.x;
    z = camposition.z;

    particleGroup.position.set(x,200,z);
}

