import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch } from 'react-redux'
import { createConversation } from '../actions/contactActions';
import moment from 'moment'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			position: 'fixed',
			bottom: 12,
			right: 12,
			height: 400,
			width: 300,
			zIndex: 1,
			boxShadow:
				'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
			borderRadius: 5,
		},
		titleSection: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '2px 12px',
			backgroundColor: '#f4f4f4',
			boxShadow:
				'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
		},
		messageSection: {
			padding: 10,
			height: '75%',
			backgroundColor: '#ffff',
			overflow: 'auto'
		},
		leftAlign: {
			backgroundColor: '#e0e0e0',
			padding: 5,
			paddingRight: 10,
			paddingLeft: 10,
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 8
		},
		rightAlign: {
			backgroundColor: '#ffdde2',
			padding: 5,
			paddingRight: 10,
			paddingLeft: 10,
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			borderBottomLeftRadius: 8
		},
		textSection: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '2px 12px',
			boxShadow:
				'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
			backgroundColor: '#fff',
		},
	})
)

const ChatWindow = (props) => {
	const classes = useStyles()
	const { isOpen, CancelBtnFn } = props;
	const messagesEndRef = React.useRef(null);
	const [message, setMessage] = useState('');
	const chatWith = useSelector((state) => state.contact.chatWith);
	const selectedContact = useSelector((state) => state.contact.selectedContact);
	const allConversations = useSelector((state) => state.contact.allConversations);
	let list=[...allConversations];
	let current_conversation = list.filter(x => ((x.from.id === selectedContact.id && x.to.id === chatWith.id) || (x.from.id === chatWith.id && x.to.id === selectedContact.id)));
	const dispatch = useDispatch();
	const handleChange = (val) => {
		setMessage(val);
	}
	const scrollToBottom = () => {
		if (messagesEndRef.current)
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	}
	const sendMessage = () => {
		let obj = {
			id: new Date().valueOf(),
			from: {...selectedContact},
			to: {...chatWith},
			message: message,
			createdDate: moment().format()
		}
		dispatch(createConversation(obj));
		setMessage('');
	}
	useEffect(scrollToBottom, [allConversations]);

	return (
		<>
			{isOpen && <div className={classes.root}>
				<div className={classes.titleSection}>
					<Typography>To : {chatWith.firstName + ' ' + chatWith.lastName}</Typography>
					<IconButton
						edge="end"
						aria-label="Help"
						aria-haspopup="true"
						color="inherit"
						onClick={CancelBtnFn}
					>
						<CloseIcon />
					</IconButton>
				</div>
				<div style={{ height: "100%" }}>
					<div className={classes.messageSection}>
						{current_conversation.map((conversation, index) => (
							<div key={index} style={{ textAlign: conversation.from.id === selectedContact.id ? 'end' : 'left', marginBottom: 15 }}>
								<div >
									<span className={conversation.from.id === selectedContact.id ? classes.rightAlign : classes.leftAlign}>{conversation.message}</span>
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
					<div className={classes.textSection}>
						<TextField
							margin='dense'
							id='message'
							placeholder='Write messsaage here'
							type='text'
							fullWidth
							error={false}
							value={message || ''}
							onChange={(e) => handleChange(e.target.value)}
							InputProps={{ disableUnderline: true }}
						/>
						<IconButton
							edge="end"
							aria-label="Help"
							aria-haspopup="true"
							color="inherit"
							disabled={message.trim().length > 0 ? false : true}
							onClick={sendMessage}
						>
							<SendIcon />
						</IconButton>
					</div>
				</div>
			</div >}
		</>
	)
}

export default ChatWindow
