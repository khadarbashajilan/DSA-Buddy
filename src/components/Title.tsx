import { useBotContext } from "../context/BotContext"

const Title = () => {
  const {title} = useBotContext()
  return (
    <center className="flex flex-col justify-center text-center h-full items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              {title}
            </h1>
    </center>
  )
}

export default Title
