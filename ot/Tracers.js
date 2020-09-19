var traceContainer = [];
function tracer(eyepos, hitpos, time) {
    this.eyepos = eyepos
    this.position = hitpos
    this.time = time
}
var impact = 0;
function onBulletImpact() {
    if (Globals.Tickcount() > impact) {
        if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
            var x = Event.GetFloat("x")
            var y = Event.GetFloat("y")
            var z = Event.GetFloat("z")

            var pos = [x, y, z]

            var view = Entity.GetEyePosition(Entity.GetLocalPlayer());

            traceContainer.push(new tracer(view, pos, Globals.Tickcount()))
            impact = Globals.Tickcount()
        }
    }
}
function onDraw() {
    if (Entity.IsAlive(Entity.GetLocalPlayer()) == false) {
        traceContainer = [];
        return
    }
    var t = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Ticks tracer lasts")
    var col = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Tracer color")
    for (i in traceContainer) {
        //Cheat.Print("lol")
        var ss = Render.GetScreenSize()
        var view2s = Render.WorldToScreen(traceContainer[i].eyepos)
        var pos2s = Render.WorldToScreen(traceContainer[i].position)
        if (pos2s[2] != 0 && view2s[2] != 0) {
            /*
            this is what i did to check for w2s throwing garbage invalid numbers 
            not sure why it considers -20k valid but whatever
            all this check does it check if the number given is too far out of the bounds of the screen size to make sense
            the +- 100 is because small overflows are ok and still end up rendering properly you can probably do more/less 
            but i figured that this much looks ok
            */
            
            if ((view2s[0] < -100 || view2s[0] > ss[0] + 100 || pos2s[0] < -100 || pos2s[0] > ss[0] + 100
                || view2s[1] < -100 || view2s[1] > ss[1] + 100 || pos2s[1] < -100 || pos2s[1] > ss[1] + 100) == false) {
                currenteye = Entity.GetEyePosition(Entity.GetLocalPlayer())
                //pasted from google : ) 
                var dx = currenteye[0] - traceContainer[i].eyepos[0];
                var dy = currenteye[1] - traceContainer[i].eyepos[1];
                var dz = currenteye[2] - traceContainer[i].eyepos[2];

                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson") == 0 || dist > 0.3) {
                    //Center main line
                    Render.Line(view2s[0], view2s[1], pos2s[0], pos2s[1], col)

                    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Type") == 1) {
                        //+1 on width
                        Render.Line(view2s[0] + 1, view2s[1], pos2s[0] + 1, pos2s[1], col)

                        //+1 on height
                        Render.Line(view2s[0], view2s[1] + 1, pos2s[0], pos2s[1] + 1, col)

                        //-1 on width
                        Render.Line(view2s[0] - 1, view2s[1], pos2s[0] - 1, pos2s[1], col)

                        //-1 on height
                        Render.Line(view2s[0], view2s[1] - 1, pos2s[0], pos2s[1] - 1, col)
                    }
                }
            }
        }
        if (traceContainer[i].time + t < Globals.Tickcount()) {
            traceContainer.shift()
        }
        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Max tracers") < traceContainer.length) {
            traceContainer.shift()
        }
    }
}
UI.AddColorPicker("Tracer color")
UI.AddSliderInt("Ticks tracer lasts", 1, 640)
UI.AddSliderInt("Max tracers", 1, 50)
UI.AddDropdown("Type", ["Thin", "Thick"])
Cheat.RegisterCallback("Draw", "onDraw")
Cheat.RegisterCallback("bullet_impact", "onBulletImpact")