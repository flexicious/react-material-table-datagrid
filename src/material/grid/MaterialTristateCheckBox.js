/* eslint-disable */
import { TriStateCheckBox } from '../../flexicious';
import { Checkbox } from '@material-ui/core';
import React from 'react';

export default class MaterialTristateCheckBox extends TriStateCheckBox {
    render(){
        return super.render();
    }
    attachClass(newClass) {

    }
    detachClass(){
        
    }
    invalidateDisplayList(){

    }
    setText(){

    }
    setSelectedState(val) {
        super.setSelectedState(val);
        this.determineCheckBox();
        this.setState({ timeStamp: new Date() });
    }
    determineCheckBox() {
        const cb = this.getMiddle() ? this.getEnabled() ?
            <Checkbox indeterminate checked={false} /> : <Checkbox checked={false} indeterminate disabled /> :
            this.getEnabled() ? this.getSelected() ?
                <Checkbox checked /> : <Checkbox checked={false} /> :
                this.getSelected() ?
                    <Checkbox checked disabled /> : <Checkbox disabled checked={false} />;

        this.setAttribute("className", "")
        this.children = [cb];
    }
}