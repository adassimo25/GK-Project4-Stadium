
function ChangeShading(newShading) {
    activeShading = newShading;
    RemoveObjectsFromScene();
    AddObjectsToScene();
}

function RemoveObjectsFromScene() {
    stadiumFootballs.forEach(sB => scene.remove(sB));
    goals.forEach(g => scene.remove(g));
    stadiumLamps.forEach(sL => {
        scene.remove(sL.pillar);
        scene.remove(sL.lamp);
        scene.remove(sL.reflector);
    });
}

function AddObjectsToScene() {
    InitStadiumFootballs();
    InitGoals();
    InitStadiumLamps();
}