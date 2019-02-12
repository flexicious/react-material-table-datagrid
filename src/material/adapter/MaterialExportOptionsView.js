/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import {
    UIUtils, Constants, UIComponent, ComboBox, ReactDataGrid, ReactDataGridColumn, ToolbarAction
    , MultiSelectComboBox, ExportOptions, PrintExportOptions, BaseEvent
} from '../../flexicious'
import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
/**
 * A ExportOptionsView that which can be used within the filtering/binding infrastructure.
 * @constructor
 * @class ExportOptionsView
 * @namespace flexiciousNmsp
 */
export default class MaterialExportOptionsView extends UIComponent {
    constructor() {
        super({}, "div")
        this.attachClass("flexiciousGrid");
        this.cbxColumns = new MultiSelectComboBox();
        this.cbxColumns.alwaysVisible = true;

        this.cbxExporters = new ComboBox();
        this.cbxExporters.ignoreAllItem = true;
        this.cbxExporters.setAddAllItem(false);
        this.setWidth(800);

        this.exportOptions = new ExportOptions();

    }

    /**
     *
     * @return {Array}
     */
    getClassNames() {
        return ["ExportOptionsView", "UIComponent"];
    }

    setGrid(val) {
        this.grid = val;
        this.enablePaging = val.getEnablePaging();
        this.pageCount = val.getPageSize() > 0 ? Math.ceil(val.getTotalRecords() / val.getPageSize()) : 1;
        this.selectedObjectsCount = val.getSelectedObjectsTopLevel().length;

        const items = this.grid.getExportableColumnsAtAllLevel(this.exportOptions);

        this.itemsToShow = [];

        for (const col of items) {
            if (col.getVisible()) {
                this.itemsToShow.push(col);
            }
        }

    }
    onOK(domElement) {

        this.exportOptions.printExportOption = this.pageSelection;


        const pgFrom = this.pageFrom;
        const pgTo = this.pageTo;
        if (this.pageSelection === PrintExportOptions.PRINT_EXPORT_SELECTED_PAGES) {
            if (pgFrom >= 1 && pgTo >= 1 && pgFrom <= (this.pageCount) && pgTo <= (this.pageCount) && pgFrom <= pgTo) {
                this.exportOptions.pageFrom = pgFrom;
                this.exportOptions.pageTo = pgTo;
                this.close(Constants.ALERT_OK);

            } else {
                window.alert("Please ensure that the 'page from' is less than or equal to 'page to'");
            }
        }
        else {
            this.close(Constants.ALERT_OK);
        }
    }

    close(dialogResult) {
        const closeEvent = new BaseEvent(Constants.EVENT_CLOSE);
        closeEvent.detail = dialogResult;
        this.dispatchEvent(closeEvent);
        this.grid.removePopup(this.popup);
        //UIUtils.removePopUp(this);
    }


    onCancel(evt) {
        this.grid.removePopup(this.popup);
    }

    showDialog() {
        const actions = [ToolbarAction.create((this.exportOptions.openNewWindow ? Constants.PRT_BTN_PRINT_LABEL : Constants.EXP_BTN_EXPORT_LABEL), this.onOK.bind(this), true),
        ToolbarAction.create(Constants.EXP_BTN_CANCEL_LABEL, this.onCancel.bind(this), true),
        ];
        this.popup = UIUtils.addPopUp(this.render(), this.grid, false, null, Constants.SETTINGS_POPUP_TITLE, actions);
        this.grid.addPopup(this.popup);
    }

    /**
     * Initializes the auto complete and watermark plugins
     */
    render() {
        return <div key="exportdiv">
                <div style={{margin: 10,fontSize: 20}}>Settings</div>
            <div key="columnsDiv" style={{float: 'left',margin: 10}}>{Constants.EXP_LBL_COLS_TO_EXPORT_TEXT}

                <ReactDataGrid key="columnsGrid" width={300} height={300} selectedKeyField={"name"} dataProvider={this.exportOptions.availableColumns} enableActiveCellHighlight={false}
                    selectedKeys={this.itemsToShow.length ? UIUtils.extractPropertyValues(this.itemsToShow, "uniqueIdentifier")
                        : UIUtils.extractPropertyValues(this.availableColumns, "name")}
                    onChange={(evt) => {
                        this.exportOptions.columnsToExport = (evt.grid.getSelectedObjects());
                        if (this.exportOptions.columnsToExport.length === 1 && this.exportOptions.columnsToExport[0].name === "All") {
                            this.exportOptions.columnsToExport = [];
                        }
                    }}>
                    <ReactDataGridColumn type={"checkbox"} />
                    <ReactDataGridColumn dataField={"headerText"} headerText={Constants.EXP_LBL_COLS_TO_EXPORT_TEXT} />
                </ReactDataGrid>
            </div>
            <div key="optionsDiv" style={{float: 'right',width: 370,padding: 20}}>
                <FormControl >
                    <RadioGroup name="pageSelection" onChange={(evt, newValue) => { this.pageSelection = newValue; }} defaultSelected={PrintExportOptions.PRINT_EXPORT_CURRENT_PAGE}>
                        <FormControlLabel
                            value={PrintExportOptions.PRINT_EXPORT_CURRENT_PAGE}
                            control={<Radio name="currentPage" className={"flxsExportpaging RBN_CURRENT_PAGE"} />}
                            label={Constants.EXP_RBN_CURRENT_PAGE_LABEL} />
                        <FormControlLabel
                            value={PrintExportOptions.PRINT_EXPORT_ALL_PAGES}
                            control={<Radio name="allPages" className={"flxsExportpaging RBN_ALL_PAGES"} />}
                            label={Constants.EXP_RBN_ALL_PAGES_LABEL} />
                        <FormControlLabel
                            value={PrintExportOptions.PRINT_EXPORT_SELECTED_RECORDS}
                            control={<Radio disabled={this.selectedObjectsCount === 0} className={"flxsExportpaging rbnSelectedRecords"} />}
                            label={Constants.SELECTED_RECORDS + " (" + (this.selectedObjectsCount === 0 ? 'None Selected)' : this.selectedObjectsCount + " selected)")} />
                        <FormControlLabel
                            value={PrintExportOptions.PRINT_EXPORT_SELECTED_PAGES}
                            control={<Radio name="selectedPage" className={"flxsExportpaging RBN_SELECT_PGS"} />}
                            label={Constants.EXP_RBN_SELECT_PGS_LABEL} />
                    </RadioGroup>
                </FormControl>
                
                <TextField  key="fromPage" name="fromPage" style={{width: 150, margin: 5}} onChange={(evt, newValue) => { this.pageTo = newValue; }} />
                <label> {Constants.PGR_TO} </label>
                <TextField  key="toPage" name="toPage" style={{width: 150, margin: 5}}onChange={(evt, newValue) => { this.pageFrom = newValue; }} />
                <label>{this.pageCount}</label>
                <div style={{margin: '5px'}}>

                    <label className={"LBL_EXPORT_FORMAT"}> {Constants.EXP_LBL_EXPORT_FORMAT_TEXT}</label>
                    <select defaultValue={this.exportOptions.getExporterName()} onChange={(evt) => {
                        this.exportOptions.exporter = this.exportOptions.exporters[evt.currentTarget.selectedIndex];
                    }}>
                        {this.exportOptions.exporters.map((exporter, i) => {
                            return <option key={"option" + i} value={exporter.getName()}>{exporter.getName()}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>;
    }
}

MaterialExportOptionsView.prototype.typeName = MaterialExportOptionsView.typeName = 'MaterialExportOptionsView';//for quick inspection