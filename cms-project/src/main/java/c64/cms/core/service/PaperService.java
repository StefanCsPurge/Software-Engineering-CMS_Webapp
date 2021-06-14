package c64.cms.core.service;

import c64.cms.core.model.Paper;

import java.util.List;

public interface PaperService {

    /** addPaper
     * @param paper Paper(confId, name, topic, abstract, full, authorId) */
    void addPaper(Paper paper);


    /** getPaper
     * @param paperId Long */
    Paper getPaper(Long paperId) throws Exception;


    /** getAllAuthorPapers -> (full paper objects)
     *  they are shown with review result & evaluator in the 2nd phase
     *  (don't show evaluator if author is also PC)
     *  @param authorId Long */
    List<Paper> getAllAuthorPapers(Long authorId);


    /** updatePaper - phase 2 option for the author after the paper was evaluated and accepted
     *  @param updatedPaper newPaperObject
     *  @throws Exception in case the paper with that ID does not exist */
    void updatePaper(Paper updatedPaper) throws Exception;


    /** getAuthorAcceptedPapers -> authorId (only in phase 3)
     *  @param authorId Long */
    List<Paper> getAuthorAcceptedPapers(Long authorId);


    /** getAllConferencePapers - needed for PC bid/review
     *  @param conferenceId Long */
    List<Paper> getAllConferencePapers(Long conferenceId);


    /** bidPaper (only in the bidding stage of phase2)
                [bid from worst to best: none, conflict, refuse, could, pleased (to evaluate)]
                        - if bid is better than the last one: lastBid = bid, evaluatorId = PCid
     * @param  paperId, PCId, bid
     * @throws Exception in case of invalid paperId/bid */
    void bidPaper(Long paperId, Long PCId, String bid) throws Exception;


    /** reviewPaper (after the bidding phase ends)
     * @param paperId, evaluatorId, review
     * [review from best to worst:
     *  strong-accept, accept, weak-accept, borderline-paper, weak-reject, reject, strong-reject] */
    void reviewPaper(Long paperId, Long evaluatorId, String review) throws Exception;


    /** getConferencePapersForEvaluator - only after the bid deadline was reached, get his accepted papers
     * @param  evaluatorId, conferenceId */
    List<Paper> getConferencePapersForEvaluator(Long evaluatorId, Long conferenceId);


    /** addSectionToPaper -> paperId, sectionId - phase 3 */
    void addSectionToPaper(Long paperId, Long sectionId) throws Exception;

    /** getReviewerPapers -> authorId (only in phase 2)
     *  @param pcId Long */
    List<Paper> getReviewerPapers(Long pcId);
}

