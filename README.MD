Welcome to React DataGrid

The MOST Powerful DataGrid/DataTable/Tree Table component for React based Line Of Business Applications

Print, Word/Excel Export, Server/Client Paging and Filtering, Customizable Filter Controls and Summary Footers, User Settings, Preference Persistence

Smooth scroll, Nested Hierarchical Tree/child grids, Left/Right Locked Columns, Lazy Load/Virtual Scroll

Visit us at:

http://www.reactdatagrid.com/

Instructions

* Instruction Video : https://www.youtube.com/watch?v=sO3o0zG93fM
* Running example : https://www.webpackbin.com/bins/-Kj9JhCTXC3CghFUfRtQ
* Code : https://github.com/flexicious/react-datagrid-getting-started 

1) npm install 
2) npm start  
Sample code:
```
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
