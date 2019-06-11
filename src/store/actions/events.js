import { toastr } from 'react-redux-toastr';
import {
  START_EVENT,
  SAVE_EVENT,
  FAIL_EVENT,
  SET_USER_EVENTS,
  SET_EVENT,
  ST_GET_EVENT_GUESTS,
  FL_GET_EVENT_GUESTS,
  SUC_GET_EVENT_GUESTS,
  EVENT_PUBLISHED,
  FAIL_REQUEST,
  GET_EVENTS_PUBLISHED,
  ST_GET_EVENTS_PUBLISHED,
  ST_SUB_USER_IN_EVENT,
  USER_SUBSCRIBED,
} from './types';
import history from '../../history';

import events from '../../api/events';

export const saveEvent = dataEvent => async dispatch => {
  const token = localStorage.getItem('token');
  console.log(dataEvent);
  try {
    dispatch({ type: START_EVENT });
    await events(token, false).post('/register', dataEvent);

    toastr.success('Exitoso!', 'Evento Creado');
    dispatch({ type: SAVE_EVENT });
    history.push('/myevents');
  } catch (ex) {
    console.log(ex.response);
    toastr.error('Error', 'Upp! Algo salio mal.');
    dispatch({ type: FAIL_EVENT });
  }
};

export const getEvents = () => async dispatch => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user');
  try {
    dispatch({ type: START_EVENT });
    const res = await events(token).get(`/user/${userId}`);
    dispatch({ type: SET_USER_EVENTS, payload: res.data.data });
  } catch (ex) {
    console.log(ex.response);
    dispatch({ type: FAIL_EVENT });
  }
};

export const getEvent = id => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    dispatch({ type: START_EVENT });
    const res = await events(token).get(`/${id}`);
    dispatch({ type: SET_EVENT, payload: res.data.data });
  } catch (ex) {
    console.log(ex.response);
    dispatch({ type: FAIL_EVENT });
  }
};

export const updateEvent = data => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const res = await events(token).put(`/edit`, data);
    toastr.success('Exitoso!', 'Evento Actualizado');

    console.log('succeedd', res);
  } catch (err) {
    toastr.error('Error', 'Upp! Algo salio mal.');
    console.log(err.response.data);
  }
};

export const updateEventImg = (id, img) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  const form = new FormData();
  form.append('image', img, img.name);

  try {
    const { data } = await events(token, true).put(`image/${id}`, form);
    const event = getState().events.currentEvent;
    console.log(event);
    dispatch({ type: SET_EVENT, payload: { ...event, image: data.url } });
  } catch (err) {
    console.log(err.response);
  }
};

export const createEventGuests = emails => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await events(token).post('invitation/create/', emails);
    console.log(data);
  } catch (err) {
    console.log(err.response);
  }
};

export const getEventGuests = eventId => async dispatch => {
  const token = localStorage.getItem('token');

  dispatch({ type: ST_GET_EVENT_GUESTS });

  try {
    const { data } = await events(token).get(`${eventId}/invitations`);
    dispatch({ type: SUC_GET_EVENT_GUESTS, payload: data.data });
    console.log(data);
  } catch (err) {
    dispatch({ type: FL_GET_EVENT_GUESTS });
    console.log(err.response);
  }
};

export const changeStatusEvent = (eventId, status) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const { data } = await events(token).put(
      `/change_status/${eventId}`,
      status
    );
    dispatch({ type: EVENT_PUBLISHED });
    console.log(data);
  } catch (err) {
    // dispatch({ type: FL_GET_EVENT_GUESTS });
    console.log(err.response);
  }
};

export const getEventsPublished = page => async dispatch => {
  const token = localStorage.getItem('token');
  dispatch({ type: ST_GET_EVENTS_PUBLISHED });
  try {
    let res = null;
    if (page) {
      res = await events(token).get(`/published?page=${page}`);
    } else {
      res = await events(token).get(`/published`);
    }
    dispatch({ type: GET_EVENTS_PUBLISHED, payload: res.data.data });
    console.log(res);
  } catch (err) {
    dispatch({ type: FAIL_REQUEST });
    console.log(err.response);
  }
};

export const signUpUserInEvent = (eventId, userId) => async dispatch => {
  const token = localStorage.getItem('token');
  dispatch({ type: ST_SUB_USER_IN_EVENT });
  try {
    const { data } = await events(token).put(`/signup/${eventId}`, { userId });
    console.log(data);

    // dispatch({ type: USER_SUBSCRIBED, payload: res.data.data });
  } catch (err) {
    dispatch({ type: FAIL_REQUEST });
    console.log(err.response);
  }
};
