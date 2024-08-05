import "./App.css";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import EditPanel from "./components/ui/editPanel";
import inputValueTitle from "./store/storeTitleValue";
import activeState from "./store/storeActiveButton";
import loginAuth from "./store/authData";
import TitleDocument from "./components/inputs/titleDoc";
import searchState from "./store/storeSearchValue";

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //  Сохранение  содержимого  редактора
  const saveEditorContent = (data) => {
    localStorage.setItem("editorData", JSON.stringify(data));
  };
  
  //  Изменение  состояния  редактора
  const change = (newEditorState) => {
    setEditorState(newEditorState);
    const raw = convertToRaw(newEditorState.getCurrentContent());
    saveEditorContent(raw);
  };
  
  //  Изменение  стиля
  const toggleInlineStyle = () => {
    console.log(activeState.getValue())
    change(RichUtils.toggleInlineStyle(editorState, activeState.getValue()));
  };

  //  Получение  сохраненного  содержимого
  const getSavedEditorData = () => {
    const savedData = localStorage.getItem("editorData");
    return savedData ? JSON.parse(savedData) : null;
  };

  //  Горячие  клавиши
  useHotkeys("ctrl+r", () => {
    inputValueTitle.getRef().focus();
  }, {
    enabled: () => true,
    preventDefault: true,
  });

  useHotkeys("ctrl+f", () => {
    searchState.getRef().focus();
  }, {
    enabled: () => true,
    preventDefault: true,
  });

  //  Загрузка  сохраненного  содержимого  при  монтировании  компонента
  useEffect(() => {
    const savedData = getSavedEditorData();
    if (savedData) {
      setEditorState(
        EditorState.push(EditorState.createEmpty(), convertFromRaw(savedData))
      );
    }
   
    let localValue = localStorage.getItem("login");
    if (localValue) {
      loginAuth.setLogin(localValue);
    } else if (!loginAuth.getLogin) {
      let userName = "";
      do {
        userName = prompt("Введите логин");
        if (userName) {
          loginAuth.setLogin(userName);
          localStorage.setItem("login", userName);
        }
      } while (!userName);
    }
  }, []);

  if (!loginAuth.getLogin) {
    return <h1>Не авторизован</h1>;
  }

  return (
    <div className="app">
      <EditPanel />
      <div className="someText">
        <TitleDocument />
        <div
          className="MainText"
          onFocus={() => {
            const ref = inputValueTitle.getRef();
            if (inputValueTitle.getValue.length) {
              ref.focus();
            }
          }}
        >
          <Editor
            editorState={editorState}
            onChange={change}
            customStyleMap={{
              BOLD: { fontWeight: "bold" },
              UNDERLINE: { textDecoration: "underline" },
            }}
            blockStyleFn={(block) => {
              const type = block.getType();
              if (type === "unordered-list-item") {
                return "myBulletListStyle";
              }
              if (type === "ordered-list-item") {
                return "myNumberListStyle";
              }
            }}
          />
        </div>
        <button
          onClick={() => {
            toggleInlineStyle();
          }}
        >
          Style
        </button>
      </div>
    </div>
  );
};

export default App;
