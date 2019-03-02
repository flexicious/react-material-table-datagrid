/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import { MenuItem, Select } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { ArrowLeft, ArrowRight, ClearAll, FilterList, GetApp, Settings, SettingsApplications, SkipNext, SkipPrevious, Sync } from '@material-ui/icons';
import React from 'react';
import { Constants, ExtendedFilterPageSortChangeEvent, FlexDataGrid, FlexDataGridEvent, UIUtils } from "../../../flexicious";

/**
 * Toolbar that sits on top of the datagrid component
 * @constructor
 * @class PagerControl
 * @namespace flexiciousNmsp
 * 
 */
export default class ToolbarImpl extends React.Component {

    getClassNames() {
        return ["PagerControl", "UIComponent", "IExtendedPager"];
    }

    getPageSize() {
        return this.props.pager._pageSize;
    }

    setPageSize(val) {
        this.props.pager._pageSize = val;
    }

    getPageIndex() {
        return this.props.pager._pageIndex;
    }

    setPageIndex(val) {
        if (this.props.pager._pageIndex !== val) {
            this.props.pager._pageIndex = val;
            this.onPageChanged();
            this.props.pager.dispatchEvent(new FlexDataGridEvent("pageIndexChanged"));
        }
    }

    setTotalRecords(val) {
        this.props.pager._totalRecords = val;
        this.setPageIndex(0);
        this.props.pager.dispatchEvent(new FlexDataGridEvent("reset"));
        this.refresh();
    }

    getTotalRecords() {
        return this.props.pager._totalRecords;
    }

    /**
     * Default handler for the First Page Navigation Button
     */
    onImgFirstClick() {
        this.props.pager._pageIndex = 0;
        this.onPageChanged();
    }

    /**
     * Default handler for the Previous Page Navigation Button
     */
    onImgPreviousClick() {
        if (this.props.pager._pageIndex > 0) {
            this.props.pager._pageIndex--;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Next Page Navigation Button
     */
    onImgNextClick() {

        if (this.props.pager._pageIndex < this.getPageCount() - 1) {
            this.props.pager._pageIndex++;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Last Page Navigation Button
     */
    onImgLastClick() {
        if (this.props.pager._pageIndex < this.getPageCount() - 1) {
            this.props.pager._pageIndex = this.getPageCount() - 1;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Page Change Combo Box
     */
    onPageCbxChange(event) {
        this.props.pager._pageIndex = parseInt(event.target.value) - 1;
        this.onPageChanged();
        this.refresh();
    }

    /**
     * Default handler for the Page Change Event
     */
    onPageChanged() {

        this.refresh();
        if (this.props.pager.doDispatchEvents)
            this.props.pager.dispatchEvent(new ExtendedFilterPageSortChangeEvent(ExtendedFilterPageSortChangeEvent.PAGE_CHANGE));
        this.setState({ "timeStamp": new Date() });
    }

    /**
     * Sets the page index to 1(0), dispatches the reset event.
     */
    reset() {
        this.props.pager._pageIndex = 0;
        this.getPageDropdown().selectedIndex = 0;
        this.props.pager.dispatchEvent(new FlexDataGridEvent("reset"));
    }

    getPageStart() {
        return this.props.pager._totalRecords === 0 ? 0 : ((this.props.pager._pageIndex) * this.props.pager._pageSize) + 1;

    }

    getPageEnd() {
        const val = (this.props.pager._pageIndex + 1) * this.props.pager._pageSize;
        return (val > this.props.pager._totalRecords) ? this.props.pager._totalRecords : val;

    }

    getPageCount() {
        return this.getPageSize() > 0 ? Math.ceil(this.getTotalRecords() / this.getPageSize()) : 0;

    }

    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.props.pager.grid,ExportOptions.create(ExportOptions.DOC_EXPORT))
     */
    onWordExport() {
        this.props.pager.grid.toolbarWordHandlerFunction();

    }

    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.props.pager.grid,ExportOptions.create())
     */
    onExcelExport() {
        this.props.pager.grid.toolbarExcelHandlerFunction();

    }

    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create();
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.props.pager.grid,po)
     */
    onPrint() {
        this.props.pager.grid.toolbarPrintHandlerFunction();

    }

    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create(true);
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.props.pager.grid,po)
     */
    onPdf() {
        this.props.pager.grid.toolbarPdfHandlerFunction();

    }

    /**
     * Default handler for the Clear Filter Button.
     * Calls grid.clearFilter()
     */
    onClearFilter() {
        this.props.pager.grid.clearFilter();

    }

    /**
     * Default handler for the Process Filter Button.
     * Calls grid.processFilter()
     */
    onProcessFilter() {
        this.props.pager.grid.processFilter();

    }

    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.props.pager.grid.filterVisible=!this.props.pager.grid.filterVisible;nestedGrid.placeSections()
     */
    onShowHideFilter() {
        this.props.pager.grid.setFilterVisible(!this.props.pager.grid.getFilterVisible());
        this.props.pager.grid.rebuild()
    }

    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.props.pager.grid.filterVisible=!this.props.pager.grid.filterVisible;nestedGrid.placeSections()
     */
    onShowHideFooter() {
        this.props.pager.grid.footerVisible = !this.props.pager.grid.footerVisible; this.props.pager.grid.placeSections()
    }

    /**
     * Default handler for the Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onShowSettingsPopup() {
        const popup = this.props.pager.grid.popupFactorySettingsPopup.newInstance();
        popup.setGrid(this.props.pager.grid);
        popup.showDialog();
    }

    /**
     * Default handler for the OPen Settings Popup
     * Calls var popup:OpenSettingsPopup=new OpenSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onOpenSettingsPopup() {
        const popup = this.props.pager.grid.popupFactoryOpenSettingsPopup.newInstance();
        popup.setGrid(this.props.pager.grid);
        popup.showDialog();
    }

    /**
     * Default handler for the Save Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onSaveSettingsPopup() {
        const popup = this.props.pager.grid.popupFactorySaveSettingsPopup.newInstance();
        popup.setGrid(this.props.pager.grid);
        popup.showDialog();
    }

    render() {
        let gridId = this.props.pager.grid.id;
        gridId += "_";

        const topLevelToolbarButtons = [];
        if (!this.props.pager.level) {
            return <div />;
        }
        if (!this.linesep) {
            this.linesep = 1;
        }
        var linesep = this.linesep;
        if (this.props.pager.level.getNestDepth() === 1) {
            if (this.props.pager.grid.enableDrillDown) {
                topLevelToolbarButtons.push(
                    <span key="1">
                        <span key={gridId + "btnCollapseOne"} id={gridId + "btnCollapseOne"} className={"pagerDiv  iconCell"} onClick={this.expandUp.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/collapseOne.png"} className={"imageButtonExpandUp"}
                                    alt={Constants.PGR_BTN_EXP_ONE_UP_TOOLTIP} title={Constants.PGR_BTN_EXP_ONE_UP_TOOLTIP} />
                            </IconButton>
                        </span>

                        <span key={gridId + "btnExpandOne"} id={gridId + "btnExpandOne"} className={"pagerDiv  iconCell"} onClick={this.expandDown.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/expandOne.png"} className={"imageButtonExpandDown"}
                                    alt={Constants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP} title={Constants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP} />
                            </IconButton>
                        </span>
                        <span className={"pagerDiv lineSep"}>&nbsp;</span>
                        <span key={gridId + "btnCollapseAll"} id={gridId + "btnCollapseAll"} className={"pagerDiv  iconCell"} onClick={this.collapseAll.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/collapseAll.png"} className={"imageButtonCollapseAll"}
                                    alt={Constants.PGR_BTN_COLLAPSE_ALL_TOOLTIP} title={Constants.PGR_BTN_COLLAPSE_ALL_TOOLTIP} />
                            </IconButton>
                        </span>

                        <span key={gridId + "btnExpandAll"} id={gridId + "btnExpandAll"} className={"pagerDiv  iconCell"} onClick={this.expandAll.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/expandAll.png"} className={"imageButtonExpandAll"}
                                    alt={Constants.PGR_BTN_EXP_ALL_TOOLTIP} title={Constants.PGR_BTN_EXP_ALL_TOOLTIP} />
                            </IconButton>
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );

            }

            if (this.props.pager.grid.enableMultiColumnSort) {
                topLevelToolbarButtons.push(
                    <span key="2">
                        <span key={gridId + "btnSort"} id={gridId + "btnSort"} className={"pagerDiv  iconCell"} onClick={this.onMultiColumnSort.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/sort.png"} className={"imageButtonSort"}
                                    alt={Constants.PGR_BTN_SORT_TOOLTIP} title={Constants.PGR_BTN_SORT_TOOLTIP} />
                            </IconButton>
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }
            //not yet supported

            if (this.props.pager.grid.enablePreferencePersistence) {
                topLevelToolbarButtons.push(
                    <span key="3">
                        <span key={gridId + "btnSettings"} id={gridId + "btnSettings"} className={"pagerDiv  iconCell"} onClick={this.onShowSettingsPopup.bind(this)}>
                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_SETTINGS_TOOLTIP}>
                                <Settings className={"imageButtonSettings"}>{}</Settings>
                                {/* <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/settings.png"} 
                            className={"imageButtonSettings"}
                                alt={Constants.PGR_BTN_SETTINGS_TOOLTIP} title={Constants.PGR_BTN_SETTINGS_TOOLTIP} /> */}
                            </IconButton>
                        </span>
                    </span>
                );
                if (this.props.pager.grid.enableMultiplePreferences) {
                    topLevelToolbarButtons.push(
                        <span key="4">
                            <span key={gridId + "btnSettings"} id={gridId + "btnSettings"} className={"pagerDiv  iconCell"} onClick={this.onOpenSettingsPopup.bind(this)}>
                                <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_OPEN_SETTINGS_TOOLTIP}>
                                    <Settings className={"imageButtonOpenSettings"}>{}</Settings>
                                </IconButton>
                            </span>
                        </span>
                    );
                }

                topLevelToolbarButtons.push(
                    <span key="5">
                        <span key={gridId + "btnSaveSettings"} id={gridId + "btnSaveSettings"} className={"pagerDiv  iconCell"} onClick={this.onSaveSettingsPopup.bind(this)}>
                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_SAVE_SETTINGS_TOOLTIP}>
                                <SettingsApplications className={"imageButtonSaveSettings"}>
                                    {}
                                </SettingsApplications>
                            </IconButton>
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }

            if (this.props.pager.level.getEnableFilters()) {
                topLevelToolbarButtons.push(
                    <span key="6">
                        <span key={gridId + "btnFilterShowHide"} id={gridId + "btnFilterShowHide"} className={"pagerDiv  iconCell"} onClick={this.onShowHideFilter.bind(this)}>
                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_FILTER_TOOLTIP}>
                                <FilterList className={"imageButtonFilterShowHide"} />
                            </IconButton>
                        </span>
                    </span>
                );
                topLevelToolbarButtons.push(
                    <span key="7">
                        <span key={gridId + "btnFilter"} id={gridId + "btnFilter"} className={"pagerDiv  iconCell"} onClick={this.onProcessFilter.bind(this)}>
                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_RUN_FILTER_TOOLTIP}>
                                <Sync className={"imageButtonFilter"} />
                            </IconButton>
                        </span>
                    </span>
                );
                topLevelToolbarButtons.push(
                    <span key="8">
                        <span key={gridId + "btnClearFilter"} id={gridId + "btnClearFilter"} className={"pagerDiv  iconCell"} onClick={this.onClearFilter.bind(this)}>

                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_CLEAR_FILTER_TOOLTIP}>
                                <ClearAll className={"imageButtonClearFilter"} />
                            </IconButton>
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }
            if (this.props.pager.grid.enablePrint) {
                topLevelToolbarButtons.push(

                    <span key="9">
                        <span key={gridId + "btnPrint"} id={gridId + "btnPrint"} className={"pagerDiv  iconCell"} onClick={this.onPrint.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/print.png"} className={"imageButtonPrint"}
                                    alt={Constants.PGR_BTN_PRINT_TOOLTIP} title={Constants.PGR_BTN_PRINT_TOOLTIP} />
                            </IconButton>
                        </span>
                    </span>);

            }
            if (this.props.pager.grid.enablePdf) {
                topLevelToolbarButtons.push(
                    <span key="10">
                        <span key={gridId + "btnPdf"} id={gridId + "btnPdf"} className={"pagerDiv  iconCell"} onClick={this.onPdf.bind(this)}>
                            <IconButton className={"imageButtonSize"}>
                                <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/pdf.png"} className={"imageButtonPdf"}
                                    alt={Constants.PGR_BTN_PDF_TOOLTIP} title={Constants.PGR_BTN_PDF_TOOLTIP} />
                            </IconButton>
                        </span>
                    </span>);

            }
            if (this.props.pager.grid.enablePrint || this.props.pager.grid.enablePdf) {
                topLevelToolbarButtons.push(<span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                );
            }

            // if (this.props.pager.grid.enableExport) {
            //     topLevelToolbarButtons.push(
            //         <span key="11">
            //             <span key={gridId + "btnWord"} id={gridId + "btnWord"} className={"pagerDiv  iconCell"}>
            //                 <IconButton className={"imageButtonSize"}>
            //                     <img tabIndex={0} src={this.props.pager.grid.getThemeToolbarIconFolder() + "/word.png"} className={"imageButtonWord"}
            //                         alt={Constants.PGR_BTN_WORD_TOOLTIP} title={Constants.PGR_BTN_WORD_TOOLTIP} />
            //                 </IconButton>
            //             </span>
            //         </span>);
            // }
            if (this.props.pager.grid.enableExport) {
                topLevelToolbarButtons.push(
                    <span key="12">
                        <span key={gridId + "btnExcel"} id={gridId + "btnExcel"} className={"pagerDiv  iconCell"} onClick={this.onExcelExport.bind(this)}>
                            <IconButton style={{ width: "40px", height: "40px" }} title={Constants.PGR_BTN_EXCEL_TOOLTIP}>
                                <GetApp className={"imageButtonExcel"} />
                            </IconButton>
                        </span>
                    </span>);
            }

        }
        const options = [];
        for (let i = 1; i <= this.getPageCount(); i++) {
            const option = {};
            option.value = i;
            option.text = i;
            option.selected = ((this.props.pager._pageIndex + 1 === i) ? 'selected' : '');
            options.push(option);
        }

 


        const val = <div className={"pagerControl flexiciousGridPager cellRenderer"} style={{ display: 'block' }}>
            <span className={"pagerTable"} key={gridId + "pagerTable"} style={{ float: "left", height: this.props.pager.getHeight() + 'px' }}>
                {this.props.pager.level.enablePaging ? <span key="pageInfo" className={"pagerDiv pageInfo"} > {`${Constants.PGR_ITEMS} ${this.getPageStart()} ${Constants.PGR_TO} ${this.getPageEnd()} ${Constants.PGR_OF} ${this.getTotalRecords()}. ${Constants.PGR_PAGE} ${this.getPageIndex() + 1} ${Constants.PGR_OF} ${this.getPageCount()} `}</span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "btnFirstPage"} id={gridId + "btnFirstPage"} className={"pagerDiv iconCell firstPage"} onClick={this.onImgFirstClick.bind(this)}>
                    <IconButton disabled={this.getPageIndex() === 0} tabIndex='0' className={"imageButtonFirstPage imageButtonSize"} alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} > <SkipPrevious /> </IconButton>
                    {/* <img tabIndex='0' src={this.props.pager.grid.getThemeToolbarIconFolder() + "/firstPage.png"} className={"imageButtonFirstPage"}
                        alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} /> */}
                </span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "btnPreviousPage"} id={gridId + "btnPreviousPage"} className={"pagerDiv iconCell prevPage"} onClick={this.onImgPreviousClick.bind(this)}>
                    <IconButton disabled={this.getPageIndex() === 0} tabIndex='0' className={"imageButtonPrevPage imageButtonSize"} alt={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} title={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} > <ArrowLeft /> </IconButton>
                    {/* <img tabIndex='0' src={this.props.pager.grid.getThemeToolbarIconFolder() + "/prevPage.png"} className={"imageButtonPrevPage"}
                        alt={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} title={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} /> */}
                </span> : null}

                {this.props.pager.level.enablePaging ? <span  key={gridId + "btnNextPage"} id={gridId + "btnNextPage"} className={"pagerDiv iconCell nextPage"} onClick={this.onImgNextClick.bind(this)}>
                    <IconButton disabled={this.getPageIndex() >= (this.getPageCount() - 1)} tabIndex='0' className={"imageButtonNextpage imageButtonSize"} alt={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} title={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} > <ArrowRight /> </IconButton>
                    {/* <img tabIndex='0' src={this.props.pager.grid.getThemeToolbarIconFolder() + "/nextPage.png"} className={"imageButtonNextPage"}
                        alt={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} title={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} /> */}
                </span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "btnLastPage"} id={gridId + "btnLastPage"} className={"pagerDiv iconCell lastPage"} onClick={this.onImgLastClick.bind(this)}>
                    <IconButton disabled={this.getPageIndex() >= (this.getPageCount() - 1)} tabIndex='0' className={"imageButtonLastPage imageButtonSize"} alt={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} title={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} > <SkipNext /> </IconButton>
                    {/* <img tabIndex='0' src={this.props.pager.grid.getThemeToolbarIconFolder() + "/lastPage.png"} className={"imageButtonLastPage"}
                        alt={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} title={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} /> */}
                </span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "lblGotoPage"} id={gridId + "lblGotoPage"} className={"pagerDiv  gotoPage"}>
                    {Constants.PGR_LBL_GOTO_PAGE_TEXT} <Select className={"pageDropdown"} value={this.props.pager._pageIndex + 1} onChange={this.onPageCbxChange.bind(this)}>
                        {options.map((opt, i) => {
                            return <MenuItem value={opt.value} key={i}>{opt.text}</MenuItem>
                        })}
                    </Select> </span> : null}

                {this.props.pager.level.enablePaging ? <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span> : null}
            </span>
            <span key={gridId + "pagerTable2"} className={"pagerTable"} style={{ float: 'right', height: this.props.pager.getHeight() + 'px' }} >
                {topLevelToolbarButtons}
            </span>

        </div>;
        return val;
        //return val;
    }

    componentDidMount() {
        if (!this.props.pager.level) {
            return;
        }
        this.refresh();
        this.props.pager.grid.addEventListener(this, FlexDataGrid.EVENT_CHANGE, this.refresh);

    }
    enableDisableButton(button, enabled) {
        button.enabled = enabled;
        if (!button.enabled) {
            UIUtils.attachClass(button, "disabled")
            const img = UIUtils.findFirstElementByTagName(button, "IMG");
            if (img && img.hasOwnProperty('className')) {
                UIUtils.detachClass(img, "over")
                //this.props.pager.grid.domElement.focus();
            }
        }
        else
            UIUtils.detachClass(button, "disabled")
    }

    rebuild() {
        this.invalidateDisplayList();
    }

    refresh() {
        this.setState({ "timeStamp": new Date() });
    }

    onMultiColumnSort() {
        this.props.pager.grid.multiColumnSortShowPopup();
    }
} 