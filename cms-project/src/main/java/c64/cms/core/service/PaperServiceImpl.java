package c64.cms.core.service;

import c64.cms.core.model.Paper;
import c64.cms.core.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PaperServiceImpl implements PaperService{

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private ConferenceService conferenceService;

    @Override
    public void addPaper(Paper paper) {
        this.paperRepository.save(paper);
    }

    @Override
    public Paper getPaper(Long paperId) throws Exception {
        var paperOpt = this.paperRepository.findById(paperId);
        if(paperOpt.isEmpty())
            throw new Exception("The paper with given ID does not exist");
        return paperOpt.get();
    }

    @Override
    public List<Paper> getAllAuthorPapers(Long authorId) {
        return this.paperRepository.findByAuthorId(authorId);
    }

    @Override
    public void updatePaper(Paper updatedPaper) throws Exception {
        var repoPaper = this.getPaper(updatedPaper.getId());
        repoPaper = updatedPaper;
        this.paperRepository.save(repoPaper);
    }

    @Override
    public List<Paper> getAuthorAcceptedPapers(Long authorId) {
        // strong-accept, accept, weak-accept, borderline-paper
        return getAllAuthorPapers(authorId).stream().filter(paper ->
                paper.getReviewResult().equals("strong-accept") ||
                paper.getReviewResult().equals("accept") ||
                paper.getReviewResult().equals("weak-accept") ||
                paper.getReviewResult().equals("borderline-paper")
        ).collect(Collectors.toList());
    }

    @Override
    public List<Paper> getReviewerPapers(Long pcId) {
        // could, pleased
        return this.paperRepository.findByEvaluatorId(pcId).stream().filter(paper ->
                paper.getReviewResult().equals("could") ||
                paper.getReviewResult().equals("pleased")
        ).collect(Collectors.toList());
    }

    @Override
    public List<Paper> getAllConferencePapers(Long conferenceId) {
        return paperRepository.findByConferenceId(conferenceId);
    }

    @Override
    public void bidPaper(Long paperId, Long PCId, String bid) throws Exception {
        var repoPaper = this.getPaper(paperId);
        var conferenceId = repoPaper.getConferenceId();
        if(!conferenceService.getCurrentPhase(conferenceId).equals("second") ||
            conferenceService.bidDeadlineReached(conferenceId))
            throw new Exception("Conference is not in bidding phase!");

        Map<String, Integer> bidsMap = Stream.of(new Object[][] {
                { null, 0 }, { "conflict", 1 }, { "refuse", 2 }, { "could", 3 }, { "pleased", 4 }
        }).collect(Collectors.toMap(data -> (String) data[0], data -> (Integer) data[1]));

        if(bidsMap.get(repoPaper.getReviewResult()) < bidsMap.get(bid)){
            repoPaper.setReviewResult(bid);

            repoPaper.setEvaluatorId(PCId);
            paperRepository.save(repoPaper);
        }
    }

    @Override
    public void reviewPaper(Long paperId, Long evaluatorId, String review) throws Exception {
        var repoPaper = this.getPaper(paperId);
        var conferenceId = repoPaper.getConferenceId();
        if(!conferenceService.getCurrentPhase(conferenceId).equals("second") ||
                !conferenceService.bidDeadlineReached(conferenceId))
            throw new Exception("Conference is not in review papers phase!");
        List<String> reviews = Stream.of(new String[]
                   {"strong-accept",
                    "accept",
                    "weak-accept",
                    "borderline-paper",
                    "weak-reject",
                    "reject",
                    "strong-reject"})
                .collect(Collectors.toList());
        if(!reviews.contains(review))
            throw new Exception("Invalid review result!");
        if(!repoPaper.getEvaluatorId().equals(evaluatorId))
            throw new Exception("Wrong evaluator for this paper!");
        repoPaper.setReviewResult(review);
        paperRepository.save(repoPaper);
    }

    @Override
    public List<Paper> getConferencePapersForEvaluator(Long evaluatorId, Long conferenceId) {
        // only accepted ones
        return paperRepository.findByEvaluatorIdAndConferenceId(evaluatorId,conferenceId)
                .stream().filter(paper ->
                                paper.getReviewResult().equals("could") ||
                                paper.getReviewResult().equals("pleased")
                ).collect(Collectors.toList());
    }

    @Override
    public void addSectionToPaper(Long paperId, Long sectionId) throws Exception {
        var repoPaper = this.getPaper(paperId);
        repoPaper.setSectionId(sectionId);
        this.paperRepository.save(repoPaper);
    }


}
