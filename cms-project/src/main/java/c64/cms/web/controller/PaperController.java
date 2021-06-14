package c64.cms.web.controller;

import c64.cms.core.model.Paper;
import c64.cms.core.service.PaperService;
import c64.cms.web.request.AddSectionToPaperRequest;
import c64.cms.web.request.BidPaperRequest;
import c64.cms.web.request.ReviewPaperRequest;
import c64.cms.web.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class PaperController {

    @Autowired
    private PaperService paperService;

    @PostMapping("/papers")
    public MessageResponse createPaper(@RequestBody Paper addPaperRequest){
        try{
            paperService.addPaper(Paper.builder()
                    .conferenceId(addPaperRequest.getConferenceId())
                    .name(addPaperRequest.getName())
                    .topic(addPaperRequest.getTopic())
                    .abstractPaper(addPaperRequest.getAbstractPaper())
                    .fullPaper(addPaperRequest.getFullPaper())
                    .authorId(addPaperRequest.getAuthorId())
                    .build());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PutMapping("/papers")
    public MessageResponse updatePaper(@RequestBody Paper updatedPaper){
        try{
            paperService.updatePaper(updatedPaper);
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @GetMapping("/papers/{id}")
    public Paper getPaperById(@PathVariable(value = "id") Long paperId){
        try {
            return paperService.getPaper(paperId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/papers/author/{id}")
    public List<Paper> getAllAuthorPapers(@PathVariable(value = "id") Long authorId) {
        return paperService.getAllAuthorPapers(authorId);
    }


    @GetMapping("/papers/author/accepted/{id}")
    public List<Paper> getAuthorAcceptedPapers(@PathVariable(value = "id") Long authorId) {
        return paperService.getAuthorAcceptedPapers(authorId);
    }

    @GetMapping("/papers/reviewer/accepted/{id}")
    public List<Paper> getReviewerPapers(@PathVariable(value = "id") Long pcId) {
        return paperService.getReviewerPapers(pcId);
    }

    @GetMapping("/papers/conference/{id}")
    public List<Paper> getAllConferencePapers(@PathVariable(value = "id") Long conferenceId) {
        return paperService.getAllConferencePapers(conferenceId);
    }

    @PostMapping("/papers/bid")
    public MessageResponse bidPaper(@RequestBody BidPaperRequest bidPaperRequest) {
        try{
            System.out.println("\nlmao\n");
            System.out.println(bidPaperRequest.getPcId());
            System.out.println("\nPCId\n");
            paperService.bidPaper(bidPaperRequest.getPaperId(),
                                  bidPaperRequest.getPcId(),
                                  bidPaperRequest.getBid());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/papers/review")
    public MessageResponse reviewPaper(@RequestBody ReviewPaperRequest reviewPaperRequest){
        try {
            paperService.reviewPaper(reviewPaperRequest.getPaperId(),
                                     reviewPaperRequest.getEvaluatorId(),
                                     reviewPaperRequest.getReview());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/papers/addToSection")
    public MessageResponse addSectionToPaper(@RequestBody AddSectionToPaperRequest addSectionToPaperRequest){
        try {
            paperService.addSectionToPaper( addSectionToPaperRequest.getPaperId(),
                                            addSectionToPaperRequest.getSectionId());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

}
