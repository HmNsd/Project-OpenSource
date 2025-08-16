import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  //useRef hook
  const passwordReference = useRef(null)

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

const copyPasswordtoClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
  setCopied(true);
},[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-emerald-50 bg-gray-800">
        <h1 className="text-2xl font-mono font-semibold text-center text-stone-50 mb-2">
          Password Generator
        </h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4 flex gap-1">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-white text-gray-800 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordReference}
          />

          <button className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 ${copied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700 active:scale-95"}`}onClick={copyPasswordtoClipboard}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={12}
              max={128}
              value={length}
              id="numRange"
              onChange={(e) => {
                setLength(e.target.value);
                setCopied(((prev) => prev== true ? !prev : prev))
              }}
            />
            <label htmlFor="numRange">Length:{length}</label>
          </div>
          <div className="flex item-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                setCopied(((prev) => prev== true ? !prev : prev))
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
                setCopied(((prev) => prev== true ? !prev : prev))
              }}
            />
            <label htmlFor="charInput">Special Chars</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

