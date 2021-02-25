
//----- VARIABLES -----

// Global
var containerStadiumScene, scene;
var renderer;
var clock, keyboardState;
var stats;
var deviationXZ;

// Cameras
var constCamera, trackingCamera, footballCamera;
const Cameras = Object.freeze({ "Const": 1, "Tracking": 2, "Football": 3 });
var activeCamera = Cameras.Const;

// Lights
var sunLight, footballLight;
var sunActive = true, stadiumLampsActive = false, footballLightActive = false;

// Bulbs
var sunBulb, footballBulb;

// Objects on scene
var stadiumPlane;
var football;
var stadiumFootballs = [];
var goals = [];
var stadiumLamps = [];
var mirror;

// Shading methods
const Shading = Object.freeze({ "Flat": 1, "Phong": 2, "Gouraud": 3 });
var activeShading = Shading.Phong;

//---------------------

// ------- MAIN -------

Init();
Animate();

// --------------------

//----- FUNCTIONS -----

function Init() {
    InitGlobalVariables();
    InitSun();
    InitSky();
    InitStadiumPlane();
    InitAllFootballs();
    InitGoals();
    InitStadiumLamps();
    InitFootballLight();
    InitCameras();
    InitMirror();
}

function Animate() {
    requestAnimationFrame(Animate);
    MakeMoves();
    Render();
}

function Render() {
    switch (activeCamera) {
        case Cameras.Const:
            renderer.render(scene, constCamera);
            break;
        case Cameras.Tracking:
            renderer.render(scene, trackingCamera);
            break;
        case Cameras.Football:
            renderer.render(scene, footballCamera);
            break;
        default:
            console.log("ERROR: unknown camera");
    }
}

//---------------------