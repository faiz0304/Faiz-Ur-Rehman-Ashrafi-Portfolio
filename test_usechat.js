const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { useChat } = require('@ai-sdk/react');

function TestComponent() {
  const chat = useChat();
  console.log("Chat keys:", Object.keys(chat));
  console.log("input is string?", typeof chat.input === 'string');
  console.log("handleInputChange is function?", typeof chat.handleInputChange === 'function');
  return React.createElement('div');
}

console.log(renderToStaticMarkup(React.createElement(TestComponent)));
