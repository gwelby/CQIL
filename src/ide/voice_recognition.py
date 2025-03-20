"""CQIL Voice Recognition"""
import speech_recognition as sr
from threading import Thread
import queue
import time

class VoiceRecognizer:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.command_queue = queue.Queue()
        self.is_listening = False
        
        # Adjust for ambient noise
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)
    
    def start_listening(self):
        """Start listening in a separate thread"""
        self.is_listening = True
        Thread(target=self._listen_loop).start()
    
    def stop_listening(self):
        """Stop listening thread"""
        self.is_listening = False
    
    def _listen_loop(self):
        """Continuous listening loop"""
        while self.is_listening:
            try:
                with self.microphone as source:
                    audio = self.recognizer.listen(source, timeout=5)
                    try:
                        text = self.recognizer.recognize_google(audio)
                        self.command_queue.put(text.upper())
                    except sr.UnknownValueError:
                        pass
                    except sr.RequestError:
                        self.command_queue.put("ERROR: Could not reach recognition service")
            except:
                time.sleep(0.1)  # Prevent tight loop if mic fails
    
    def get_command(self):
        """Get the next command from the queue"""
        try:
            return self.command_queue.get_nowait()
        except queue.Empty:
            return None
