import { useState } from "react";
import inputValue from "../../store/storeSearchValue";

const InputSearch = () => {
  let [valueSearch, setValue] = useState("");
  function handleInput(e) {
    setValue(e.target.value);
    inputValue.setValue(e.target.value);
    console.log(inputValue.getValue);
  }

  return (
    <div className="searchLine">
      <input
        value={valueSearch} // без скобок, потому что это геттер
        onInput={handleInput}
        placeholder="Поиск по тексту"
        className="findText"
        type="text"
      />
    </div>
  );
};

export default InputSearch;
