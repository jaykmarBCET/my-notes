"use client";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";

export default function MultiLangEditor({ code, setCode }: { code: string; setCode: React.Dispatch<React.SetStateAction<string>> }) {

  const [language, setLanguage] = useState("javascript");

  const languageExtensions: Record<string,any> = {
    javascript: javascript(),
    python: python(),
    cpp: cpp(),
    java: java(),
    sql: sql(),
  };

  return (
    <div className="p-4 h-screen">
      <h2 className="text-lg font-bold mb-2">Multi-Language Code Editor</h2>

      <select
        className="p-2 mb-3 border rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="sql">SQL</option>
      </select>

      <div className="border rounded overflow-hidden">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[languageExtensions[language]]}
          theme={dracula}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
}
