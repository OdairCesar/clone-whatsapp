const getRecipientEmail = (users, userLoggedId) => 
  users?.filter(userToFilter => userToFilter !== userLoggedId?.email)[0]

export default getRecipientEmail