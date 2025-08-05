import BotProvider from "./context/BotContext"
import "./index.css"
import Page from "./Page"

const App = () => {
 
  return (
    <BotProvider>
    <Page />
    </BotProvider>
  )
}

export default App
