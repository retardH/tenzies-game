const Die = ({ number, isHeld, holdDice }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={holdDice}>
      {number}
    </div>
  );
};

export default Die;
