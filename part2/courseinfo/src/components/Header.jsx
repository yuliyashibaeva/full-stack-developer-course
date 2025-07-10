const Header = ({ content, isPrimary = false }) => {
  return (
    <div> 
      {isPrimary 
      ? (<h1>{content}</h1>) 
      : (<h2>{content}</h2>)
      }
    </div>
  );
};

export default Header;