import React from "react";
import ReactDOM from "react-dom";
import MaterialDataGrid from "./material/grid/MaterialDataGrid";
import MaterialDataGridColumn from "./material/grid/MaterialDataGridColumn";


function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <MaterialDataGrid
        width={"100%"}
        editable
        enablePaging
        enablePreferencePersistence
        enableExport
        dataProvider={[
          { label: "Company A", state: "NJ", rank: "1.11" },
          { label: "Company B", state: "PA", rank: "11.1" },
          { label: "Company C", state: "CT", rank: "-111" },
          { label: "Company D", state: "NY", rank: "2.34" },
          { label: "Company E", state: "NJ", rank: "22.2" }
        ]}
      >
        <MaterialDataGridColumn dataField="label" />
        <MaterialDataGridColumn dataField="state" />
        <MaterialDataGridColumn dataField="rank" sortNumeric />
      </MaterialDataGrid>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
