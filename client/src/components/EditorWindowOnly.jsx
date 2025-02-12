import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";

const languageExtensions = {
  javascript,
  python,
  java,
  cpp,
};

const EditorWindowOnly = ({ code, language, handleCodeChange }) => {
  return (
    <CodeMirror
      value={code}
      height="70vh"
      width="150vh"
      theme={vscodeDark}
      extensions={[
        languageExtensions[language]().language || javascript({ jsx: true }),
      ]}
      onChange={handleCodeChange}
    />
  );
};

export default EditorWindowOnly;
