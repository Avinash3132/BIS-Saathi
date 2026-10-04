import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mic, MicOff, FileText, Sparkles, Send, Bot, User } from "lucide-react";
import { DemoBadge, Spinner } from "../components/UiKit.jsx";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.js";
import { askStaticAssistant, explainStaticSimply } from "../services/staticDemoService.js";
import { EXAMPLE_QUESTIONS } from "../i18n/strings.js";

export default function Assistant({ t, lang }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);
  const scrollRef = useRef(null);
  const sentPrefillRef = useRef(false);
  const inputRef = useRef(null);

  const speech = useSpeechRecognition(lang);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    const prefill = location.state?.prefill;
    if (prefill && !sentPrefillRef.current) {
      sentPrefillRef.current = true;
      send(prefill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q) return;

    setMessages((m) => [...m, { id: Date.now(), role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setErrorNotice(null);

    try {
      const result = await askStaticAssistant(q, lang);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "assistant",
          question: q,
          text: result.answer,
          isNumber: result.isNumber,
          sources: result.sources,
          grounded: result.grounded,
          showSimple: false,
          simpleExplanation: result.simpleExplanation,
          relevantTo: result.relevantTo,
        },
      ]);
    } catch (err) {
      console.error(err);
      setErrorNotice(t.serviceError);
    } finally {
      setThinking(false);
    }
  }

  async function handleExplainSimply(messageId) {
    setMessages((ms) =>
      ms.map((m) => (m.id === messageId ? { ...m, showSimple: !m.showSimple, explainLoading: !m.showSimple } : m))
    );
    const target = messages.find((m) => m.id === messageId);
    if (!target || target.simpleExplanation) {
      setMessages((ms) => ms.map((m) => (m.id === messageId ? { ...m, explainLoading: false } : m)));
      return;
    }
    try {
      const result = await explainStaticSimply(target.question, lang, target.isNumber);
      setMessages((ms) =>
        ms.map((m) =>
          m.id === messageId ? { ...m, simpleExplanation: result.simpleExplanation, explainLoading: false } : m
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((ms) => ms.map((m) => (m.id === messageId ? { ...m, explainLoading: false } : m)));
    }
  }

  function toggleMic() {
    if (speech.listening) { speech.stop(); return; }
    speech.start((transcript) => setInput(transcript));
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-5" style={{ minHeight: "calc(100vh - 130px)" }}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-5 w-5 text-blue-900" />
          <h1 className="font-serif text-2xl font-semibold text-slate-900">{t.assistantTitle}</h1>
        </div>
        <p className="text-sm text-slate-500">{t.assistantSub}</p>
        <div className="mt-3">
          <DemoBadge text={t.demoBadge} />
        </div>
      </div>

      {/* Chat area */}
      <div className="mt-2 flex-1 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            {/* Welcome */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900">BIS-Saathi AI Assistant</p>
                  <p className="text-xs text-blue-600">Grounded responses from the demo knowledge base</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Ask me about Indian Standards (IS numbers), BIS certification requirements, quality marks, or product safety. I'll provide grounded answers with source citations.
              </p>
            </div>

            {/* Example questions */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Try these questions</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {EXAMPLE_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q[lang])}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 group-hover:text-blue-600" />
                    {q[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="flex items-end gap-2 max-w-[82%]">
                <div className="rounded-2xl rounded-tr-sm bg-blue-900 px-4 py-3 text-sm text-white shadow-sm">
                  {m.text}
                </div>
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                  <User className="h-3.5 w-3.5 text-slate-600" />
                </div>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex items-start gap-2 max-w-[90%]">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-900 mt-1">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="flex-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                <p className="text-sm leading-relaxed text-slate-800">{m.text}</p>

                {m.grounded && (
                  <div className="mt-3 space-y-2.5 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.applicableStandard}:</span>
                      <span className="font-serif text-sm font-bold text-blue-900">{m.isNumber}</span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">{t.sources}</p>
                      {(m.sources || []).map((s, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 mb-1">
                          <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                          <div>
                            <div className="font-semibold text-slate-700">{s.document}</div>
                            <div className="text-slate-500">Page {s.page} · {s.clause}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleExplainSimply(m.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline underline-offset-2 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {m.showSimple ? t.technicalExplanation : t.explainSimply}
                    </button>

                    {m.showSimple && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs text-slate-700 space-y-2">
                        {m.explainLoading ? (
                          <div className="flex items-center gap-2 text-slate-500">
                            <Spinner className="h-3.5 w-3.5" /> {t.thinking}
                          </div>
                        ) : (
                          <>
                            <div><span className="font-semibold text-blue-900">{t.simpleExplanation}: </span>{m.simpleExplanation}</div>
                            {m.relevantTo && (
                              <div><span className="font-semibold text-blue-900">{t.relevantTo}: </span>{m.relevantTo}</div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-900">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5">
              <Spinner className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-sm text-slate-500">{t.thinking}</span>
            </div>
          </div>
        )}

        {errorNotice && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorNotice}</div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 mt-4 glass rounded-2xl border border-slate-200 p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMic}
            disabled={!speech.supported}
            title={speech.supported ? "" : t.micUnsupported}
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-all ${
              speech.listening ? "bg-red-100 text-red-600 ring-2 ring-red-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            } ${!speech.supported ? "opacity-40" : ""}`}
          >
            {speech.listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={speech.listening ? t.listening : t.placeholder}
            className="flex-1 border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || thinking}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        {!speech.supported && (
          <p className="mt-1 px-2 text-xs text-slate-400">{t.micUnsupported}</p>
        )}
      </div>
    </div>
  );
}
