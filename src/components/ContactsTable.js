import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, TableFooter, Typography, IconButton } from '@material-ui/core'
import { toTitleCase, getSorting, stableSort } from '../util'
import TableHeader from './TableHeader'
import TablePaginationActionsProps from './TablePaginationActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ChatIcon from '@material-ui/icons/Chat';
import { deleteContact } from '../actions/contactActions';
import { useDispatch, useSelector } from 'react-redux'
import ModalComponent from './ModalComponent';
import { useHistory } from 'react-router-dom'

const headCells = [
	{ id: 'fname', numeric: false, disablePadding: false, label: 'First Name' },
	{ id: 'lname', numeric: false, disablePadding: false, label: 'Last Name' },
	{ id: 'email', numeric: false, disablePadding: false, label: 'Email' },
	{ id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
	{ id: undefined, numeric: false, disablePadding: false, label: '' },
]

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		activeSortHead: {
			color: 'red !important',
		},
		link: {
			textDecoration: 'underline lightcoral',
			'&:hover': {
				cursor: 'pointer',
				color: 'lightcoral',
			},
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	})
)

function ContactsTable(props) {
	const classes = useStyles()
	const { tableData, searchText, handleEdit, handleChat } = props
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('fname')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
	const [isOpenModal, handleModal] = useState(false)
	const [actionID, handleAction] = useState('')
	const dispatch = useDispatch();
	const history = useHistory();
	const selectedContact = useSelector((state) => state.contact.selectedContact);

	const openModal = (item) => {
		handleModal(true)
		handleAction(item.id)
	}
	const closeModal = () => {
		handleModal(false)
		handleAction('')
	}

	const deleteItem = () => {
		dispatch(deleteContact(actionID));
		closeModal()
	}

	const gotoContactView = (id) => {
		history.push('/view/' + id)
	}

	const handleRequestSort = (e, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (e, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const rows = []
	tableData.forEach((eachObj) => {
		if (eachObj) {
			rows.push({
				rowItem: eachObj,
				fname: toTitleCase(eachObj.firstName.toString() || '') || '',
				lname: toTitleCase(eachObj.lastName.toString() || '') || '',
				email: eachObj.email.toString() || '',
				phone: eachObj.phone.toString() || '',
			})
		}
	})
	const sortArr = stableSort(rows, getSorting(order, orderBy))

	return (
		<>
			<ModalComponent
				isOpen={isOpenModal}
				title={'Delete Contact'}
				AcceptBtnText={'Confirm'}
				CancelBtnText='Cancel'
				actionTopBorder={false}
				titleDivider={false}
				isError={false}
				minContentHeight={null}
				dialogWidth='sm'
				CancelBtnFn={closeModal}
				AcceptBtnFn={deleteItem}
			>
				<>
					<div style={{ color: '#91929E', width: '100%', textAlign: 'center' }}>
						<div>Are you sure you want to delete selected contact?</div>
						<Typography style={{ fontSize: 14 }}>This action can not be undone.</Typography>
					</div>
				</>
			</ModalComponent>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='custom pagination table'>
					<TableHeader
						classes={classes}
						headCells={headCells}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{rows.length > 0
							? sortArr
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TableRow key={index}>
											<TableCell component='th' scope='row'>
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<div
														style={{
															height: 32,
															width: 32,
															borderRadius: '100%',
															backgroundColor: '#cacaca',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															marginRight: 12,
														}}
													>
														<Typography variant='body1' style={{ color: '#fff' }}>
															{row.rowItem.firstName.toUpperCase().charAt(0)}
														</Typography>
													</div>
													<Typography
														variant='body1'
														className={classes.link}
														onClick={() => gotoContactView(row.rowItem.id)}
													>
														{row.rowItem.firstName || ''}
													</Typography>
												</div>
											</TableCell>
											<TableCell>
												<Typography
													variant='body1'
												>
													{row.rowItem.lastName || ''}
												</Typography>
											</TableCell>
											<TableCell>{row.rowItem.email}</TableCell>
											<TableCell>{row.rowItem.phone}</TableCell>
											<TableCell style={{ textAlign: 'end' }}>
												<div>
													{selectedContact.id && <IconButton
														edge='end'
														aria-label='Help'
														aria-haspopup='true'
														style={{ color: 'grey' }}
														onClick={() => handleChat(row.rowItem)}
													>
														<ChatIcon />
													</IconButton>}
													<IconButton
														edge='end'
														aria-label='Help'
														aria-haspopup='true'
														style={{ color: 'grey' }}
														onClick={() => handleEdit(row.rowItem)}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														edge='end'
														aria-label='Help'
														aria-haspopup='true'
														style={{ color: 'grey' }}
														onClick={() => openModal(row.rowItem)}
													>
														<DeleteIcon />
													</IconButton>
												</div>
											</TableCell>
										</TableRow>
									)
								})
							: rows.length === 0 &&
							searchText.length > 0 && (
								<>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} colSpan={5}></TableCell>
									</TableRow>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} colSpan={5}></TableCell>
									</TableRow>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} colSpan={5}></TableCell>
									</TableRow>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} align='center' colSpan={5}>
											Unfortunately there are no Contacts with the search criteria you entered
                      </TableCell>
									</TableRow>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} colSpan={5}></TableCell>
									</TableRow>
									<TableRow style={{ border: 'none' }}>
										<TableCell style={{ border: 'none' }} colSpan={5}></TableCell>
									</TableRow>
								</>
							)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 20, 30]}
								colSpan={6}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true,
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActionsProps}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	)
}

export default ContactsTable
