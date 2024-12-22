import { describe, it, expect } from 'vitest';
import { leaderBoardReducer } from './reducer';
import { leaderboard } from '@/routes/routeName';
/**
* test scenario for leaderBoardReducer
*
* - leaderBoardReducer function
*  - should return the initial state when given by unknown action
*  - should return the leaderBoards with the loading state when given by FETCH_LEADERBOARD_REQUEST action
*  - should return the leaderBoards with the success state when given by FETCH_LEADERBOARD_SUCCESS action
*  - should return the leaderBoards with the failure state when given by FETCH_LEADERBOARD__FAILURE action
*
*/


describe('leaderBoardReducer', () => {
    it('should return the initial state when given by unknown action', () => {
        //arrange
        const initialState = {
            leaderBoards: [],
            requestState: 'initial',
            error: null
        };
        //act
        const result = leaderBoardReducer(initialState, { type: 'UNKNOWN_ACTION' });
        //assert
        expect(result).toEqual(initialState);
    });

    it('should return the leaderBoards with the loading state when given by FETCH_LEADERBOARD_REQUEST action', () => {
        //arrange
        const initialState = {
            leaderBoards: [],
            requestState: 'initial',
            error: null
        };
        //act
        const result = leaderBoardReducer(initialState, { type: 'FETCH_LEADERBOARD_REQUEST' });
        //assert
        expect(result).toEqual({
            leaderBoards: [],
            requestState: 'loading',
            error: null
        });
    });

    it('should return the leaderBoards with the success state when given by FETCH_LEADERBOARD_SUCCESS action', () => {
        //arrange
        const initialState = {
            leaderBoards: [],
            requestState: 'initial',
            error: null
        };
        //act
        const result = leaderBoardReducer(initialState, { type: 'FETCH_LEADERBOARD_SUCCESS', payload: { leaderBoards: ['leader1', 'leader2'] } });
        //assert
        expect(result).toEqual({
            leaderBoards: ['leader1', 'leader2'],
            requestState: 'success',
            error: null
        });
    });

    it('should return the leaderBoards with the failure state when given by FETCH_LEADERBOARD_FAILURE action', () => {
        //arrange
        const initialState = {
            leaderBoards: [],
            requestState: 'initial',
            error: null
        };
        //act
        const result = leaderBoardReducer(initialState, { type: 'FETCH_LEADERBOARD_FAILURE', payload: { error: 'error' } });
        //assert
        expect(result).toEqual({
            leaderBoards: [],
            requestState: 'failure',
            error: 'error'
        });
    });
});