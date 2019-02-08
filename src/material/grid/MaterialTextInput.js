import { TextInput, Constants, FlexDataGridEvent, Timer } from '../../flexicious';
import TextField from '@material-ui/core/TextField';

import React from 'react';

export default class MaterialTextInput extends TextInput {

    addTemplate() {

        this.handleChange = this.handleChange.bind(this);
        this.children = [<TextField style={{width:this.percentWidth || "100%"}} onChange={this.handleChange} />];
    }
    changeEventHandler(e) {
    }
    clear() {
        this._value = "";
        this.children = [<TextField style={{width:this.percentWidth || "100%"}} onChange={this.handleChange} value={""} />];
        this.requestRender();
    }
    getValue() {
        return this._value || "";
    }
    handleChange(e) {
        this._value = e.currentTarget.value;
        this.children = [<TextField style={{width:this.percentWidth || "100%"}} onChange={this.handleChange} value={this._value} />];
        this.dispatchEvent(new FlexDataGridEvent(Constants.EVENT_CHANGE));
        this.dispatchEvent(new FlexDataGridEvent(Constants.EVENT_VALUE_COMMIT));
        // if change event, intercept
        if (this.timerInstance == null) {
            this.timerInstance = new Timer(this.delayDuration, 1);
            this.timerInstance.addEventListener(this, Constants.EVENT_TIMER_COMPLETE, this.onTimerComplete, false, 0, true);
        }
        this.timerInstance.reset(); // reset if already set...
        this.timerInstance.repeatCount = 1;
        // starts the timer ticking
        this.timerInstance.start();
        this.requestRender();
    }
    componentDidMountCustom() {

    }
    getTextBox(){
        return {value : this._value};
    }
}