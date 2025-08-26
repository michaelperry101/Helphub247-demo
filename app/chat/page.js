const handleSend = async () => {
  const text = input.trim();
  if (!text && attachments.length === 0) return;

  // Show user message
  const userMsg = {
    id: crypto.randomUUID(),
    role: "user",
    content: text || "(attachment)",
    attachments,
    ts: Date.now(),
  };
  setMessages((m) => [...m, userMsg]);
  setInput("");
  setAttachments([]);
  if (textRef.current) {
    textRef.current.style.height = "46px";
    textRef.current.focus();
  }

  // Placeholder AI bubble while we wait
  const placeholderId = crypto.randomUUID();
  setMessages((m) => [...m, { id: placeholderId, role: "ai", content: "Carys is thinking…" }]);

  // Call your API
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // keep a compact history for context
        history: messages.slice(-8).map(({ role, content }) => ({ role, content })),
        input: text,
        attachments: attachments.map(a => ({ name: a.name, type: a.type })),
      }),
    });

    const data = await res.json();
    const reply = data?.reply || "Sorry, I couldn’t generate a response.";

    // Replace placeholder with real reply
    setMessages((prev) =>
      prev.map((m) => (m.id === placeholderId ? { ...m, content: reply } : m))
    );
  } catch (err) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === placeholderId
          ? { ...m, content: "Sorry — I had trouble reaching the assistant. Please try again." }
          : m
      )
    );
  }
};
