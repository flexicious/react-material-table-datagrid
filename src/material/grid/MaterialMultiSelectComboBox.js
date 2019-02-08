import { MultiSelectComboBox, TriStateCheckBox, UIUtils, UIComponent, ComboBox, TextInput, Constants, FlexDataGridEvent } from '../../flexicious';
import MaterialTristateCheckBox from './MaterialTristateCheckBox';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import React from 'react'
class MaterialMultiSelectComboBoxCheckBox extends MaterialTristateCheckBox {

    constructor() {
        super();
        this.setStyleAttribute("display", "block")
    }
    determineCheckBox() {
        super.determineCheckBox();
        if (this.labelText)
            this.children.push(this.labelText);
    }
}
export default class MaterialMultiSelectComboBox extends MultiSelectComboBox {
    addTemplate() {
        const template = <span>
            <TextField disabled value={Constants.DEFAULT_ALL_ITEM_TEXT} />
            <IconButton className={'insideIcon inputIcon'} style={{ width: "40px", height: "40px", position: "absolute", right: "0px", top: "0px" }}>
                <MenuIcon />
            </IconButton>
            <IconButton className={'outsideIcon inputIcon'} style={{ display: "none", width: "4px", height: "4px", position: "absolute", right: "0px", top: "0px" }} >
                <MenuIcon />
            </IconButton>
        </span>;
        this.children.push(template.props.children);
        this.onClick = this.onClick.bind(this);
        this.addEventListener(this, Constants.EVENT_CLICK,
            this.onClick
        );
        this._textBox = {};
    }
    getTextBox() {
        return this._textBox;
    }
    setLabel() {
        super.setLabel();
        const template = <span>
            <TextField disabled value={this._label} />
            <IconButton className={'insideIcon inputIcon'} style={{ width: "40px", height: "40px", position: "absolute", right: "0px", top: "0px" }}>
                <MenuIcon />
            </IconButton>
            <IconButton className={'outsideIcon inputIcon'} style={{ display: "none", width: "4px", height: "4px", position: "absolute", right: "0px", top: "0px" }} >
                <MenuIcon />
            </IconButton>
        </span>;
        this.children = [template.props.children];
        this.requestRender();
    }

    onClick() {
        //click anywhere to launch popup
        this.dispatchEvent(new FlexDataGridEvent(TextInput.INSIDE_ICON_CLICK))
    }
    setIconVisible() {

    }
    componentDidMountCustom() {
        ComboBox.addAllItemToDataProvider(this);

    }
    sizeComponents() {

        const insideIconImg = this.getInsideIcon();
        insideIconImg.style.visibility = `visible`;
        insideIconImg.style.top = `2px`;
        insideIconImg.style.left = ``;
        insideIconImg.style.width = `40px`;
        insideIconImg.style.height = `40px`;
    }
    createTriStateCheckBox(lbl, index) {
        const cb = new MaterialMultiSelectComboBoxCheckBox();
        cb.key = index;
        cb.labelText = lbl;
        cb.checkboxIndex = index;
        cb.setSelectedState(TriStateCheckBox.STATE_CHECKED);

        //cb.setSelectedState(flexiciousNmsp.TriStateCheckBox.STATE_CHECKED);//by default everything is checked
        cb.addEventListener(this, "delayedChange", (e) => {
            this.onCheckDelayedChange(e);
        });
        this.checkboxes.push(cb);
        return cb;
    }
    showPopup(parent) {
        this.checkboxes = [];
        return super.showPopup(parent);
    }

    createCheckBoxRow() {
        var row = new UIComponent("div");
        row.attachClass("materialCheckBoxRow");
        return row;
    }
    destroyPopup(force) {
        this.checkboxes = [];
        return super.destroyPopup(force);
    }

    onCheckDelayedChange(e) {

        const cbox = e.target;
        const cbItem = this.getDataProvider()[cbox.checkboxIndex];
        let cbVal = UIUtils.resolveExpression(cbItem, this.dataField);
        if (cbVal === undefined || cbVal == null) {
            cbVal = "";
        }
        const wasAllUnchecked = this.allUnchecked;
        if (cbox.labelText === this.addAllItemText)
            this.allUnchecked = cbox.getSelectedState() === TriStateCheckBox.STATE_UNCHECKED;
        else
            this.allUnchecked = false;
        let clickedOnAll = false;
        if (this.selectedValues.length === 0 && !wasAllUnchecked) {
            //this means nothing was selected before.
            if (cbox.labelText === this.addAllItemText) {
                //cannot do any thing here, since nothing is selected.
            } else {
                for (let i = this.getAddAllItem() ? 1 : 0; i < this.getDataProvider().length; i++) {
                    const item = this.getDataProvider()[i];
                    const itemVal = UIUtils.resolveExpression(item, this.dataField) || "";
                    if (itemVal !== cbVal) {
                        this.selectedValues.push(itemVal);
                    }
                }
            }
        } else {
            if (cbox.labelText === this.addAllItemText) {
                this.selectedValues = [];
                clickedOnAll = true;
            } else {
                if (cbox.getSelectedState() === TriStateCheckBox.STATE_CHECKED && this.selectedValues.indexOf(cbVal) === -1) {
                    this.selectedValues.push(cbVal);
                } else if (cbox.getSelectedState() === TriStateCheckBox.STATE_UNCHECKED && this.selectedValues.indexOf(cbVal) !== -1) {
                    this.selectedValues.splice(this.selectedValues.indexOf(cbVal), 1);
                }
            }
        }
        if (this.selectedValues.length === 0 && !clickedOnAll) {
            this.allUnchecked = true;
        }

        const okB = UIUtils.findElementWithClassName(this.popup.domElement, "okButton");
        if (okB) {
            okB.style.display = this.allUnchecked ? "none" : "";

        }
        this.updateCheckBoxes();
    }
    updateCheckBoxes() {
        if (this.popup) {
            for (let i = 0; i < this.checkboxes.length; i++) {
                const cb = this.checkboxes[i];
                const item = this.getDataProvider()[i];
                if (this.allUnchecked) {
                    cb.setSelectedState(TriStateCheckBox.STATE_UNCHECKED);
                }
                else if (this.selectedValues.length === 0 && this.getAddAllItem()) {
                    cb.setSelectedState(TriStateCheckBox.STATE_CHECKED);
                }
                else if (i === 0 && this.getAddAllItem()) {
                    cb.setSelectedState(this.selectedValues.length >= this.getDataProvider().length - 1 ?
                        TriStateCheckBox.STATE_CHECKED : this.selectedValues.length > 0 ? TriStateCheckBox.STATE_MIDDLE : TriStateCheckBox.STATE_UNCHECKED);
                }
                else {
                    let cbVal = item ? UIUtils.resolveExpression(item, this.dataField) : "";
                    if (cbVal === undefined || cbVal == null) {
                        cbVal = "";
                    }
                    cb.setSelectedState(this.selectedValues.includes(cbVal) ? TriStateCheckBox.STATE_CHECKED : TriStateCheckBox.STATE_UNCHECKED)
                }

            }
            this.setLabel();
        }
    }

}