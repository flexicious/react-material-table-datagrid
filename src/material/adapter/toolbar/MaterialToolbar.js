/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import React from 'react';
import { UIComponent } from "../../../flexicious";
import ToolbarImpl from './ToolbarImpl';

/**
 * Toolbar that sits on top of the datagrid component. This is a bridge class between the flexicious grid and the 
 * toolbar react component. The toolbar needs to implement a certain api (most of which it inherits from UIComponent)
 * Then the actual react component dispatches events that the grid knows how to handle.
 * @constructor
 * @class PagerControl
 * @namespace flexiciousNmsp
 * 
 */
export default class MaterialToolbar extends UIComponent {
    constructor() {
        super({}, "span")
        this.attachClass("flexiciousGridPager");
    }
    setPageSize(val) {
        this._pageSize = val;
    }
    setPageIndex(val) {
        this._pageIndex = val;
    }
    setTotalRecords(val) {
        this._totalRecords = val;
        this.reRender();
    }
    
    getPageSize() {
        return this._pageSize;
    }
    getPageIndex() {
        return this._pageIndex;
    }
    getTotalRecords() {
        return this._totalRecords;
    }
    getClassNames() {
        return ["PagerControl", "UIComponent", "IExtendedPager"];
    }
    refresh(){
        this.reRender();
    }
    render() {

        this.children = [<ToolbarImpl pager={this} newProp={new Date()}/>]
        return super.render();
        //return val;ToolbarImpl
    }

    reRender(){
        
        this.render();
        if(this.reactComponent)
        this.reactComponent.setState({"timestamp": new Date()});//force re-render
    }
}

MaterialToolbar.prototype.typeName = MaterialToolbar.typeName = "PagerControl";
MaterialToolbar.prototype.doDispatchEvents = true;
