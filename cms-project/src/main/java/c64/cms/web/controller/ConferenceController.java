package c64.cms.web.controller;

import c64.cms.core.model.Conference;
import c64.cms.core.model.Section;
import c64.cms.core.service.ConferenceService;
import c64.cms.web.converter.UserConverter;
import c64.cms.web.dto.UserDto;
import c64.cms.web.request.AddAuthorRequest;
import c64.cms.web.request.AddListenerRequest;
import c64.cms.web.request.AddPCRequest;
import c64.cms.web.request.AddSectionRequest;
import c64.cms.web.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ConferenceController {

    @Autowired
    private ConferenceService conferenceService;

    @Autowired
    private UserConverter userConverter;

    @GetMapping("/conferences")
    public List<Conference> getAllConferences() {
        return conferenceService.getAllConferences();
    }

    @GetMapping("/conferences/{id}")
    public Conference getConferenceById(@PathVariable(value = "id") Long conferenceId) {
       Optional<Conference> optional = conferenceService.getConference(conferenceId);
       if(optional.isEmpty()) return null;
          return optional.get();
    }

    @GetMapping("/conferences/phase/{id}")
    public MessageResponse getConferencePhase(@PathVariable(value = "id") Long conferenceId) {
        return new MessageResponse(conferenceService.getCurrentPhase(conferenceId));
    }

    @GetMapping("conferences/sections/{id}")
    public List<Section> getConferenceSections(@PathVariable(value = "id") Long conferenceId){
        return conferenceService.getAllSections(conferenceId);
    }

    @GetMapping("conferences/pcMembers/{id}")
    public List<UserDto> getConferencePCMembers(@PathVariable(value = "id") Long conferenceId){
        return userConverter.convertModelsToDtos(conferenceService.getPCMembersForConference(conferenceId));
    }

    @GetMapping("conferences/checkBiddingPhase/{id}")
    public MessageResponse checkBiddingPhase(@PathVariable(value = "id") Long conferenceId){
        try{
            if(!conferenceService.bidDeadlineReached(conferenceId))
                return new MessageResponse("yes");
            return new MessageResponse("no");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/conferences")
    public MessageResponse createConference(@RequestBody Conference conference) {
        try{
            conferenceService.addConference(conference);
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PutMapping ("/conferences")
    MessageResponse updateConference(@RequestBody Conference updatedConference){
        try{
            if(!conferenceService.getCurrentPhase(updatedConference.getId()).equals("preliminary"))
                throw new Exception("Cannot update a conference which is not in preliminary phase!");
            conferenceService.addConference(updatedConference);
            System.out.println("\n updated Conference \n");
            return new MessageResponse("success");
        }
        catch (Exception e){
            System.out.println("\n fail: " + e.getMessage() + "\n");
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/conferences/addPCMember")
    public MessageResponse addPCMember(@RequestBody AddPCRequest addPCRequest) {
        try{
            conferenceService.addPCMember(  addPCRequest.getConferenceId(),
                                            addPCRequest.getUserId(),
                                            addPCRequest.getIsChair());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/conferences/addAuthor")
    public MessageResponse addAuthor(@RequestBody AddAuthorRequest addAuthorRequest){
        try{
            conferenceService.addAuthor(addAuthorRequest.getConferenceId(),
                                        addAuthorRequest.getUserId());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/conferences/addListener")
    public MessageResponse addListener(@RequestBody AddListenerRequest addListenerRequest){
        try{
            conferenceService.addListener(addListenerRequest.getConferenceId(),
                                          addListenerRequest.getUserId());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }

    @PostMapping("/conferences/addSection")
    public MessageResponse addSection(@RequestBody AddSectionRequest addSectionRequest){
        try{
            conferenceService.addSection(addSectionRequest.getConferenceId(),
                                         addSectionRequest.getName(),
                                         addSectionRequest.getChairId());
            return new MessageResponse("success");
        }
        catch (Exception e){
            return new MessageResponse("fail: " + e.getMessage());
        }
    }
}


