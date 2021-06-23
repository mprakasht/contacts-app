import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import ModalComponent from './ModalComponent'
import { isEmailValid, isNumeric, isMobileNumber, isOnlyLetters } from '../util';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
		},
	})
)

function ContactForm(props) {
	const classes = useStyles()
	const { isOpen, isEdit, item, CancelBtnFn, AcceptBtnFn } = props
	const [firstName, setFirstName] = useState('')
	const [isErrorFirstName, setErrorFirstName] = useState(false)
	const [lastName, setLastName] = useState('')
	const [isErrorLastName, setErrorLastName] = useState(false)
	const [email, setEmail] = useState('')
	const [isErrorEmail, setErrorEmail] = useState(false)
	const [phone, setPhone] = useState('')
	const [isErrorPhone, setErrorPhone] = useState(false)

	useEffect(() => {
		setFirstName(item.firstName || '');
		setLastName(item.lastName || '');
		setEmail(item.email || '');
		setPhone(item.phone || '');
		setErrorFirstName(false);
		setErrorLastName(false);
		setErrorEmail(false);
		setErrorPhone(false);
	}, [item])

	const closeModal = () => {
		CancelBtnFn()
		clearForm()
	}
	const clearForm = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setErrorFirstName(false);
		setErrorLastName(false);
		setErrorEmail(false);
		setErrorPhone(false);
	}
	const onSuccess = () => {
		const err = handleValidation()
		if (!err) {
			let obj = {
				id: isEdit ? item.id : new Date().valueOf(),
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
			}
			AcceptBtnFn(obj);
			clearForm()
		}
	}
	const handleChange = (val, field) => {
		switch (field) {
			case 'fname': if (isOnlyLetters(val)) { setFirstName(val); setErrorFirstName(false); } break;
			case 'lname': if (isOnlyLetters(val)) { setLastName(val); setErrorLastName(false); } break;
			case 'email': setEmail(val); setErrorEmail(false); break;
			case 'phone': if (isNumeric(val)) { setPhone(val); setErrorPhone(false); } break;
			default: break;
		}
	}

	const handleValidation = () => {
		let isError = false
		if (firstName.trim().length === 0) {
			isError = true
			setErrorFirstName(true)
		}
		if (lastName.trim().length === 0) {
			isError = true
			setErrorLastName(true)
		}
		if (email.trim().length === 0) {
			isError = true
			setErrorEmail(true)
		}
		else if (email.trim().length > 0 && !isEmailValid(email)) {
			isError = true
			setErrorEmail(true)
		}
		if (phone.trim().length === 0) {
			isError = true
			setErrorPhone(true)
		}
		else if (phone.trim().length > 0 && !isMobileNumber(phone)) {
			isError = true
			setErrorPhone(true)
		}
		return isError
	}

	return (
		<>
			<ModalComponent
				isOpen={isOpen}
				title={isEdit ? 'Update Master Item' : 'Add Master Item'}
				AcceptBtnText={isEdit ? 'Update' : 'Save'}
				CancelBtnText='Cancel'
				actionTopBorder={false}
				titleDivider={true}
				isError={false}
				minContentHeight={null}
				dialogWidth='sm'
				CancelBtnFn={closeModal}
				AcceptBtnFn={onSuccess}
			>
				<>
					<div className={classes.root}>
						<TextField
							margin='dense'
							id='firstName'
							label='First Name'
							type='text'
							fullWidth
							error={isErrorFirstName}
							helperText={isErrorFirstName ? 'Please enter First Name' : null}
							value={firstName || ''}
							onChange={(e) => handleChange(e.target.value, 'fname')}
						/>
						<TextField
							margin='dense'
							id='lastName'
							label='Last Name'
							type='text'
							fullWidth
							error={isErrorLastName}
							helperText={isErrorLastName ? 'Please enter Last Name' : null}
							value={lastName || ''}
							onChange={(e) => handleChange(e.target.value, 'lname')}
						/>
						<TextField
							margin='dense'
							id='email'
							label='Email'
							type='text'
							fullWidth
							error={isErrorEmail}
							helperText={isErrorEmail ? 'Invalid Email address' : null}
							value={email || ''}
							onChange={(e) => handleChange(e.target.value, 'email')}
						/>
						<TextField
							margin='dense'
							id='phone'
							label='Phone'
							type='text'
							fullWidth
							error={isErrorPhone}
							helperText={isErrorPhone ? 'Invalid Phone Number' : null}
							value={phone || ''}
							onChange={(e) => handleChange(e.target.value, 'phone')}
						/>
					</div>
				</>
			</ModalComponent>
		</>
	)
}

export default ContactForm
