import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  // ...

  return (
    <>
    history.push("/");
    </>
  );
}