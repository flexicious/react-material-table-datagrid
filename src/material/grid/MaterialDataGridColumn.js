import { ReactDataGridColumn } from "../../flexicious"

export default class MaterialDataGridColumn extends ReactDataGridColumn {


    getClassNames() {
        return ["MaterialDataGridColumn", ...super.getClassNames()];
    }
}