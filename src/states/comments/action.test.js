/**
 * Test Scenarios
 *
 * - Comment Action Creators
 *   - should create post comment request action correctly
 *   - should create post comment success action correctly with comment data
 *   - should create post comment failure action correctly with error
 *
 * - asyncPostComment thunk
 *   - should dispatch actions correctly when commenting success
 *     - should dispatch postCommentRequest action
 *     - should dispatch postCommentSuccess action with comment data
 *     - should call toast.success with success message
 *     - should dispatch asyncFetchThreadDetail
 *   - should dispatch actions correctly when commenting failed
 *     - should dispatch postCommentRequest action
 *     - should dispatch postCommentFailure action with error
 *     - should call toast.error with error message
 *     - should dispatch asyncFetchThreadDetail
 *   - should handle complete comment data structure correctly
 *     - should include all required comment properties
 *     - should include owner data
 *     - should include voting arrays
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import {
  ActionType,
  postCommentRequestActionCreator,
  postCommentSuccessActionCreator,
  postCommentFailureActionCreator,
  asyncPostComment,
} from './action';

// Mock dependencies
vi.mock('@/utils/api');
vi.mock('react-toastify');

describe('Comment Actions', () => {
  // Test data
  const threadId = 'thread-123';
  const comment = 'Test comment';
  const mockResponse = {
    status: 'success',
    message: 'Comment created',
    data: {
      comment: {
        id: 'comment-1',
        content: 'Test comment',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    }
  };
  const mockError = new Error('Network error');

  // Mock dispatch function
  let dispatch;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    dispatch = vi.fn();
  });

  describe('Action Creators', () => {
    /**
     * Test scenario: should create post comment request action correctly
     *
     * - verify the action type is POST_COMMENT_REQUEST
     */
    it('should create post comment request action correctly', () => {
      const action = postCommentRequestActionCreator();
      expect(action).toEqual({
        type: ActionType.POST_COMMENT_REQUEST,
      });
    });

    /**
     * Test scenario: should create post comment success action correctly
     *
     * - verify the action type is POST_COMMENT_SUCCESS
     * - verify the payload contains the comment data
     */
    it('should create post comment success action correctly with comment data', () => {
      const action = postCommentSuccessActionCreator(mockResponse.data.comment);
      expect(action).toEqual({
        type: ActionType.POST_COMMENT_SUCCESS,
        payload: { comment: mockResponse.data.comment },
      });
    });

    /**
     * Test scenario: should create post comment failure action correctly
     *
     * - verify the action type is POST_COMMENT_FAILURE
     * - verify the payload contains the error
     */
    it('should create post comment failure action correctly with error', () => {
      const action = postCommentFailureActionCreator(mockError);
      expect(action).toEqual({
        type: ActionType.POST_COMMENT_FAILURE,
        payload: { error: mockError },
      });
    });
  });

  describe('asyncPostComment thunk', () => {
    /**
     * Test scenario: should dispatch actions correctly when commenting success
     *
     * - verify dispatch is called 4 times
     * - verify postCommentRequest action is dispatched first
     * - verify postCommentSuccess action is dispatched with correct comment data
     * - verify toast.success is called with success message
     * - verify asyncFetchThreadDetail is dispatched
     */
    it('should dispatch actions correctly when commenting success', async () => {
      // Mock API success response
      api.createComment.mockResolvedValueOnce(mockResponse);

      // Execute the thunk
      await asyncPostComment(threadId, comment)(dispatch);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, postCommentRequestActionCreator());
      expect(dispatch).toHaveBeenNthCalledWith(2, postCommentSuccessActionCreator(mockResponse.data));

      // Verify toast was called
      expect(toast.success).toHaveBeenCalledWith('Comment posted successfully');

      // Verify API was called with correct parameters
      expect(api.createComment).toHaveBeenCalledWith(threadId, comment);
    });

    /**
     * Test scenario: should dispatch actions correctly when commenting failed
     *
     * - verify dispatch is called 4 times
     * - verify postCommentRequest action is dispatched first
     * - verify postCommentFailure action is dispatched with error
     * - verify toast.error is called with error message
     * - verify asyncFetchThreadDetail is dispatched
     */
    it('should dispatch actions correctly when commenting failed', async () => {
      // Mock API failure
      api.createComment.mockRejectedValueOnce(mockError);

      // Execute the thunk
      await asyncPostComment(threadId, comment)(dispatch);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, postCommentRequestActionCreator());
      expect(dispatch).toHaveBeenNthCalledWith(2, postCommentFailureActionCreator(mockError));

      // Verify error toast was called
      expect(toast.error).toHaveBeenCalledWith(`Failed to post comment, ${mockError.message}`);
    });

    /**
     * Test scenario: should handle complete comment data structure correctly
     *
     * - verify all required comment properties exist
     * - verify owner data structure
     * - verify voting arrays
     */
    it('should handle complete comment data structure correctly', async () => {
      // Mock API success response
      api.createComment.mockResolvedValueOnce(mockResponse);

      // Execute the thunk
      await asyncPostComment(threadId, comment)(dispatch);

      // Verify the comment data structure is handled correctly
      const successAction = dispatch.mock.calls[1][0];
      expect(successAction.payload.comment).toEqual(mockResponse.data);
      expect(successAction.payload.comment).toMatchObject({
        comment:{
          id: expect.any(String),
          content: expect.any(String),
          createdAt: expect.any(String),
          upVotesBy: expect.any(Array),
          downVotesBy: expect.any(Array),
          owner: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String)
          })
        } });
    });
  });
});