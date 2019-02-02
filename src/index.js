import React from "react";
import ReactDOM from "react-dom";
import MaterialDataGrid from "./material/grid/MaterialDataGrid";
import MaterialDataGridColumn from "./material/grid/MaterialDataGridColumn";
import MaterialCheckBoxColumn from "./material/grid/MaterialCheckBoxColumn";
import { Constants, DateRange } from "./flexicious";


function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <MaterialDataGrid
        width={"100%"}
        enablePaging
        enablePreferencePersistence
        enableExport
        enableFilters
        enableFooters
        dataProvider={[
          { label: "Company A", state: "NJ", rank: "1.11", date: new Date(2018, 10, 10) },
          { label: "Company B", state: "PA", rank: "11.1", date: new Date(2018, 11, 10) },
          { label: "Company C", state: "CT", rank: "-111", date: new Date(2019, 0, 10) },
          { label: "Company D", state: "NY", rank: "2.34", date: new Date(2019, 1, 10) },
          { label: "Company E", state: "NJ", rank: "22.2", date: new Date(2019, 2, 10) }
        ]}
      >

        <MaterialCheckBoxColumn/>
        <MaterialDataGridColumn dataField="label" filterControl="TextInput" />
        <MaterialDataGridColumn dataField="state" filterControl="MultiSelectComboBox" filterComboBoxBuildFromGrid />
        <MaterialDataGridColumn dataField="rank" sortNumeric filterControl="NumericRangeBox" />
        <MaterialDataGridColumn dataField="state" headerText="state1" filterControl="ComboBox" filterComboBoxBuildFromGrid />
        <MaterialDataGridColumn dataField="date" format="date" formatterDateFormatString={Constants.LONG_DATE_MASK}
          filterControl="DateComboBox"
          filterDateRangeOptions={[DateRange.DATE_RANGE_THISQUARTER, DateRange.DATE_RANGE_LASTQUARTER, DateRange.DATE_RANGE_THISYEAR, DateRange.DATE_RANGE_LASTYEAR, DateRange.DATE_RANGE_CUSTOM]}
          footerOperation="count" footerLabel="Count:" footerOperationPrecision="0" />
      </MaterialDataGrid>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
