import activeButton from "../../store/storeActiveButton";
import { observer } from "mobx-react-lite";

let SetStyle = observer(({ children, id }) => {
  return (
    <div
      onClick={() => {
        activeButton.setActiveState(id);
      }}
      className={
        activeButton.getValue === id ? "selectMethod active" : "selectMethod"
      }
      key={id}
    >
      {children}
    </div>
  );
})

export default SetStyle;
