import EditStyle from "./setStyle";
import InputSearch from '../inputs/serachInput'
function EditPanel() {
    return ( 
        <div className="editPanel">
         <EditStyle />
          <div className="line"></div>
          <InputSearch />
        </div>
     );
}

export default EditPanel;