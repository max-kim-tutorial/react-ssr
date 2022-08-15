import { useState, useRef, useEffect, MouseEventHandler } from 'react';
import Helmet from 'react-helmet';

function Register() {
  const [names, setNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = () => {
    if (inputRef.current !== null) {
      setNames((s) => s.concat([inputRef.current!.value]));
    }
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  }, [names]);

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h2>Register</h2>
      <div>
        <input ref={inputRef} />
        <button type="button" onClick={submit}>
          추가!
        </button>
      </div>
      <ol>
        {names.map((name, index) => (
          <li key={`${name}-${index}`}>{name}</li>
        ))}
      </ol>
    </div>
  );
}

export default Register;
