import { TriStateCheckBox } from '../../flexicious';
import { Checkbox } from '@material-ui/core';
import React from 'react';

export default class MaterialTristateCheckBox extends TriStateCheckBox {
 
    render(){
        let cb;
        {
            cb= this.getMiddle()?this.getEnabled()?
            <Checkbox indeterminate/>:<Checkbox indeterminate disabled/>:
            this.getEnabled()?this.getSelected()?
            <Checkbox checked/>:<Checkbox/>:
            this.getSelected()?
            <Checkbox checked disabled/>:<Checkbox disabled/>;
        }

        this.setAttribute("className", "")
        this.children=[cb];
        return super.render();
    }
    attachClass(newClass) {

    }
    setSelectedState(val){
        super.setSelectedState(val);
        this.invalidateState();
    }
}