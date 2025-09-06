import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Mic, StopCircle, X, MessageCircle } from "lucide-react";

const ChatbotWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! I'm your farming assistant. Ask me about seeds, crops, soil, or yield.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en");
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang =
        language === "en" ? "en-US" : language === "hi" ? "hi-IN" : "gu-IN";
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Send Message
  const sendMessage = async (messageText) => {
    const userMsg = messageText || input;
    if (!userMsg.trim()) return;

    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMsg,
        language: language,
      });

      const botReply = response.data.reply || "⚠ No response received";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);

      // Speak the bot reply
      speak(botReply);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "❌ Error: Could not connect to chatbot server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        language === "en" ? "en-US" : language === "hi" ? "hi-IN" : "gu-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-[#097A4E] text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} />
          <h3 className="font-semibold text-sm">Farming Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs bg-white text-gray-800 rounded px-1 py-0.5 border-none outline-none"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="gu">GU</option>
          </select>
          <button
            onClick={onClose}
            className="hover:bg-green-600 p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded-lg text-sm max-w-[85%] ${
              msg.role === "user"
                ? "ml-auto bg-[#097A4E] text-white"
                : "mr-auto bg-white text-gray-900 shadow-sm"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-white text-gray-900 p-2 rounded-lg w-fit animate-pulse shadow-sm text-sm">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white rounded-b-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            placeholder="Ask about farming..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#097A4E] focus:outline-none"
          />
          <button
            onClick={() => (listening ? stopListening() : startListening())}
            className="bg-yellow-400 hover:bg-yellow-500 text-white p-1.5 rounded flex items-center justify-center"
          >
            {listening ? <StopCircle size={14} /> : <Mic size={14} />}
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="bg-[#097A4E] hover:bg-green-600 text-white p-1.5 rounded flex items-center justify-center disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
