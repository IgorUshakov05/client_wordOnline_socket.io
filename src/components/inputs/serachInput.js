import { useState,useRef,useEffect } from "react";
import searchInput from "../../store/storeSearchValue";
import { observer } from "mobx-react-lite";

const InputSearch = observer(() => {
  let [valueSearch, setValue] = useState("");
  let titleFile = useRef(null);

  useEffect(() => {
    searchInput.setRef(titleFile.current);
  }, []);


  function handleInput(e) {
    setValue(e.target.value);
    searchInput.setValue(e.target.value);
    console.log('mobx: ',searchInput.getValue);
  }

  return (
    <div className="searchLine">
      <input
        value={valueSearch} // без скобок, потому что это геттер
        onInput={handleInput}
        placeholder="Поиск по тексту"
        ref={titleFile}
        className="findText"
        type="text"
      />
    </div>
  );
});

export default InputSearch;
