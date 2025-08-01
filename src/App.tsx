import "./index.css"
import { MessageSquareCode } from 'lucide-react'



const App = () => {


 
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <span className="text-blue-500"> This is a TypeScript Chatbot.</span>
      <span className="text-red-500"> Enjoy coding!</span>
      <MessageSquareCode />
    </h1>
  )
}

export default App
