import { TriStateCheckBox } from "../../../flexicious"

export default class MaterialTriStateCheckBox extends TriStateCheckBox {

    
    getClassNames() {
        return ["MaterialTriStateCheckBox", ...super.getClassNames()];
    }
}