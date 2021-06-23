import { SELECT_CONTACT, ADD, EDIT, DELETE, START_CONVERSATION, END_CONVERSATION, CREATE_CONVERSATION } from './types';

export function createContact(data) {
	return function (dispatch) {
		dispatch({ type: ADD, payload: data })
	}
}

export function updateContact(data) {
	return function (dispatch) {
		dispatch({ type: EDIT, payload: data })
	}
}

export function deleteContact(id) {
	return function (dispatch) {
		dispatch({ type: DELETE, payload: id })
	}
}

export function selectContact(item) {
	return function (dispatch) {
		dispatch({ type: SELECT_CONTACT, payload: item })
	}
}

export function startConversation(item) {
	return function (dispatch) {
		dispatch({ type: START_CONVERSATION, payload: item })
	}
}

export function endConversation() {
	return function (dispatch) {
		dispatch({ type: END_CONVERSATION, payload: {} })
	}
}

export function createConversation(item) {
	return function (dispatch) {
		dispatch({ type: CREATE_CONVERSATION, payload: item })
	}
}
