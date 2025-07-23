import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Dùng Prism cho ổn định
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://103.149.170.20:8000/api/chat", {
        question: input,
      });

      setMessages([...newMessages, { sender: "bot", text: response.data.answer }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "❌ Lỗi khi kết nối API." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white w-[90%] h-[90vh] rounded-lg shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {
            messages.map((msg, idx) => (
  <div
    key={idx}
    className={`p-3 text-sm whitespace-pre-line break-words ${
      msg.sender === "user"
        ? "text-right self-end"
        : "text-left self-start"
    }`}
  >
    <div
      className={`inline-block px-3 py-2 ${
        msg.sender === "user" ? "bg-blue-100 rounded-lg" : "bg-gray-100 rounded-lg"
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-200 px-1 py-0.5" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {msg.text}
      </ReactMarkdown>
    </div>
  </div>
))
          }
          <div ref={bottomRef} />
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Nhập câu hỏi bằng tiếng Việt..."
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-r-lg hover:bg-blue-600 text-sm"
            onClick={sendMessage}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
