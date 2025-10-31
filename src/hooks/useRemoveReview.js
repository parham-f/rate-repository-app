import { useMutation } from '@apollo/client/react';
import { REMOVE_REVIEW } from '../graphql/mutations';

const useRemoveReview = () => {
    const [mutate, result] = useMutation(REMOVE_REVIEW);
    
    const deleteReview = async (reviewId) => {
        const { data } = await mutate({
          variables: { deleteReviewId: reviewId },
        });
        return data;
      };
    return [deleteReview, result];
};

export default useRemoveReview;