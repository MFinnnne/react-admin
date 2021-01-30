/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-30 21:39:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-30 22:13:26
 */

import { StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
	export type RootState = StateType<typeof import('./reducer').default>;
}
