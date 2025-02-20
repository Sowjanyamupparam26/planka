import { all, call, cancel, fork, take } from 'redux-saga/effects';

import watchers from './watchers';
import services from './services';
import { setAccessToken } from '../../utils/access-token-storage';
import ActionTypes from '../../constants/ActionTypes';

export default function* loginSaga() {
  const watcherTasks = yield all(watchers.map((watcher) => fork(watcher)));

  const {
    payload: { accessToken },
  } = yield take(ActionTypes.AUTHENTICATE__SUCCESS);

  yield cancel(watcherTasks);

  yield call(setAccessToken, accessToken);
  yield call(services.goToRoot);
}
