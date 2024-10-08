import { TextGenerateEffect } from "./UI/TextGenerateEffect";

const Welcome = () => {
//   const [isTextComplete, setIsTextComplete] = useState(false);
  const words = "Welcome to VoiceCompanion! How can I help you today?";
  const Greeting = "  Hi there! Let's make your experience amazing!"

  // List of prompt messages
//   const prompts = [
//     "What is the weather today?",
//     "Play some music.",
//     "Set a reminder for 2 PM.",
//     "Tell me a joke.",
//   ];

  // Function to handle prompt click
  const handlePromptClick = (prompt: string) => {
    console.log(`Prompt clicked: ${prompt}`); // Replace with actual message handling
    // You can add code here to send the prompt to a chat input field or perform any desired action.
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {/* Animated Welcome Text */}
      <div className="flex justify-center items-end text-9xl">
        <TextGenerateEffect
          words={words}
          duration={2}
          className="text-9xl"
          filter={false}
        />
      </div>

      {/* Gradient Greeting Message */}

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg text-center text-2xl">
      <TextGenerateEffect
          words={Greeting}
          duration={2}
          className="text-9xl"
          filter={false}
        />
      </div>

      {/* Prompt Buttons */}

      {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
          {prompts.map((prompt, index) => (
            <CustomButton
              key={index}
              label={prompt}
              onClick={() => handlePromptClick(prompt)}
              className="bg-transprant text-Netral-100 px-6 py-2 rounded-lg"
            />
          ))}
        </div> */}
    </div>
  );
};

export default Welcome;
