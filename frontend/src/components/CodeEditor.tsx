import React, { useState, useEffect, useRef } from "react";
import { Controlled as CodeBlock } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
import {
  CodeEditorProps,
  RootState,
  CurrPos,
  UserPos,
  Presence,
} from "../types";
import {
  Editor,
  EditorSelectionChange,
  TextMarker,
  EditorChange,
} from "codemirror";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store/store";
import { scriptActions } from "../app/store/slices/scripts-slice";

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  onCodeChange,
  onLineChange,
  customOptions,
  lesson,
}) => {
  const language = "javascript";

  const [localContent, setLocalContent] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [currPos, setCurrPos] = useState<CurrPos | null>(null);

  const editor = useRef<any>(null);
  const bookMarkArrRef = useRef<TextMarker[]>([]);
  const selectMarkArrRef = useRef<TextMarker[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const presenceInfo = useSelector((state: RootState) =>
    state.presences.presenceArr.find(
      (presence: Presence) => presence._id === lesson?._id
    )
  );

  useEffect(() => {
    if (localContent && isUpdate && onCodeChange) {
      onCodeChange("content", localContent);
      setIsUpdate(false);
    }
    if (localContent) {
      dispatch(scriptActions.addContent({ content: localContent }));
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

  useEffect(() => {
    if (currPos) onLineChange?.(currPos);
  }, [currPos]);

  useEffect(() => {
    if (presenceInfo?.users) {
      presenceInfo.users.forEach((user: UserPos) => {
        bookMarkArrRef.current.forEach((bm) => {
          bm.clear();
        });
        bookMarkArrRef.current = [];
        const badge = document.createElement("span");
        badge.className = "bookmark-badge";
        badge.style.backgroundColor = "darkred";
        badge.style.position = "absolute";
        badge.style.top = "-20px";
        badge.innerText = user.userName;

        if (user.currPos) {
          const line = user.currPos.end.line;
          const ch = user.currPos.end.ch;

          const bookmark = editor.current.setBookmark(
            { line: line, ch: ch },
            {
              widget: badge,
            }
          );

          if (bookmark) bookMarkArrRef.current.push(bookmark);

          if (user.currPos.start && user.currPos.end) {
            const mark = editor.current.markText(
              { line: user.currPos.start.line, ch: user.currPos.start.ch },
              { line: user.currPos.end.line, ch: user.currPos.end.ch },
              { className: "custom-selection" }
            );

            if (mark) selectMarkArrRef.current.push(mark);
          }
        }
      });
    }
    return () => {
      bookMarkArrRef.current.forEach((bm) => {
        bm.clear();
      });
      bookMarkArrRef.current = [];

      selectMarkArrRef.current.forEach((mark: TextMarker) => {
        mark.clear();
      });
      selectMarkArrRef.current = [];
    };
  }, [presenceInfo, localContent]);

  const handleChange = (_: any, changeObj: EditorChange, value: string) => {
    const ch = editor.current.doc.sel.ranges[0].head.ch + 1;
    let line = editor.current.doc.sel.ranges[0].head.line;
    if (changeObj.origin === "+input" && changeObj.text[0] === "") {
      line++;
    }

    setCurrPos({ end: { line, ch } });

    setIsUpdate(true);
    setLocalContent((pv) => value);
  };

  const handleSelection = (editor: Editor, data: EditorSelectionChange) => {
    const start = data.ranges[0].anchor;
    const end = data.ranges[0].head;

    if (data.origin) {
      editor.eachLine((lineHandle) => {
        editor.removeLineClass(lineHandle, "background", "highlighted-line");
      });
      editor.addLineClass(start.line, "background", "highlighted-line");

      setCurrPos({ start, end });
    }
  };

  let options = {
    mode: language,
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: false,
    autoScroll: true,
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
    <>
      <CodeBlock
        className="code-block-wrapper"
        value={localContent}
        options={options}
        onBeforeChange={handleChange}
        onSelection={handleSelection}
        editorDidMount={(edit) => {
          editor.current = edit;
        }}
      />
    </>
  );
};

export default CodeEditor;
