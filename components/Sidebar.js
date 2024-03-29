import styled from 'styled-components'
import * as EmailValidator from 'email-validator'

import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'

import Chat from './Chat'

function Sidebar() {
  const [ user ] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [ chatsSnapshot ] = useCollection(userChatRef)

  const createChat = () => {
    const input = prompt(
      "Por favor digite o endereço de e-mail de quem deseja conversar."
    )

    if(!input) return null
    
    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      db.collection('chats').add({
        users: [
          user.email, 
          input
        ]
      })
    }
  }

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) => 
        chat.data().users.find(user => user === recipientEmail)?.length > 0
    )

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Procure uma conversa'/>
      </Search>

      <SidebarButton onClick={createChat}>
        Iniciar nova conversa
      </SidebarButton>

      {chatsSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

const Container = styled.div``

const Search = styled.div`
  display: flex;
  align-items:  center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  font-size: 0.9rem;
`

const SidebarButton = styled(Button)`
  width: 100%;

  &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`

const Header = styled.div`
  position: sticky;
  top: 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px;
  height: 80px;

  border-bottom: 1px solid whitesmoke;
  background-color: #fff;
  z-index: 1;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover{
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``

export default Sidebar