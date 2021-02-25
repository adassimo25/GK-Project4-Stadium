
function InitGlobalVariables() {
    containerStadiumScene = document.getElementById("StadiumScene");
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    containerStadiumScene.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    keyboardState = new THREEx.KeyboardState();

    stats = new Stats();
    // document.getElementById("stats").appendChild(stats.domElement);

    deviationXZ = 0;
}

function InitSun() {
    sunLight = new THREE.AmbientLight(0xfdfbd3);
    sunLight.position.set(0, 720, 2500);
    sunLight.intensity = 1;
    sunLight.castShadow = true;
    scene.add(sunLight);

    sunBulb = new THREE.Mesh(
        new THREE.SphereGeometry(48, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xfdfbd3 })
    );
    sunBulb.position.set(0, 720, 2500);
    scene.add(sunBulb);
}

function InitSky() {
    let skyMaterials = [
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_ft.jpg'), side: THREE.BackSide }),
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_bk.jpg'), side: THREE.BackSide }),
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_up.jpg'), side: THREE.BackSide }),
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_dn.jpg'), side: THREE.BackSide }),
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_rt.jpg'), side: THREE.BackSide }),
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../images/sky_blizzard/blizzard_lf.jpg'), side: THREE.BackSide })
    ];
    let skyGeometry = new THREE.BoxGeometry(5000, 2500, 5000);
    let sky = new THREE.Mesh(skyGeometry, skyMaterials);
    sky.position.y = 1249;
    scene.add(sky);
}

function InitStadiumPlane() {
    var lawnTexture = new THREE.TextureLoader().load("images/lawn.jpg");
    lawnTexture.wrapS = lawnTexture.wrapT = THREE.RepeatWrapping;
    lawnTexture.repeat.set(5, 3);

    var stadiumPlaneGeometry = new THREE.PlaneGeometry(1100, 660, 110, 66);
    var stadiumPlaneMaterial = new THREE.MeshPhongMaterial({
        color: 0x4b371c,
        side: THREE.DoubleSide
    });

    stadiumPlane = new THREE.Mesh(stadiumPlaneGeometry, stadiumPlaneMaterial);

    var stadiumLawnGeometry = new THREE.PlaneGeometry(1000, 600, 100, 60);
    var stadiumLawnMaterial = new THREE.MeshPhongMaterial({
        map: lawnTexture,
        side: THREE.DoubleSide
    });

    const stadiumLawn = new THREE.Mesh(stadiumLawnGeometry, stadiumLawnMaterial);

    stadiumPlane.add(stadiumLawn);
    stadiumPlane.rotation.x = Math.PI / 2;
    stadiumPlane.receiveShadow = true;

    scene.add(stadiumPlane);
}

function InitAllFootballs() {
    football = CreateFootball(true, 0.8, 0, 10, 0, true);
    InitStadiumFootballs();
}

function CreateFootball(transparent, opacity, x, y, z, isFootball) {
    var texture = new THREE.TextureLoader().load("images/footballBallFree.jpg");
    var geometry = new THREE.SphereGeometry(8, 8, 8);
    var material;
    if (isFootball) {
        material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.01,
            transparent: transparent,
            opacity: opacity
        });
    }
    else {
        switch (activeShading) {
            case Shading.Flat:
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: transparent,
                    opacity: opacity
                });
                break;
            case Shading.Phong:
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    bumpMap: texture,
                    bumpScale: 0.01,
                    transparent: transparent,
                    opacity: opacity
                });
                break;
            case Shading.Gouraud:
                material = new THREE.MeshLambertMaterial({
                    map: texture,
                    transparent: transparent,
                    opacity: opacity
                });
                break;
        }
    }
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
}

function InitStadiumFootballs() {
    stadiumFootballs = [
        CreateFootball(false, 1, 250, 10, 150, false),
        CreateFootball(false, 1, 250, 10, -150, false),
        CreateFootball(false, 1, -250, 10, -150, false),
        CreateFootball(false, 1, -250, 10, 150, false)
    ]
}

function InitGoals() {
    var material;
    switch (activeShading) {
        case Shading.Flat:
            material = new THREE.MeshBasicMaterial({ color: 0xfffafa });;
            break;
        case Shading.Phong:
            material = new THREE.MeshPhongMaterial({ color: 0xfffafa });
            break;
        case Shading.Gouraud:
            material = new THREE.MeshLambertMaterial({ color: 0xfffafa });
            break;
    }

    var goalBarGeometry = new THREE.BoxGeometry(140, 4, 4);
    var goalBar = new THREE.Mesh(goalBarGeometry, material);
    goalBar.position.y = 70;

    var goalPostGeometry = new THREE.BoxGeometry(70, 4, 4);

    var postLeft = new THREE.Mesh(goalPostGeometry, material);
    postLeft.rotation.z = Math.PI / 2;
    postLeft.position.x = -68;
    postLeft.position.y = -35;

    var postRight = new THREE.Mesh(goalPostGeometry, material);
    postRight.rotation.z = Math.PI / 2;
    postRight.position.x = 68;
    postRight.position.y = -35;

    goalBar.add(postLeft);
    goalBar.add(postRight);
    goalBar.castShadow = true;

    var goalLeft = goalBar.clone();
    var goalRight = goalBar.clone();

    goalLeft.rotation.y = -Math.PI / 2;
    goalLeft.position.x = -500;
    goalRight.rotation.y = Math.PI / 2;
    goalRight.position.x = 500;

    goals = [
        goalLeft,
        goalRight
    ];
    goals.forEach(g => scene.add(g));
}

function InitStadiumLamps() {
    stadiumLamps = [
        {
            pillar: CreatePillar(-550, -330),
            lamp: CreateLamp(-548, -328, 3 * Math.PI / 4),
            reflector: CreateReflector(-547, -327)
        },
        {
            pillar: CreatePillar(-550, 330),
            lamp: CreateLamp(-548, 328, 5 * Math.PI / 4),
            reflector: CreateReflector(-547, 327)
        },
        {
            pillar: CreatePillar(550, 330),
            lamp: CreateLamp(548, 328, 7 * Math.PI / 4),
            reflector: CreateReflector(547, 327)
        },
        {
            pillar: CreatePillar(550, -330),
            lamp: CreateLamp(548, -328, Math.PI / 4),
            reflector: CreateReflector(547, -327)
        }
    ];
    stadiumLamps.forEach(sL => {
        scene.add(sL.pillar);
        scene.add(sL.lamp);
        scene.add(sL.reflector);
    })
}

function CreatePillar(x, z) {
    var geometry = new THREE.CylinderGeometry(2, 2.2, 200, 32);
    var material;
    switch (activeShading) {
        case Shading.Flat:
            material = new THREE.MeshBasicMaterial({ color: 0xd8d8d8 });
            break;
        case Shading.Phong:
            material = new THREE.MeshPhongMaterial({ color: 0xd8d8d8 });
            break;
        case Shading.Gouraud:
            material = new THREE.MeshLambertMaterial({ color: 0xd8d8d8 });
            break;
    }

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x, 100, z);
    cylinder.castShadow = true;
    return cylinder;
}

function CreateLamp(x, z, yRotation) {
    var geometry = new THREE.BoxGeometry(1, 30, 60);
    var material;
    switch (activeShading) {
        case Shading.Flat:
            material = new THREE.MeshBasicMaterial({ color: stadiumLampsActive ? 0xf0f8ff : 0x606060 });
            break;
        case Shading.Phong:
            material = new THREE.MeshPhongMaterial({ color: stadiumLampsActive ? 0xf0f8ff : 0x606060 });
            break;
        case Shading.Gouraud:
            material = new THREE.MeshLambertMaterial({ color: stadiumLampsActive ? 0xf0f8ff : 0x606060 });
            break;
    }

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 200, z);
    mesh.rotation.y = yRotation;
    mesh.castShadow = true;
    return mesh;
}

function CreateReflector(x, z) {
    var spotLight = new THREE.SpotLight(0xf0f8ff, stadiumLampsActive ? 1 : 0, 2500, Math.PI / 2, 0.25, 1.5, 0.75);
    spotLight.position.set(x, 200, z);
    spotLight.castShadow = true;
    return spotLight;
}

function InitFootballLight() {
    footballLight = new THREE.SpotLight(0xffffff, 0, 250, 0.75, 0.75, 1.5, 0.25);
    footballLight.position.y = 10;
    footballLight.target.position.set(0, 0, -100);
    scene.add(footballLight.target);
    scene.add(footballLight);

    footballBulb = new THREE.Mesh(
        new THREE.SphereGeometry(4, 12, 12),
        new THREE.MeshBasicMaterial({ color: footballLightActive ? 0xffffff : 0x696969 })
    );
    footballBulb.position.y = 10;
    scene.add(footballBulb);
}

function InitCameras() {
    const fov = 48, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 10000;

    constCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    scene.add(constCamera);
    constCamera.position.set(0, 375, 750);
    constCamera.lookAt(scene.position);

    trackingCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    scene.add(trackingCamera);
    trackingCamera.position.set(0, 300, 600);
    trackingCamera.lookAt(football.position);

    footballCamera = new THREE.PerspectiveCamera(fov * 1.5, aspect, near, far);
    scene.add(footballCamera);
    footballCamera.position.y = 25;
}

function InitMirror() {
    geometry = new THREE.PlaneGeometry(1100, 330);
    mirror = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio * 2,
        textureHeight: window.innerHeight * window.devicePixelRatio * 2,
        color: 0x889999
    });
    mirror.position.y = 165;
    mirror.position.z = -380;
    scene.add(mirror);
}