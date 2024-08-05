import { useEffect, useRef, useState } from "react";
import inputValueTitle from "../../store/storeTitleValue";
import { observer } from "mobx-react-lite";

const TitleDocument = observer(() => {
  let titleFile = useRef(null);
  let [title,setTitle] = useState(inputValueTitle.getValue())

  useEffect(() => {
    inputValueTitle.setRef(titleFile.current);
  }, []);

  return (
    <div className="inputTitle">
      <input
        onInput={(e) => {
          inputValueTitle.setValue(e.target.value);
          setTitle(e.target.value)
          console.log('mobx - title', inputValueTitle.getValue())
        }}
        value={title}
        className="titleFileInput"
        placeholder="Название файла..."
        ref={titleFile}
      />
    </div>
  );
});

export default TitleDocument;
