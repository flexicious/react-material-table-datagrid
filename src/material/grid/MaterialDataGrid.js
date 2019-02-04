import { ReactDataGrid } from "../../flexicious"
import "../styles.css";
import MaterialAdapter from "../adapter/MaterialAdapter"
import { UIUtils, FlexDataGridColumnLevel, ClassFactory } from "../../flexicious"
import MaterialToolbar from "../adapter/toolbar/MaterialToolbar"
import MaterialMultiSelectComboBox from "./MaterialMultiSelectComboBox"


UIUtils.adapter = new MaterialAdapter();
FlexDataGridColumnLevel.static_FlexDataGridPager = new ClassFactory(MaterialToolbar);

export default class MaterialDataGrid extends ReactDataGrid {

    getClassNames() {
        return ["MaterialDataGrid", ...super.getClassNames()];
    }
    applyAttribute(target, attr, node, direct) {
        let attrName = direct ? attr : attr.name;
        let val = direct ? node : node.attributes.getNamedItem(attrName).value;

        if (attrName === "filterControl" && val === "MultiSelectComboBox") {
            //we automatically swap this out for a filter control
            attr = "filterRenderer";
            node = new ClassFactory(MaterialMultiSelectComboBox);
        }

        super.applyAttribute(target, attr, node, direct);
    }
}