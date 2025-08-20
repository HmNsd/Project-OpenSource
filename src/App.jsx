import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  //useRef hook
  const passwordReference = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-20">
        <div className="w-full max-w-2xl mx-auto lg:max-w-4xl shadow-md mt-0 rounded-lg p-2 text-emerald-50  ">
          <h1 className="text-5xl sm:text-7xl font-sans font-semibold text-center mb-4 tracking-tight  text-white ">
            Password ⚡️ Shield
          </h1>
          <p className="mb-4 text-sm font-bold sm:text-2xl  text-center text-gray-300">
            "Strong security starts with stronger passwords"{" "}
          </p>
          <div className="flex-shadow rounded-lg overflow-hidden mb-4 py-5 sm:py-5 flex gap-1">
            <input
              type="text"
              value={password}
              className="outline-none w-screen py-2 px-4 bg-white text-gray-800 rounded-lg"
              placeholder="Password"
              readOnly
              ref={passwordReference}
            />

            <button
              className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 ${
                copied
                  ? "bg-green-500"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
              onClick={copyPasswordtoClipboard}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex justify-center text-sm gap-x-2 mx-auto max-w-2xl lg:max-w-4xl">
            <div className="flex item-center gap-x-2">
              <input
                type="range"
                className="cursor-pointer"
                min={12}
                max={128}
                value={length}
                id="numRange"
                onChange={(e) => {
                  setLength(e.target.value);
                  setCopied((prev) => (prev == true ? !prev : prev));
                }}
              />
              <label htmlFor="numRange">Length:{length}</label>
            </div>
            <div className="flex item-center gap-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                  setCopied((prev) => (prev == true ? !prev : prev));
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                  setCopied((prev) => (prev == true ? !prev : prev));
                }}
              />
              <label htmlFor="charInput">Special Chars</label>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          ></div>
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          ></div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-10 sm:py-20   lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-6xl mb-8 font-semibold tracking-tight text-center text-white sm:text-8xl">
            Brew 🅽 Code
          </h2>
          <blockquote className="text-center py-5 text-xl/8 font-light text-white sm:text-2xl/9">
            <p>
              "Place where an idea turned into a product"
              </p> 
              <p>Innovate, and grow
              together — fostering a culture of learning, contribution, and
              open-source excellence
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <div className="mt-4 flex items-center justify-center space-x-2 w-full max-w-2xl mx-auto lg:max-w-8xl">
              <div className="font-bold text-xl sm:text-2xl text-white">Himanshu Nishad</div>
              <svg
                viewBox="0 0 2 2"
                width="3"
                height="3"
                aria-hidden="true"
                className="fill-white"
              >
                <circle r="1" cx="1" cy="1" />
              </svg>
              <div className="font-bold text-sm sm:text-2xl text-gray-400">Founder of "Brew 🅽 Code"</div>
            </div>
          </figcaption>
        </div>
      </section>

      <footer className="bg-black py-4 text-center text-gray-300 fixed bottom-0 left-0 w-full px-4 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} HMNSD, All rights reserved.
      </footer>
    </>
  );
}

export default App;
