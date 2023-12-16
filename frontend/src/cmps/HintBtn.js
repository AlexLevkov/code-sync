import React, { useState } from 'react';
import { Button, Collapse } from 'reactstrap';
import CodeBlock from './CodeBlock.js';


const HintBtn = ({codeSolution}) => {
  const [isOpen, setIsOpen] = useState(false);
  const style = {margin:'15px'}

  return (
  <div>
    <Button style={style}  onClick={() => setIsOpen(!isOpen)}>Hint ↓</Button>
    <Collapse isOpen={isOpen}>
      <CodeBlock codeString={codeSolution} className={'hint-code-content'}/>
    </Collapse>
  </div>
  );
}

export default HintBtn;