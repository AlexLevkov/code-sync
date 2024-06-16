import React, { useState, useEffect } from "react";
// code-mirror
import { Controlled as CodeBlock } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
// types
import { CodeEditorProps } from "../types";
import { Editor } from "codemirror";

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  onCodeChange,
  customOptions,
  lesson,
}) => {
  const language = "javascript";
  const [localContent, setLocalContent] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (localContent && isUpdate && onCodeChange) {
      onCodeChange("content", localContent);
      setIsUpdate(false);
    }
  }, [localContent, isUpdate]);

  useEffect(() => {
    if (lesson) {
      setLocalContent(lesson.content);
    }
  }, [lesson]);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = (_1: any, _2: any, value: string) => {
    setIsUpdate(true);
    setLocalContent((pv) => value);
  };

  let options = {
    mode: language,
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: false,
    autoScroll: false,
    lint: false,
    extraKeys: {
      Enter: function (cm: Editor) {
        cm.replaceSelection("\n", "end");
      },
      Tab: function (cm: Editor) {
        cm.replaceSelection("  ", "end");
      },
    },
  };

  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  return (
    <CodeBlock
      className="code-block-wrapper"
      value={localContent}
      options={options}
      onBeforeChange={handleChange}
    />
  );
};

export default CodeEditor;
