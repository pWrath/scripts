var kills = 0;
function onKill() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer() && Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
        //nice suicide idiot lole 
        return;
    }
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) {
        //kill sound
        switch (kills) {
            case 0:
                Sound.Play("ot/scripts/" + announcer + "/kill1")
                kills += 1
                break
            case 1:
                Sound.Play("ot/scripts/" + announcer + "/kill2.wav")
                kills += 1
                break
            case 2:
                Sound.Play("ot/scripts/" + announcer + "/kill3.wav")
                kills += 1
                break
            case 3:
                Sound.Play("ot/scripts/" + announcer + "/kill4.wav")
                kills += 1
                break
            default:
                if (kills == 4) {
                    Sound.Play("ot/scripts/" + announcer + "/kill5.wav")
                }
                else if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Last sound repeated") == 1) {
                    Sound.Play("ot/scripts/" + announcer + "/kill5.wav")
                }
                else {
                    return 69
                }
                kills += 1
                break
        }
    }
    else if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
        //deathsound
        Sound.Play("ot/scripts/" + announcer + "/death.wav")
    }
}
function onOther() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) {
        Sound.Play("ot/scripts/" + announcer + "/chicken.wav")
    }
}
function onStart() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    kills = 0
    Sound.Play("ot/scripts/" + announcer + "/roundstart.wav")
}
function onEnd() {
    //CBaseEntity > m_iTeamNum
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    if (Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_iTeamNum") == Event.GetInt("winner")) {
        Sound.Play("ot/scripts/" + announcer + "/teamwin.wav")
    }
    else {
        Sound.Play("ot/scripts/" + announcer + "/teamlose.wav")
    }
}
function onPlant() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    Sound.Play("ot/scripts/" + announcer + "/planted.wav")
}
function onDefuse() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    Sound.Play("ot/scripts/" + announcer + "/defuse.wav")
}
function onExplode() {
    var announcer = UI.GetString('Misc', 'JAVASCRIPT', 'Script items', "Announcer folder")
    Sound.Play("ot/scripts/" + announcer + "/explode.wav")
}
function main() {
    UI.AddTextbox("Announcer folder")
    UI.AddCheckbox("Last sound repeated")

    Cheat.RegisterCallback("player_death", "onKill")
    Cheat.RegisterCallback("round_poststart", "onStart")
    Cheat.RegisterCallback("other_death", "onOther")
    Cheat.RegisterCallback("bomb_defused", "onDefuse")
    Cheat.RegisterCallback("bomb_planted", "onPlant")
    Cheat.RegisterCallback("bomb_exploded", "onExplode")
    Cheat.RegisterCallback("round_end", "onEnd")
}
main();
//playvol file volume