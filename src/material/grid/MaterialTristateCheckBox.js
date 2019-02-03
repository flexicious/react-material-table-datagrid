import { TriStateCheckBox } from '../../flexicious';
import { Checkbox } from '@material-ui/core';
import React from 'react';

export default class MaterialTristateCheckBox extends TriStateCheckBox {
    render(){
        console.log("render:" + this.parent.rowInfo.rowPositionInfo.getRowIndex())
        return super.render();
    }
    attachClass(newClass) {

    }
    shouldComponentUpdateCustom(nextProps, nextState){
        console.log("shouldComponentUpdateCustom:" + this.parent.rowInfo.rowPositionInfo.getRowIndex() + JSON.stringify(nextState))
        return true;
    }
    setSelectedState(val) {
        //console.log("setSelectedState:" + this.parent.rowInfo.rowPositionInfo.getRowIndex())
        super.setSelectedState(val);
        this.determineCheckBox();
        this.parent.setState({ timeStamp: new Date() });
    }
    setData(val){
        //console.log("setData:" + this.parent.rowInfo.rowPositionInfo.getRowIndex())
        super.setData(val);
        this.determineCheckBox();
        //this.setState({ timeStamp: new Date() });
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