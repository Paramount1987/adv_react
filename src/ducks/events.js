import { all, take, call, put, select } from 'redux-saga/effects';
import { appName } from '../config';
import { Record, OrderedMap, OrderedSet } from 'immutable';
import firebase from 'firebase';
import { createSelector } from 'reselect';
import {fbDataToEntities} from './utils';

/**
 * Constants
 */
export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const FECT_ALL_REQUEST = `${prefix}/FECT_ALL_REQUEST`;
export const FECT_ALL_SUCCESS = `${prefix}/FECT_ALL_SUCCESS`;
export const FECT_LAZY_START = `${prefix}/FECT_LAZY_START`;
export const FECT_LAZY_REQUEST = `${prefix}/FECT_LAZY_REQUEST`;
export const FECT_LAZY_SUCCESS = `${prefix}/FECT_LAZY_SUCCESS`;
export const SELECT_EVENT = `${prefix}/SELECT_EVENT`;

/**
 * Reducer
 */
export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  loaded: false,
});

export const EventRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case FECT_ALL_REQUEST:
    case FECT_LAZY_START:
      return state.set('loading', true);

    case FECT_ALL_SUCCESS:
      return state
              .set('loading', false)
              .set('loaded', true)
              .set('entities',fbDataToEntities(payload, EventRecord));

    case FECT_LAZY_SUCCESS:
      return state
            .set('loading', false)
            .mergeIn(['entities'], fbDataToEntities(payload, EventRecord))
            .set('loaded', Object.keys(payload).length < 10)           

    case SELECT_EVENT:
      return state.selected.contains(payload.uid)
            ? state.update('selected', selected => selected.remove(payload.uid))
            : state.update('selected', selected => selected.add(payload.uid))       
    default:
      return state;
  }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const eventListSelector = createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
));

/**
 * Action Creators
 */

 export function fetchAll() {
   return {
     type: FECT_ALL_REQUEST
   }
 }

 export function selectEvent(uid) {
  return {
    type: SELECT_EVENT,
    payload: {uid}
  }
 }

 export function fetchLazy() {
   return {
     type: FECT_LAZY_REQUEST
   }
 }

 /**
  * Sagas
  */

  export const fetchAllSaga = function * () {
    while (true) {
      yield take(FECT_ALL_REQUEST);

      const ref = firebase.database().ref('events');
      const data = yield call([ref, ref.once], 'value');

      yield put({
        type: FECT_ALL_SUCCESS,
        payload: data.val()
      });
    }
  }

  export const fetchLazySaga = function * () {
    while(true) {
      yield take(FECT_LAZY_REQUEST);

      const state = yield select(stateSelector);

      if (state.loading || state.loaded) continue;
      // if (state.loaded) return;

      yield put({
        type: FECT_LAZY_START
      });

      const lastEvent = state.entities.last();
      const ref = firebase.database().ref('events')
          .orderByKey()
          .limitToFirst(10)
          .startAt(lastEvent ? lastEvent.uid : '');

      const data = yield call([ref, ref.once], 'value');
      
      yield put({
        type: FECT_LAZY_SUCCESS,
        payload: data.val()
      })
    }
  }

export function* saga() {
  yield all([
    fetchAllSaga(),
    fetchLazySaga(),
  ]);
}