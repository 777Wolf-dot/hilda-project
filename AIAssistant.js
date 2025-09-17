import React, { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/AIAssistant.css";

function AIAssistant({ darkMode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState("friendly");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef(null);
  const controllerRef = useRef(null);
  const chatEndRef = useRef(null);

  // 🆔 Unique session ID (works even on older browsers)
  const [sessionId] = useState(() => {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return "session-" + Math.random().toString(36).substr(2, 9);
  });

  // 🔽 Auto-scroll when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🧠 Send message to backend AI
  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    if (controllerRef.current) controllerRef.current.abort();

    const userMsg = { sender: "user", text: input, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    controllerRef.current = new AbortController();

    try {
      const res = await fetch("https://backend-hilda.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: input, persona }),
        signal: controllerRef.current.signal,
      });

      const data = await res.json();

      const aiMsg = { sender: "ai", text: data.reply, time: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, aiMsg]);

      if (voiceEnabled && data.reply) {
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.voice = speechSynthesis.getVoices().find((v) => v.lang === "en-US");
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      if (error.name === "AbortError") console.log("⛔ Chat stopped by user");
      else console.error("AI Error:", error);
    } finally {
      setInput("");
      setLoading(false);
      controllerRef.current = null;
    }
  }, [input, persona, voiceEnabled, sessionId]);

  // 🎤 Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
      if (input.trim()) sendMessage();
    };
  }, [input, sendMessage]);

  // 🎤 Toggle mic
  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (!listening) { recognitionRef.current.start(); setListening(true); }
    else { recognitionRef.current.stop(); setListening(false); }
  };

  // 🧹 Clear chats
  const clearChats = () => {
    setMessages([]);
    setInput("");
    window.speechSynthesis.cancel();
    if (controllerRef.current) { controllerRef.current.abort(); setLoading(false); controllerRef.current = null; }
  };

  // ⛔ Stop current AI chat
  const stopChat = () => {
    window.speechSynthesis.cancel();
    if (controllerRef.current) { controllerRef.current.abort(); setLoading(false); controllerRef.current = null; }
  };

  // 🔊 Toggle voice on/off
  const handleVoiceToggle = () => {
    if (window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      else window.speechSynthesis.pause();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // ⭐ React to AI response
  const handleReaction = (index, reaction) => {
    setMessages((prev) => prev.map((msg, i) => (i === index ? { ...msg, reaction } : msg)));
  };

  return (
    <div className={`ai-assistant ${darkMode ? "dark" : "light"}`}>
      <h2 className="assistant-title">Hilda AI Assistant</h2>
      <div className="assistant-header">
        <select value={persona} onChange={(e) => setPersona(e.target.value)}>
          <option value="friendly">😊 Friendly</option>
          <option value="sarcastic">😏 Sarcastic</option>
          <option value="mentor">🧙 Mentor</option>
          <option value="mysterious">🕶 Mysterious</option>
        </select>
        <button onClick={handleVoiceToggle}>{voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"}</button>
        <button onClick={clearChats}>🧹 Clear</button>
        <button onClick={stopChat} disabled={!controllerRef.current && !window.speechSynthesis.speaking}>⛔ Stop</button>
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            <div className="msg-text">{msg.text}</div>
            <div className="msg-meta">
              <span>{msg.time}</span>
              {msg.sender === "ai" && (
                <div className="reactions">
                  <button onClick={() => handleReaction(i, "👍")}>👍</button>
                  <button onClick={() => handleReaction(i, "👎")}>👎</button>
                  {msg.reaction && <span>{msg.reaction}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="typing">🤖 is thinking...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="quick-actions">
        <button onClick={() => setInput("Tell me a joke")}>😂 Joke</button>
        <button onClick={() => setInput("Motivate me")}>💪 Motivate</button>
        <button onClick={() => setInput("Teach me something new")}>📘 Teach</button>
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk or type..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={handleVoiceInput}>{listening ? "🎙 Stop" : "🎤 Speak"}</button>
      </div>
    </div>
  );
}

export default AIAssistant;
