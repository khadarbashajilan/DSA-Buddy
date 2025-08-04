
const Prompts = () => {
  return (
    <div className="flex *:cursor-pointer flex-wrap justify-center gap-2 text-center *:text-center *:bg-gray-100 *:hover:bg-gray-200 *:text-gray-800 *:font-semibold *:py-5 *:px-6 *:rounded-3xl *:text-sm *:md:text-base ">
      {" "}
      {/* Flexbox for horizontal prompts, wrap for overflow */}
      <p className="md:py-10 md:h-25  ">
        Can you give a real-life example of how Stacks work?
      </p>
      <p className="md:py-10 md:h-25 ">
        What are Arrays and how do they make coding easier?
      </p>
      <p className="md:py-10 md:h-25 ">
        Where do we actually use Queues in everyday life?
      </p>
    </div>
  );
};

export default Prompts;
