import { useEffect, useRef, useState } from "react";
import recording from "../Assets/recording.svg";
import voice_btn from "../Assets/Voice Button.svg";


// Export the MicrophoneComponent function component
export default function MicrophoneInput( { setTranscript }: { setTranscript: (transcript: string) => void } ) {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isMicClicked, setIsMicClickedLocally] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      setTranscript(transcript);
    };

    // Start the speech recognition
    recognitionRef.current.start();
    const timeoutId = setTimeout(() => {
      //   go to stop recording
      setIsRecording(!isRecording);
      if (isRecording) {
        stopRecording();
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  
  // Function to stop recording
  const stopRecording = () => {
    // Stop the speech recognition and mark recording as complete
    recognitionRef.current.stop();
    setRecordingComplete(true);
    console.log("stop recording");
    // Event handler for speech recognition results when recording is complete and timeout
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      
      // Log the recognition results and update the transcript state
      console.log(transcript);
      setTranscript(transcript);
      setIsMicClickedLocally(false)
      // speak(transcript);
      if(isMicClicked){
        // setTranscript(transcript);
      }
      if(recordingComplete){
        setIsRecording(false);
      }
      
      // if recoring is completed then hide the microphone conmponet
      
    };
  };
  
  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };
  
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="">
    
      {isRecording ? (
        <button
        onClick={handleToggleRecording}
        className="flex flex-col items-center align-center justify-center"
        >
          <h2 className="text-center ">Listening...</h2>
          <img
            className="animate-pulse "
            src={recording}
            alt="microphone"
            width={100}
            height={70}
            />
        </button>
      ) : (
        <button
        onClick={handleToggleRecording}
        className="rounded-full flex align-center justify-center"
        >
          <img
            className=""
            src={voice_btn}
            alt="microphone"
            width={100}
            height={100}
          />
        </button>
      )}
      
    </div>
  );
}
