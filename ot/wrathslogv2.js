var library = require("commonmodule.module");


function Log(pContent, pColor) {
    this.content = pContent;
    this.color = pColor;
}

var inPaletteIndex = 1;
var palette = [
    [
        "estrogen index 0",
        [85, 205, 252, 255],
        [85, 205, 252, 255],
        [247, 168, 184, 255],
        [247, 168, 184, 255],
        [255, 255, 255, 255],
        [255, 255, 255, 255],
        [247, 168, 184, 255],
        [247, 168, 184, 255],      
        "MAX"
    ],
    [
        "rainbow index 1",
        [255, 0, 0, 255],
        [255, 127, 0, 255],
        [255, 255, 0, 255],
        [0, 255, 0, 255],
        [0, 0, 255, 255],
        [139, 0, 255, 255],
        "MAX"
    ],
    [
        "vaporwave index 2",
        [255, 113, 206, 255],
        [1, 205, 254, 255],
        [5, 255, 161, 255],
        [185, 103, 255, 255],
        [255, 251, 150, 255],
        "MAX"
    ],
    [
        "cyberpunk index 3",
        [0, 255, 159, 255],
        [0, 184, 255, 255],
        [0, 30, 255, 255],
        [189, 0, 255, 255],
        [255, 20, 147, 255],
        "MAX"
    ],







];

function RagebotLog() {

    var rBotColor;
    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1)
    {
        rBotColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Ragebot log color");
    }
    else
    {
        rBotColor = palette[paletteIndex][inPaletteIndex].slice();
    }

    var targetName = Entity.GetName(Event.GetInt("target_index"));
    var targetEyePos = Entity.GetProp(Event.GetInt("target_index"), "CCSPlayer", "m_angEyeAngles");

    var optionsSelected = library.fetchDropdown("Ragebot log options");

    var nakedLog = "Shot at " + targetName.replace(/^\s+|\s+$/g, '') + "'s " + library.returnHitbox(Event.GetInt("hitbox"));
    if (optionsSelected.indexOf("Add velocity") != -1) {
        nakedLog += " | (Pvel: " + Math.floor(library.getVelocity(Entity.GetLocalPlayer())) + " Tvel: " + Math.floor(library.getVelocity(Event.GetInt("target_index"))) + ")";
    }
    if (optionsSelected.indexOf("Add viewangles") != -1) {
        nakedLog += " | Viewangles(" + Math.floor(targetEyePos[0]) + "," + Math.floor(targetEyePos[1]) + "," + Math.floor(targetEyePos[2]) + ")";
    }
    if (optionsSelected.indexOf("Add hitchance") != -1) {
        nakedLog += " | HC: " + Event.GetInt("hitchance");
    }
    if (optionsSelected.indexOf("Add safe point") != -1) {
        nakedLog += " | SP: " + library.returnSafepoint(Event.GetInt("safepoint"));
    }
    if (optionsSelected.indexOf("Add exploit") != -1) {
        nakedLog += " | Exploit: " + library.returnExploit(Event.GetInt("exploit"));
    }
    var log = new Log(nakedLog, rBotColor)
    Cheat.PrintColor(log.color, log.content + "\n");

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        logs.push(log)
        inPaletteIndex++
        if(palette[paletteIndex][inPaletteIndex] == "MAX")
        {
            inPaletteIndex = 1;
            rBotColor = palette[paletteIndex][inPaletteIndex].slice();
        }
    }
}
function DamageTakenLog() {
    var dTakenColor;
    var dLog = library.fetchDropdown("Damage log types");
    if (dLog.indexOf("Damage taken") == -1) {
        return;
    }


    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1)
    {
        dTakenColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage taken log color");
    }
    else
    {
        dTakenColor = palette[paletteIndex][inPaletteIndex].slice();
       
    }


    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {

        var damageLog = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("attacker"))).replace(/^\s+|\s+$/g, '') + " hit you in the " +
        library.returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";

        var log = new Log(damageLog, dTakenColor)

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log)
            inPaletteIndex++
            if(palette[paletteIndex][inPaletteIndex] == "MAX")
            {
                inPaletteIndex = 1;
                dTakenColor = palette[paletteIndex][inPaletteIndex].slice();
            }
        }
    }
}
function DamageGivenLog() {
    var dLog = library.fetchDropdown("Damage log types");
    if (dLog.indexOf("Damage given") == -1) {
        return;
    }
    var dGivenColor;

    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1)
    {
        dGivenColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage given log color");
    }
    else
    {
        dGivenColor = palette[paletteIndex][inPaletteIndex].slice();
      
    }

    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) {
        var hitLog = "You hit " + Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))).replace(/^\s+|\s+$/g, '') + " in the " + 
        library.returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";

        var log = new Log(hitLog, dGivenColor);

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log);
            inPaletteIndex++
            if(palette[paletteIndex][inPaletteIndex] == "MAX")
        {
            inPaletteIndex = 1;
            dGivenColor = palette[paletteIndex][inPaletteIndex].slice();
        }
        }
    }
}
var fLoaded = false;
var logs = [];
function DrawLogs() {
    if (!fLoaded) {
        //CHANGE THE FONT HERE!!!!!!!!!
        font = Render.AddFont("tahoma", 9, 400);
        fLoaded = true;
    }
    var maxLogs = UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Max logs")
    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {

        if(logs.length > maxLogs)
        {
            logs.shift();
        }
        if (!logs.length == 0) {
            for (i = 0; i < logs.length; i++) {
                Render.StringCustom(5, i * 13, 0, logs[i].content, logs[i].color, font);
            }
            logs[0].color[3] -= 1;
            if (logs[0].color[3] <= 0) {
                logs.shift();
            }
        }
    }
}
function handleColor(){
    var cType = library.fetchDropdown("Color theme");
    if (!cType.indexOf("None") != -1)
    {
        if(cType.indexOf("estrogen") != -1)
        {
            paletteIndex = 0;
        }
        else if(cType.indexOf("rainbow") != -1)
        {
            paletteIndex = 1;
        }
        else if(cType.indexOf("vaporwave") != -1)
        {
            paletteIndex = 2;
        }
        else if(cType.indexOf("cyberpunk") != -1)
        {
            paletteIndex = 3;
        }
    }

}
function main() {

    library.createDropdown("Ragebot log options", ["Add velocity", "Add viewangles", "Add hitchance", "Add safe point", "Add exploit"], true);
    
    library.createDropdown("Damage log types", ["Damage taken", "Damage given"], true);

    //Add the palettes here in the list
    library.createDropdown("Color theme", ["None", "estrogen", "rainbow", "vaporwave", "cyberpunk"], false);


    UI.AddColorPicker("Ragebot log color");
    UI.AddColorPicker("Damage taken log color");
    UI.AddColorPicker("Damage given log color");
    UI.AddCheckbox("Draw logs on screen")
    UI.AddSliderInt("Max logs", 1, 20);

    Cheat.RegisterCallback("ragebot_fire", "RagebotLog");
    Cheat.RegisterCallback("player_hurt", "DamageTakenLog");
    Cheat.RegisterCallback("player_hurt", "DamageGivenLog");
    Cheat.RegisterCallback("Draw", "DrawLogs");
    Cheat.RegisterCallback("Draw", "handleColor");
}
main();







