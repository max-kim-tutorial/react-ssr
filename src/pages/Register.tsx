import { useState, useRef, useEffect } from 'react';
import Helmet from 'react-helmet';

function Register() {
  const [names, setNames] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e) => {
    if (inputRef.current) {
      setNames((s) => s.concat([inputRef.current.value]));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
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
          추가
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
