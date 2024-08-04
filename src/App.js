import "./App.css";
import { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import EditPanel from "./components/ui/editPanel";
import inputValueTitle from "./store/storeTitleValue";
import loginAuth from "./store/authData";
import { observer } from "mobx-react-lite";
import TitleDocument from "./components/inputs/titleDoc";
import typemethod from "./store/storeActiveButton";

const App = observer(() => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
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

  const toggleLink = () => {
    const selection = editorState.getSelection();
    const linkURL = prompt("Введите URL ссылки:");
    if (!linkURL) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: linkURL }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const toggleInlineStyle = () => {
    const style = typemethod.getValue; // Получаем текущее значение стиля
    console.log(style)
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

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
            if (!inputValueTitle.getValue() && ref) {
              ref.focus();
            }
          }}
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
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
      </div>
      {/* Пример кнопки для применения стиля */}
      <button onClick={toggleInlineStyle}>Toggle Style</button>
    </div>
  );
});

export default App;
