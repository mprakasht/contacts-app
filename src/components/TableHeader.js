import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		activeSortHead: {
			color: 'red !important',
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

function EnhancedTableHead(props) {
	const classes = useStyles();
	const { order, orderBy, onRequestSort, headCells } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell,index) => (
					<TableCell key={index} sortDirection={orderBy === headCell.id ? order : false}>
						{headCell.id && (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
								classes={{ active: classes.activeSortHead, icon: classes.activeSortHead }}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<span className={classes.visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</span>
								) : null}
							</TableSortLabel>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default EnhancedTableHead
