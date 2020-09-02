var binlib = {};
function dictLength(dict) {
    var count = 0;
    for (_ in dict) {
        count++;
    }
    return count;
}
function createDropdown(name, values, multi) {
    UI[multi ? "AddMultiDropdown" : "AddDropdown"](name, values);

    binlib[name] = { "multi": multi, "values": {} };

    multi && values.reverse();

    var i = 0; for (value in values) {
        var index = multi ? (1 << (values.length - (i + 1))) : i;
        binlib[name].values[index] = values[value];
        i++;
    }
}
function fetchDropdown(name) {
    var selection = (name ? [] : {})
    var bin = UI.GetValue("Misc", name);

    !name && function () { for (dropdown in binlib) selection[dropdown] = fetchDropdown(dropdown) }();

    if (name) {
        !binlib[name].multi && bin == 0 && selection.push(binlib[name].values[0]) && function () { return selection; }();
        for (var i = dictLength(binlib[name].values) - 1; i >= 0; i--) {
            if (!binlib[name].multi && i == 0) continue;

            var index = binlib[name].multi ? (1 << i) : i;
            if (bin - index >= 0) {
                bin -= (index);
                selection.push(binlib[name].values[index]);
            }
        }
    }

    return selection;
}
function returnHitbox(index) {
    var hitboxName = "";
    switch (index) {
        case 0:
            hitboxName = "Head";
            break;
        case 1:
            hitboxName = "Neck";
            break;
        case 2:
            hitboxName = "Pelvis";
            break;
        case 3:
            hitboxName = "Body";
            break;
        case 4:
            hitboxName = "Thorax";
            break;
        case 5:
            hitboxName = "Chest";
            break;
        case 6:
            hitboxName = "Upper chest";
            break;
        case 7:
            hitboxName = "Left thigh";
            break;
        case 8:
            hitboxName = "Right thigh";
            break;
        case 9:
            hitboxName = "Left calf";
            break;
        case 10:
            hitboxName = "Right calf";
            break;
        case 11:
            hitboxName = "Left foot";
            break;
        case 12:
            hitboxName = "Right foot";
            break;
        case 13:
            hitboxName = "Left hand";
            break;
        case 14:
            hitboxName = "Right hand";
            break;
        case 15:
            hitboxName = "Left upper arm";
            break;
        case 16:
            hitboxName = "Left forearm";
            break;
        case 17:
            hitboxName = "Right upper arm";
            break;
        case 18:
            hitboxName = "Right forearm";
            break;
        default:
            hitboxName = "Generic";
    }
    return hitboxName;
}
function returnHitgroup(index) {
    var hitgroupName = "";
    switch (index) {
        case 0:
            hitgroupName = "Generic";
            break;
        case 1:
            hitgroupName = "Head";
            break;
        case 2:
            hitgroupName = "Chest";
            break;
        case 3:
            hitgroupName = "Stomach";
            break;
        case 4:
            hitgroupName = "Left Arm";
            break;
        case 5:
            hitgroupName = "Right Arm";
            break;
        case 6:
            hitgroupName = "Left Leg";
            break;
        case 7:
            hitgroupName = "Right Leg";
            break;
        default:
            hitgroupName = "unknown"
            break;
    }
    return hitgroupName;
}
function returnExploit(index) {
    var returnVal;
    if (index == 0) {
        returnVal = "False";
    }
    else if (index == 1) {
        returnVal = "HS";
    }
    else {
        returnVal = "DT";
    }
    return returnVal;
}
function returnSafepoint(index) {
    var returnVal = "";
    if (index == 1) {
        returnVal = "Yes";
    }
    else {
        returnVal = "No";
    }
    return returnVal;
}
function getVelocity(index) {
    var vel = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
}

function Log(pContent, pColor) {
    this.content = pContent;
    this.color = pColor;
}

var paletteIndex = 0;
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

var shot = false;
var shottick = 0;
var hit = false;
function RagebotLog() {


    shot = true;
    shottick = Globals.Tickcount();



    var rBotColor;
    var cType = fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1) {
        rBotColor = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Ragebot log color");
    }
    else {
        rBotColor = palette[paletteIndex][inPaletteIndex].slice();
    }

    var targetName = Entity.GetName(Event.GetInt("target_index"));
    var targetEyePos = Entity.GetProp(Event.GetInt("target_index"), "CCSPlayer", "m_angEyeAngles");

    var optionsSelected = fetchDropdown("Ragebot log options");

    var nakedLog = "Shot at " + targetName.replace(/^\s+|\s+$/g, '') + "'s " + returnHitbox(Event.GetInt("hitbox"));
    if (optionsSelected.indexOf("Add velocity") != -1) {
        nakedLog += " | (Pvel: " + Math.floor(getVelocity(Entity.GetLocalPlayer())) + " Tvel: " + Math.floor(getVelocity(Event.GetInt("target_index"))) + ")";
    }
    if (optionsSelected.indexOf("Add viewangles") != -1) {
        nakedLog += " | Viewangles(" + Math.floor(targetEyePos[0]) + "," + Math.floor(targetEyePos[1]) + "," + Math.floor(targetEyePos[2]) + ")";
    }
    if (optionsSelected.indexOf("Add hitchance") != -1) {
        nakedLog += " | HC: " + Event.GetInt("hitchance");
    }
    if (optionsSelected.indexOf("Add safe point") != -1) {
        nakedLog += " | SP: " + returnSafepoint(Event.GetInt("safepoint"));
    }
    if (optionsSelected.indexOf("Add exploit") != -1) {
        nakedLog += " | Exploit: " + returnExploit(Event.GetInt("exploit"));
    }
    if (optionsSelected.indexOf("Add exploit info") != -1) {
        nakedLog += " | C: " + Globals.ChokedCommands() + " / " + Exploit.GetCharge().toFixed(2)
    }
    var log = new Log(nakedLog, rBotColor)
    Cheat.PrintColor(log.color, log.content + "\n");




    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        logs.push(log)

        if (!cType.indexOf("None") != -1) {
            inPaletteIndex++
            if (palette[paletteIndex][inPaletteIndex] == "MAX") {
                inPaletteIndex = 1;
                rBotColor = palette[paletteIndex][inPaletteIndex].slice();
            }
        }
    }
}
function DamageTakenLog() {
    var dTakenColor;
    var dLog = fetchDropdown("Other log types");
    if (dLog.indexOf("Damage taken") == -1) {
        return;
    }


    var cType = fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1) {
        dTakenColor = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Damage taken log color");
    }
    else {
        dTakenColor = palette[paletteIndex][inPaletteIndex].slice();

    }


    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {

        var damageLog = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("attacker"))).replace(/^\s+|\s+$/g, '') + " hit you in the " +
            returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";
        var log = new Log(damageLog, dTakenColor)

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log)

            if (!cType.indexOf("None") != -1) {
                inPaletteIndex++
                if (palette[paletteIndex][inPaletteIndex] == "MAX") {
                    inPaletteIndex = 1;
                    dTakenColor = palette[paletteIndex][inPaletteIndex].slice();
                }
            }
        }
    }
}
function DamageGivenLog() {
    var dLog = fetchDropdown("Other log types");
    if (dLog.indexOf("Damage given") == -1) {
        return;
    }
    var dGivenColor;

    var cType = fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1) {
        dGivenColor = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Damage given log color");
    }
    else {
        dGivenColor = palette[paletteIndex][inPaletteIndex].slice();

    }

    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) { 
        hit = true;
        var hitLog = "Shot hit " + Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))).replace(/^\s+|\s+$/g, '') + " in the " +
            returnHitgroup(Event.GetInt("hitgroup")) + " for " + Event.GetInt("dmg_health") + " (" + Event.GetInt("health") + " health remaining)";

        var log = new Log(hitLog, dGivenColor);

        Cheat.PrintColor(log.color, log.content + "\n");

        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
            logs.push(log);
            if (!cType.indexOf("None") != -1) {
                inPaletteIndex++
                if (palette[paletteIndex][inPaletteIndex] == "MAX") {
                    inPaletteIndex = 1;
                    dGivenColor = palette[paletteIndex][inPaletteIndex].slice();
                }
            }
        }

    }
}
function MissLog(){
    var mLog = fetchDropdown("Other log types");
    if (mLog.indexOf("Miss log") == -1) {
        return;
    }
    var missColor;
    var cType = fetchDropdown("Color theme");
    if (cType.indexOf("None") != -1) {
        missColor = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Miss log color");
    }
    if(shot){
        if(Globals.Tickcount() == shottick + 1 && hit != true){
            var log = new Log("Shot missed", missColor);
            logs.push(log);
            Cheat.PrintColor(log.color, log.content + "\n");
            shottick = 0;
            hit = false;
        }
        else if(Globals.Tickcount() == shottick + 1 && hit == true){
            hit = false;
            shottick = 0;
        }
    }
}
var fLoaded = false;
var logs = [];
function DrawLogs() {
    var ss = Render.GetScreenSize()
    if (!fLoaded) {
        //CHANGE THE FONT HERE!!!!!!!!!
        font = Render.AddFont("tahoma", 9, 400);
        font2 = Render.AddFont("tahoma", 8, 400);
        fLoaded = true;
    }
    var maxLogs = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Max logs")
    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {

        if (logs.length > maxLogs) {
            logs.shift();
        }
        if (!logs.length == 0) {
            if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Mode 2")) {
                for (i = 0; i < logs.length; i++) {
                    Render.StringCustom(ss[0] / 2 + 3, ss[1] / 2 + 3 + i * 13, 0, logs[i].content, logs[i].color, font2);
                }
            }
            else {
                for (i = 0; i < logs.length; i++) {
                    Render.StringCustom(5, i * 13, 0, logs[i].content, logs[i].color, font);
                }
            }

            //Increase the number after the -= to increase how fast it fades away 
            logs[0].color[3] -= 1;
            if (logs[0].color[3] <= 0) {
                logs.shift();
            }
        }
    }
}
function handleColor() {
    var cType = fetchDropdown("Color theme");
    if (!cType.indexOf("None") != -1) {
        if (cType.indexOf("estrogen") != -1) {
            paletteIndex = 0;
        }
        else if (cType.indexOf("rainbow") != -1) {
            paletteIndex = 1;
        }
        else if (cType.indexOf("vaporwave") != -1) {
            paletteIndex = 2;
        }
        else if (cType.indexOf("cyberpunk") != -1) {
            paletteIndex = 3;
        }
    }

}
function main() {
    UI.AddLabel("--- Ragebot logs ---");
    createDropdown("Ragebot log options", ["Add velocity", "Add viewangles", "Add hitchance", "Add safe point", "Add exploit", "Add exploit info"], true);

    createDropdown("Other log types", ["Miss log", "Damage taken", "Damage given"], true);

    //Add the palettes here in the list
    createDropdown("Color theme", ["None", "estrogen", "rainbow", "vaporwave", "cyberpunk"], false);


    UI.AddColorPicker("Ragebot log color");
    UI.AddColorPicker("Damage taken log color");
    UI.AddColorPicker("Damage given log color");
    UI.AddColorPicker("Miss log color");
    UI.AddCheckbox("Draw logs on screen")
    UI.AddCheckbox("Mode 2")
    UI.AddSliderInt("Max logs", 1, 20);
    UI.AddLabel("--- --- ---");

    Cheat.RegisterCallback("CreateMove", "MissLog");
    Cheat.RegisterCallback("ragebot_fire", "RagebotLog");
    Cheat.RegisterCallback("player_hurt", "DamageTakenLog");
    Cheat.RegisterCallback("player_hurt", "DamageGivenLog");
    Cheat.RegisterCallback("Draw", "DrawLogs");
    Cheat.RegisterCallback("Draw", "handleColor");
}
main();
