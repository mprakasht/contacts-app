import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import ContactsTable from './ContactsTable'
import ContactForm from './ContactForm'
import ChatWindow from './ChatWindow'
import { createContact, updateContact, startConversation, endConversation } from '../actions/contactActions';

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      padding: '0px 12px',
      height: '37px',
      width: '255px',
      disableUnderline: 'true',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      color: theme.palette.text.primary,
      fontSize: '14px',
      fontFamily: 'Nunito Sans',
      borderRadius: '4px',
      border: '1px solid #D2D5E0',
      boxSizing: 'border-box',
    },
    input: {
      color: '#454553',
      fontSize: '14px',
      fontFamily: 'Nunito Sans',
    },
    icon: {
      height: 15,
      width: 15,
      color: '#454553',
    },
    noItemImage: {
      width: '120px',
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee',
      borderRadius: '100%',
    },
    noItemIcon: {
      height: 50,
      width: 50,
      color: '#454553',
    },
    noItemMsg: {
      color: theme.palette.text.primary,
      marginTop: 32,
      height: 30,
    },
  })
)

const ContactsPage = () => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [isOpenForm, handleModalForm] = useState(false)
  const [isEdit, handleFormType] = useState(false)
  const [actionItem, handleActionItem] = useState({})
  const dispatch = useDispatch();
  const [isOpenChat, handleModalChat] = useState(false)

  const modalChatClose = () => {
    dispatch(endConversation());
    handleModalChat(false);
  }
  const modalFormSuccess = (item) => {
    if (isEdit)
      dispatch(updateContact(item));
    else
      dispatch(createContact(item));
    closeModal()
  }
  const modalFormFailure = () => {
    closeModal()
  }
  const handleType = (flag) => {
    handleFormType(flag)
  }
  const openModal = () => {
    handleModalForm(true)
  }
  const closeModal = () => {
    handleModalForm(false)
    handleType(false)
    handleActionItem({})
  }
  const editContactInfo = (item) => {
    openModal()
    handleType(true)
    handleActionItem(item)
  }
  const chatWithContact = (item) => {
    dispatch(startConversation(item));
    handleModalChat(true);
  }

  const selectedContact = useSelector((state) => state.contact.selectedContact)
  const list = useSelector((state) => state.contact.contactsList);
  const copyList = [...list];
  const contactsList = copyList.filter(x => x.id !== selectedContact.id)

  const handleOnChangeSearch = (txt) => {
    setSearchText(txt)
  }

  let contactsData = [];
  if (searchText.trim() === '') {
    contactsData = contactsList
  } else {
    contactsData = contactsList.filter(
      (item) =>
        item.firstName.toString().toLowerCase().trim().includes(searchText.toLowerCase()) ||
        item.lastName.toString().toLowerCase().trim().includes(searchText.toLowerCase()) ||
        item.email.toString().toLowerCase().trim().includes(searchText.toLowerCase()) ||
        item.phone.toString().toLowerCase().trim().includes(searchText.toLowerCase())
    )
  }

  return (
    <>
      <ContactForm
        isOpen={isOpenForm}
        isEdit={isEdit}
        item={actionItem}
        CancelBtnFn={modalFormFailure}
        AcceptBtnFn={modalFormSuccess}
      />
      <ChatWindow
        isOpen={isOpenChat}
        title="Chat"
        CancelBtnFn={modalChatClose}
      />
      {contactsData.length > 0 || searchText.length > 0 ? (
        <>
          <div style={{ height: 37 }}>
            <div style={{ float: 'left', height: '100%' }}>
              <div>
                <TextField
                  className={classes.textField}
                  placeholder='Search Contact'
                  value={searchText}
                  onChange={(e) => handleOnChangeSearch(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.input,
                    endAdornment: (
                      <div style={{ cursor: 'pointer', marginLeft: 8 }}>
                        {searchText.length > 0 ? (
                          <span onClick={() => handleOnChangeSearch('')}>
                            <CloseIcon className={classes.icon} />
                          </span>
                        ) : (
                            <SearchIcon className={classes.icon} />
                          )}
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
            <div style={{ float: 'right', display: 'flex' }}>
              <Button
                size='small'
                variant='contained'
                style={{ backgroundColor: '#1f2935', color: '#fff' }}
                onClick={openModal}
              >
                Create Contact
              </Button>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <ContactsTable
              tableData={contactsData}
              searchText={searchText}
              handleEdit={editContactInfo}
              handleChat={chatWithContact}
            />
          </div>
        </>
      ) : (
          <>
            <div style={{ textAlign: 'center', marginTop: 120 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={classes.noItemImage}>
                  <SearchIcon className={classes.noItemIcon} />
                </div>
              </div>
              <Typography className={classes.noItemMsg}>There are no contacts created yet.</Typography>
              <div style={{ marginTop: 32 }}>
                <Button
                  size='small'
                  variant='contained'
                  style={{ backgroundColor: '#1f2935', color: '#fff' }}
                  onClick={openModal}
                >
                  Create Contact
              </Button>
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default ContactsPage
