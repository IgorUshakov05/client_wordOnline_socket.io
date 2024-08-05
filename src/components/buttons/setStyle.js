import {useEffect,useState} from 'react'
import activeButton from "../../store/storeActiveButton";
import { observer } from "mobx-react-lite";

let SetStyle = observer(({ children, id }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Обновляем  isActive  при  изменении  activeButton
    setIsActive(activeButton.getValue()===id);
  }, [activeButton.getValue()]);

  return (
    <div
      onClick={() => {
        activeButton.setActiveState(id);
      }}
      className={`selectMethod ${isActive ? "active" : ""}`}
      key={id}
    >
      {children}
    </div>
  );
});

export default SetStyle;
