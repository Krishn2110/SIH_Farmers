// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Send, Mic, StopCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { role: "assistant", content: "👋 Hello! I am your farming assistant. Ask me about seeds, crops, soil, or yield." }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);

//   const navigate = useNavigate();
//   let recognition;

//   // ------------------ Setup Speech Recognition ------------------
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognition = new SpeechRecognition();
//       recognition.continuous = false;
//       recognition.lang = "en-US";

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//         sendMessage(transcript);
//       };

//       recognition.onend = () => setListening(false);
//     }
//   }, []);

//   const startListening = () => {
//     setListening(true);
//     recognition.start();
//   };
//   const stopListening = () => {
//     recognition.stop();
//     setListening(false);
//   };

//   // ------------------ Send Message ------------------
//   const sendMessage = async (messageText) => {
//     const userMsg = messageText || input;
//     if (!userMsg.trim()) return;

//     const newMessages = [...messages, { role: "user", content: userMsg }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/chat", {
//         message: userMsg,
//       });

//       const botReply = response.data.reply || "⚠ No response received";
//       setMessages([...newMessages, { role: "assistant", content: botReply }]);

//       // Speak the bot reply
//       speak(botReply);
//     } catch (error) {
//       console.error("Chat error:", error);
//       setMessages([
//         ...newMessages,
//         { role: "assistant", content: "❌ Error: Could not connect to chatbot server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------ Text-to-Speech ------------------
//   const speak = (text) => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = "en-US";
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
//       {/* Header */}
//       <div className="text-center pt-10 pb-5">
//         <h1 className="text-4xl font-bold text-green-600">Farming Chatbot</h1>
//         <p className="text-gray-600 mt-2">Ask me anything about crops, soil, and farming techniques 🌱</p>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 max-w-3xl w-full mx-auto p-6 bg-white rounded-3xl shadow-lg overflow-y-auto">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 p-3 rounded-xl max-w-lg ${
//               msg.role === "user"
//                 ? "ml-auto bg-green-500 text-white"
//                 : "mr-auto bg-gray-200 text-gray-900"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//         {loading && (
//           <div className="mr-auto bg-gray-200 text-gray-900 p-3 rounded-xl w-fit animate-pulse">
//             Thinking...
//           </div>
//         )}
//       </div>

//       {/* Input Bar */}
//       <div className="max-w-3xl w-full mx-auto flex items-center gap-3 p-4 bg-white border-t rounded-b-3xl shadow-md">
//         <input
//           type="text"
//           value={input}
//           placeholder="Type your farming question..."
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:outline-none"
//         />
//         <button
//           onClick={() => listening ? stopListening() : startListening()}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-3 rounded-xl flex items-center justify-center"
//         >
//           {listening ? <StopCircle size={18}/> : <Mic size={18}/>}
//         </button>
//         <button
//           onClick={() => sendMessage()}
//           disabled={loading}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50"
//         >
//           <Send size={18} /> Send
//         </button>
//       </div>

//       {/* Back Button */}
//       <div className="text-center mt-4">
//         <button
//           onClick={() => navigate("/")}
//           className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-full transition-all duration-300"
//         >
//           ⬅ Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Mic, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I am your farming assistant. Ask me about seeds, crops, soil, or yield.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en"); // default English
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // ------------------ Setup Speech Recognition ------------------
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

  // ------------------ Send Message ------------------
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

  // ------------------ Text-to-Speech ------------------
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        language === "en" ? "en-US" : language === "hi" ? "hi-IN" : "gu-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="text-center pt-10 pb-5">
        <h1 className="text-4xl font-bold text-green-600">Farming Chatbot</h1>
        <p className="text-gray-600 mt-2">
          Ask me anything about crops, soil, and farming techniques 🌱
        </p>

        {/* Language Selector */}
        <div className="text-center mt-3">
          <label className="mr-2 font-semibold">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-2 border-gray-300 rounded-xl px-3 py-1 focus:ring-2 focus:ring-green-300"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-6 bg-white rounded-3xl shadow-lg overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-3 rounded-xl max-w-lg ${
              msg.role === "user"
                ? "ml-auto bg-green-500 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-gray-200 text-gray-900 p-3 rounded-xl w-fit animate-pulse">
            Thinking...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="max-w-3xl w-full mx-auto flex items-center gap-3 p-4 bg-white border-t rounded-b-3xl shadow-md">
        <input
          type="text"
          value={input}
          placeholder="Type your farming question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:outline-none"
        />
        <button
          onClick={() => (listening ? stopListening() : startListening())}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-3 rounded-xl flex items-center justify-center"
        >
          {listening ? <StopCircle size={18} /> : <Mic size={18} />}
        </button>
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50"
        >
          <Send size={18} /> Send
        </button>
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-full transition-all duration-300"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default Chatbot;