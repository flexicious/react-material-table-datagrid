import { ReactDataGrid } from "../../flexicious"
import "../styles.css";

export default class MaterialDataGrid extends ReactDataGrid {
    getClassNames() {
        return ["MaterialDataGrid", ...super.getClassNames()];
    }
}