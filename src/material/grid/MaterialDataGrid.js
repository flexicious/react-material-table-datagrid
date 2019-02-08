import { ReactDataGrid } from "../../flexicious"
import "../styles.css";
import MaterialAdapter from "../adapter/MaterialAdapter"
import { UIUtils, FlexDataGridColumnLevel, ClassFactory } from "../../flexicious"
import MaterialToolbar from "../adapter/toolbar/MaterialToolbar"
import MaterialMultiSelectComboBox from "./MaterialMultiSelectComboBox"
import MaterialComboBox from "./MaterialComboBox"
import MaterialDateComboBox from "./MaterialDateComboBox"
import MaterialTextInput from "./MaterialTextInput"
import MaterialNumericRangeBox from "./MaterialNumericRangeBox"



UIUtils.adapter = new MaterialAdapter();
FlexDataGridColumnLevel.static_FlexDataGridPager = new ClassFactory(MaterialToolbar);

export default class MaterialDataGrid extends ReactDataGrid {

    getClassNames() {
        return ["MaterialDataGrid", ...super.getClassNames()];
    }
    applyAttribute(target, attr, node, direct) {
        let attrName = direct ? attr : attr.name;
        let val = direct ? node : node.attributes.getNamedItem(attrName).value;

        if (attrName === "filterControl") {
            //we automatically swap this out for a material filter control
            if (val === "MultiSelectComboBox") {
                attr = "filterRenderer";
                node = new ClassFactory(MaterialMultiSelectComboBox);
            } else if (val === "ComboBox") {
                attr = "filterRenderer";
                node = new ClassFactory(MaterialComboBox);
            } else if (val === "DateComboBox") {
                attr = "filterRenderer";
                node = new ClassFactory(MaterialDateComboBox);
            } else if (val === "TextInput") {
                attr = "filterRenderer";
                node = new ClassFactory(MaterialTextInput);
            } else if (val === "NumericRangeBox") {
                attr = "filterRenderer";
                node = new ClassFactory(MaterialNumericRangeBox);
            }            
        }

        super.applyAttribute(target, attr, node, direct);
    }
}