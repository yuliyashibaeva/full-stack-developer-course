const Notification = ({ message, error = false }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={['notification', error === true ? 'error' : 'success'].join(' ')}>
      {message}
    </div>
  )
}

export default Notification;