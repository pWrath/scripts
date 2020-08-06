function createAtlas(gifInfo) {
    if (!gifInfo.atlasTimer) {
        gifInfo.lastAtlasTime = Globals.Curtime().toFixed(3);
        gifInfo.atlasTimer = true;
    }
    if (Globals.Curtime().toFixed(3) - gifInfo.lastAtlasTime > 1) {
        gifInfo.frameAtlas.push(Render.AddTexture(gifInfo.framePath + " (" + gifInfo.atlasIndex + ")" + ".png"));
        gifInfo.timer = false;
        gifInfo.atlasIndex += 1
    }
    if (gifInfo.frameAtlas.length == gifInfo.frameCount) {
        gifInfo.atlasLoaded = true;
    }
}
function renderGif(x, y, width, height, gifInfo) {
    Render.TexturedRect(x, y, width, height, gifInfo.frameAtlas[gifInfo.frameIndex]);
    if (!gifInfo.timer) {
        gifInfo.lastTime = Globals.Curtime().toFixed(3);
        gifInfo.timer = true;
    }
    if (Globals.Curtime().toFixed(3) - gifInfo.lastTime > gifInfo.interval) {
        ++gifInfo.frameIndex;
        gifInfo.timer = false;
    }
    if (gifInfo.frameIndex == gifInfo.frameCount) {
        gifInfo.frameIndex = 0;
    }
}
var gifOneInfo = { //this is the gif info object you will need one of these for each gif you want to render
    framePath: "PATHGOESHERE", //The folder + the base name ex. ot/scripts/giffolder/frame
    frameCount: 0, //How many frames
    interval: .00001, //how fast the gif should go higher number = slower gif
    frameAtlas: [],
    frameIndex: 0,
    timer: false,
    lastTime: 0,
    atlasTimer: true,
    lastAtlasTime: 0,
    atlasIndex: 1,
    atlasLoaded: false,
    loadCalled: false
}