import { ReactDataGridColumn, ClassFactory } from '../../flexicious';
import MaterialTristateCheckBox from "./MaterialTristateCheckBox";

export default class MaterialCheckBoxColumn extends ReactDataGridColumn {

}
MaterialCheckBoxColumn.defaultProps = {
    itemRenderer: new ClassFactory(MaterialTristateCheckBox),
    headerRenderer: new ClassFactory(MaterialTristateCheckBox),
    type: "checkbox"
};
