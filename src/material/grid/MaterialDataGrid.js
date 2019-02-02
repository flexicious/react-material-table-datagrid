import { ReactDataGrid } from "../../flexicious"
import "../styles.css";
import MaterialAdapter from "../adapter/MaterialAdapter"
import { UIUtils, FlexDataGridColumnLevel, ClassFactory } from "../../flexicious"
import MaterialToolbar from "../adapter/toolbar/MaterialToolbar"

UIUtils.adapter = new MaterialAdapter();
FlexDataGridColumnLevel.static_FlexDataGridPager = new ClassFactory(MaterialToolbar);

export default class MaterialDataGrid extends ReactDataGrid {

    getClassNames() {
        return ["MaterialDataGrid", ...super.getClassNames()];
    }
}