import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'

function Sidebar() {
  const createChat = () => {
    const input = prompt(
      "Por favor digite o endereço de e-mail de quem deseja conversar."
    )

    if(!input) return null
    
    if(EmailValidator.validate(input)) {
      
    }

  }

  return (
    <Container>
      <Header>
        <UserAvatar/>

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