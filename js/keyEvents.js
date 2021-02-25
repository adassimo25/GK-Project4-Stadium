
document.addEventListener("keydown", event => {
    //Cameras
    if (event.key === '1')
        activeCamera = Cameras.Const;
    if (event.key === '2')
        activeCamera = Cameras.Tracking;
    if (event.key === '3')
        activeCamera = Cameras.Football;

    //Shadings
    if (event.key === '4')
        ChangeShading(Shading.Flat);
    if (event.key === '5')
        ChangeShading(Shading.Phong);
    if (event.key === '6')
        ChangeShading(Shading.Gouraud);

    //Lights
    if (event.key === '7') {
        if (sunActive) {
            Night();
        }
        else {
            Day();
        }
    }
    if (event.key === '8') {
        if (stadiumLampsActive) {
            stadiumLampsActive = false;
            stadiumLamps.forEach(sL => {
                sL.lamp.material.color.setHex(0x606060);
                sL.reflector.intensity = 0;
            });
        }
        else {
            stadiumLampsActive = true;
            stadiumLamps.forEach(sL => {
                sL.lamp.material.color.setHex(0xf0f8ff);
                sL.reflector.intensity = 1;
            });
        }
    }
    if (event.key === '9') {
        if (footballLightActive) {
            footballLightActive = false;
            footballBulb.material.color.setHex(0x696969);
            footballLight.intensity = 0;
        }
        else {
            footballLightActive = true;
            footballBulb.material.color.setHex(0xffffff);
            footballLight.intensity = 10;
        }
    }
});

window.addEventListener("resize", () => {
    var aspect = window.innerWidth / window.innerHeight;
    constCamera.aspect = aspect;
    constCamera.updateProjectionMatrix();
    followingCamera.aspect = aspect;
    followingCamera.updateProjectionMatrix();
    footballCamera.aspect = aspect;
    footballCamera.updateProjectionMatrix();
    scene.remove(mirror);
    InitMirror();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Night() {
    for (var i = 0.99; i >= 0.1; i -= 0.01) {
        sunBulb.position.y = sunBulb.position.y - 8;
        sunLight.intensity = i;
        sunLight.position.y = sunLight.position.y - 8;
        await sleep(40);
    }
    scene.remove(sunBulb);
    sunActive = false;
}

async function Day() {
    sunActive = true;
    scene.add(sunBulb);
    for (var i = 0.11; i <= 1; i += 0.01) {
        sunBulb.position.y = sunBulb.position.y + 8;
        sunLight.intensity = i;
        sunLight.position.y = sunLight.position.y + 8;
        await sleep(40);
    }
}

function MakeMoves() {
    scene.fog = fogEnabled.checked ? new THREE.FogExp2(0xf8f8f8, fogDensity) : new THREE.FogExp2(0xf8f8f8, 0);

    var delta = clock.getDelta();
    var distance = 75 * delta;
    var rotationAngle = (3 * Math.PI / 8) * delta;

    if (keyboardState.pressed('w')) {
        MoveFowardBack(-distance);
    }
    if (keyboardState.pressed('s')) {
        MoveFowardBack(distance);
    }
    if (keyboardState.pressed('a')) {
        MoveLeftRight(-distance);
    }
    if (keyboardState.pressed('d')) {
        MoveLeftRight(distance);
    }
    if (keyboardState.pressed('q')) {
        ChangeDirection(rotationAngle);
    }
    if (keyboardState.pressed('e')) {
        ChangeDirection(-rotationAngle);
    }

    if (keyboardState.pressed('y')) {
        footballLight.target.translateZ(-distance * 0.25);
    }
    if (keyboardState.pressed('h')) {
        footballLight.target.translateZ(distance * 0.25);
    }
    if (keyboardState.pressed('g')) {
        footballLight.target.translateX(-distance * 0.25);
    }
    if (keyboardState.pressed('j')) {
        footballLight.target.translateX(distance * 0.25);
    }
    if (keyboardState.pressed('b')) {
        if (footballLight.angle < 0.99)
            footballLight.angle += 0.02;
    }
    if (keyboardState.pressed('n')) {
        if (footballLight.angle > 0.51)
            footballLight.angle -= 0.02;
    }
}

function MoveFowardBack(dZ) {
    football.position.z += dZ * Math.cos(deviationXZ);
    football.position.x += dZ * Math.sin(deviationXZ);
    football.rotateOnWorldAxis(new THREE.Vector3(Math.cos(2 * Math.PI - deviationXZ), 0, Math.sin(2 * Math.PI - deviationXZ)), dZ / (2 * Math.PI * 8) * Math.PI);

    footballBulb.translateZ(dZ);
    footballLight.translateZ(dZ);
    footballLight.target.translateZ(dZ);
    footballCamera.translateZ(dZ);

    trackingCamera.lookAt(football.position);
}

function MoveLeftRight(dX) {
    var ang = deviationXZ + Math.PI / 2, rotAng = 2 * Math.PI - deviationXZ + Math.PI / 2;
    football.position.z += dX * Math.cos(ang);
    football.position.x += dX * Math.sin(ang);
    football.rotateOnWorldAxis(new THREE.Vector3(Math.cos(rotAng), 0, Math.sin(rotAng)), -dX / (2 * Math.PI * 8) * Math.PI);

    footballBulb.translateX(dX);
    footballLight.translateX(dX);
    footballLight.target.translateX(dX);
    footballCamera.translateX(dX);

    trackingCamera.lookAt(football.position);
}

function ChangeDirection(rotationAngle) {
    deviationXZ = (deviationXZ + rotationAngle) % (2 * Math.PI);
    football.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotationAngle);
    footballBulb.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationAngle);
    footballLight.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationAngle);
    footballCamera.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationAngle);
    RotateAndMoveFootballLightTarget(rotationAngle);
}

function RotateAndMoveFootballLightTarget(rotationAngle) {
    footballLight.target.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationAngle);
    var x = footballLight.target.position.x - football.position.x;
    var z = footballLight.target.position.z - football.position.z;
    footballLight.target.position.x = x * Math.cos(rotationAngle) + z * Math.sin(rotationAngle) + football.position.x;
    footballLight.target.position.z = z * Math.cos(rotationAngle) - x * Math.sin(rotationAngle) + football.position.z;
}