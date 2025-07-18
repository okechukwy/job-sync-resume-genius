
import { useState, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => Promise<string>;
  resetTranscript: () => void;
  error: string | null;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setError(null);
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
    };

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          console.log('Final transcript added:', transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;
      interimTranscriptRef.current = interimTranscript;
      
      // Update the displayed transcript with both final and interim
      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      console.log('Current transcript:', fullTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
    };

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Failed to start speech recognition');
    }
  }, []);

  const stopListening = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.onend = () => {
          console.log('Speech recognition stopped');
          setIsListening(false);
          
          // Wait a moment for any final results to come in
          setTimeout(() => {
            const finalResult = finalTranscriptRef.current.trim();
            console.log('Final transcript result:', finalResult);
            setTranscript(finalResult);
            resolve(finalResult);
          }, 500);
        };
        
        recognitionRef.current.stop();
      } else {
        const currentTranscript = finalTranscriptRef.current.trim();
        console.log('No active recognition, returning current transcript:', currentTranscript);
        resolve(currentTranscript);
      }
    });
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
};
