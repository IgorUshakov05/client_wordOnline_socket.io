import { useEffect, useRef } from "react";
import inputValueTitle from "../../store/storeTitleValue";
import { observer } from "mobx-react-lite";

const TitleDocument = observer(() => {
    let titleFile = useRef(null);

    useEffect(() => {
        inputValueTitle.setRef(titleFile.current);
    }, []);

    return (
        <div className="inputTitle">
            <input
                onInput={(e) => inputValueTitle.setValue(e.target.value)}
                className="titleFileInput"
                placeholder="Название файла..."
                ref={titleFile}
            />
        </div>
    );
});

export default TitleDocument;
