import { useCallback, useRef, useState } from "react";

/**
 * Wraps the browser's SpeechRecognition API. Returns `supported: false`
 * gracefully in browsers without it, so callers can disable the mic
 * button rather than crash — item 10 of the spec ("gracefully fall back
 * to browser input rather than breaking the interface").
 */
export function useSpeechRecognition(language) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const SpeechRecognitionImpl =
    typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const supported = Boolean(SpeechRecognitionImpl);

  const start = useCallback(
    (onResult) => {
      if (!supported) return;
      const recognition = new SpeechRecognitionImpl();
      recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);

      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    },
    [language, supported, SpeechRecognitionImpl]
  );

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return { supported, listening, start, stop };
}
