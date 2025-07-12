const Filter = ({ newFilterValue, setNewFilterValue }) => {
  return (
    <div>
      filter shown with 
      <input 
        value={newFilterValue}
        onChange={setNewFilterValue}
      />
    </div>
  )
}

export default Filter;