var library = require("commonmodule.module");


function Log(pContent, pColor) {
    this.content = pContent;
    this.color = pColor;
}

var globalColorIndex = 0;
var globalColor = [];
function RagebotLog() {


    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("none") != -1)
    {
        var pColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Ragebot log color");
    }
    else
    {
        var pColor = globalColor;
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
    var log = new Log(nakedLog, pColor)
    Cheat.PrintColor(log.color, log.content + "\n");

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        logs.push(log)
    }
}
function DamageTakenLog() {
    var dLog = library.fetchDropdown("Damage log types");
    if (dLog.indexOf("Damage taken") == -1) {
        return;
    }


    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("none") != -1)
    {
        var pColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage taken log color");
    }
    else
    {
        var pColor = globalColor;
    }


    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {

        var damageLog = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("attacker"))) + " hit you in the " +
        library.returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";

        var log = new Log(damageLog, pColor)

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log)
        }
    }
}
function DamageGivenLog() {
    var dLog = library.fetchDropdown("Damage log types");
    if (dLog.indexOf("Damage given") == -1) {
        return;
    }


    var cType = library.fetchDropdown("Color theme");
    if (cType.indexOf("none") != -1)
    {
        var pColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage given log color");
    }
    else
    {
        var pColor = globalColor;
    }

    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) {
        var hitLog = "You hit " + Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))) + " in the " + 
        library.returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";

        var log = new Log(hitLog, pColor);

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log);
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
function main() {

    library.createDropdown("Ragebot log options", ["Add velocity", "Add viewangles", "Add hitchance", "Add safe point", "Add exploit"], true);
    
    library.createDropdown("Damage log types", ["Damage taken", "Damage given"], true);
    library.createDropdown("Color theme", ["none", "Damage given"], true);
    UI.AddColorPicker("Ragebot log color");
    UI.AddColorPicker("Damage taken log color");
    UI.AddColorPicker("Damage given log color");
    UI.AddCheckbox("Draw logs on screen")
    UI.AddSliderInt("Max logs", 1, 20);

    Cheat.RegisterCallback("ragebot_fire", "RagebotLog");
    Cheat.RegisterCallback("player_hurt", "DamageTakenLog");
    Cheat.RegisterCallback("player_hurt", "DamageGivenLog");
    Cheat.RegisterCallback("Draw", "DrawLogs");
}
main();




/*
global color needs to be rgba array 


*/



