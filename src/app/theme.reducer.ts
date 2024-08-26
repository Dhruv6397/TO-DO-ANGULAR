import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions';

export interface ThemeState {
  isDarkMode: boolean;
}

export const initialState: ThemeState = {
  isDarkMode: false,
};

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, state => ({ ...state, isDarkMode: !state.isDarkMode }))
);
