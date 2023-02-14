
export default function HostLeft ({ setGameScreen }) {
  
  const handleReturn = () => {
    setGameScreen('lobby');
  }

  return (
    <>
      <p>The game host has closed their room. :( Click below to return to the lobby!</p>
      <button className="btn btn-primary m-1" onClick={handleReturn}>Return to Lobby</button>  
    </>
  );
}