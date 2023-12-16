import React from 'react'
import Highlight from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({codeString,handleChange,className}) => {

  const language = 'javascript';

  return (
        <Highlight 
        className={className}
        contentEditable = {className == 'student-code-content' ? true : false}
        code={codeString} 
        language={language} 
        style={tomorrow}
        onInput={(e)=>handleChange(e)}
        >
        
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div  {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
        </Highlight>
  )
}

export default CodeBlock
