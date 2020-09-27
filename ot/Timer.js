//begin time keeping functions
var masterTime = {
    tick: 0,
    ms: 0
}
function updateTime() {
    masterTime.tick += 1;
    var d = new Date();
    masterTime.ms = d.getTime();
    //Cheat.Print(masterTime.tick)
}
function getTick() {
    return masterTime.tick;
}
function getTime() {
    return masterTime.ms;
}
Cheat.RegisterCallback("CreateMove", "updateTime")
//end time keeping functions 

//begin timer functions
function Timer(tickbased) {
    this.useTicks = tickbased;
    this.startTime = 0;
    //this.m_id = identifier
    this.begin = function () {
        this.useTicks ? this.startTime = getTick() : this.startTime = getTime()
    }
    this.end = function () {
        var delta = 0;
        this.useTicks ? delta = getTick() - this.startTime : delta = getTime() - this.startTime;
        this.startTime = 0;
        return delta;
    }
    this.check = function () {
        var delta = 0;
        this.useTicks ? delta = getTick() - this.startTime : delta = getTime() - this.startTime;
        return delta;
    }
    this.reset = function () {
        this.startTime = 0;
    }
}
//end timer functions
