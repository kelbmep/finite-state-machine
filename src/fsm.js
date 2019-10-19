class FSM {
    constructor(config) {
        if (!config)
            throw new Error("no config");
        this.initial = config.initial;
        this.allStates = config.states;
        this.state = this.initial;
        this.history = [];
        this.buffer = [];
    }

    getState() {
        return this.state;
    }

    changeState(state) {
        if(this.allStates[state])
        {
            this.history.push(this.state);
            this.state = state;
            this.buffer = [];
        }
        else throw new Error ("state does not exist")
    }

    trigger(event) {
        let newState = this.allStates[this.state].transitions[event];
        if(newState)
            this.changeState(newState);
        else throw new Error ("can not perform transition") 
    }

    reset() {
        this.state = this.initial;
    }

    getStates(event) {
        if(!event)
            return Object.keys(this.allStates);
        let arr = [];
        for (let key in this.allStates)
            if (this.allStates[key].transitions[event])
              arr.push(key);
        return arr;
    }

    undo() {
        if(!this.history.length)
            return false;
        this.buffer.push(this.state);
        this.state = this.history.pop();
        return true;
    }

    redo() {
        if(!this.buffer.length)
            return false;
        this.history.push(this.state);    
        this.state = this.buffer.pop();
        return true;
    }

    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;