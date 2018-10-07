import api from '../utils/api'

export const SET_TOKEN_VALUE = Symbol()
export const SET_TOKEN_FETCHING = Symbol()
export const SET_TOKEN_ERROR = Symbol()
export const RESET_TOKEN = Symbol()

export const setTokenValue = (payload) => ({
	type: SET_TOKEN_VALUE,
	payload
})

export const setTokenFetching = (payload) => ({
	type: SET_TOKEN_FETCHING,
	payload
})

export const setTokenError = (payload) => ({
	type: SET_TOKEN_ERROR,
	payload
})

export const resetToken = () => ({
	type: RESET_TOKEN
})

export const fetchToken = (props, state) => async (dispatch) => {

	dispatch(setTokenFetching(true))
	dispatch(setTokenError())

	try {

		const data = await api('/tokens', {
			method: 'post',
			body: JSON.stringify(state),
			props
		})

		dispatch(setTokenFetching(false))
		dispatch(setTokenValue(data))

	} catch (err) {

		dispatch(setTokenFetching(false))
		dispatch(setTokenError(err))

	}

}

export const deleteToken = (props) => async (dispatch) => {

	dispatch(resetToken())

	try {

		await api(`/tokens/${ props.token.value.id }`, {
			method: 'delete',
			props
		})

	} catch (err) {

		dispatch(setTokenError(err))

	}

}