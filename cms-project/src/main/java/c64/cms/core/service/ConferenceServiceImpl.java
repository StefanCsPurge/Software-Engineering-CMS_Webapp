package c64.cms.core.service;

import c64.cms.core.model.Conference;
import c64.cms.core.model.Permission;
import c64.cms.core.model.Section;
import c64.cms.core.model.User;
import c64.cms.core.repository.ConferenceRepository;
import c64.cms.core.repository.PermissionRepository;
import c64.cms.core.repository.SectionRepository;
import c64.cms.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConferenceServiceImpl implements ConferenceService{

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Conference> getAllConferences() {
        return conferenceRepository.findAll();
    }

    @Override
    public List<Conference> getAllUnfinishedConferences() {
        return conferenceRepository.findAllByEndDateAfter(new Date());
    }

    @Override
    public void addConference(Conference conference) {
        // validate conference
        this.conferenceRepository.save(conference);
    }

    @Override
    public void addPCMember(Long conferenceId, Long userId, Boolean isChair){
        this.permissionRepository.save(new Permission(conferenceId,userId,"pc"));
        if (isChair)
            this.permissionRepository.save(new Permission(conferenceId,userId,"chair"));
    }

    @Override
    public void addAuthor(Long conferenceId, Long userId) throws Exception {
        // Maybe add validations: check existence of the IDs. Also a chair cannot be an author in the same conference.
        if(!this.getCurrentPhase(conferenceId).equals("preliminary") &&
           !this.getCurrentPhase(conferenceId).equals("first"))
            throw new Exception("Author can register to a conference only in the preliminary/first phase!");
        this.permissionRepository.save(new Permission(conferenceId,userId,"author"));
    }

    @Override
    public void addListener(Long conferenceId, Long userId) {
        this.permissionRepository.save(new Permission(conferenceId,userId,"listener"));
    }

    @Override
    public void addSection(Long conferenceId, String name, Long chairId) throws Exception {
        if(!this.getCurrentPhase(conferenceId).equals("third"))
            throw new Exception("Sections are added only in the third phase!");
        this.sectionRepository.save(new Section(conferenceId, name, chairId));
    }

    @Override
    public String getCurrentPhase(Long conferenceId) {
        var conferenceOpt = this.conferenceRepository.findById(conferenceId);
        if(conferenceOpt.isEmpty()) return "nonexistent";
        var conference = conferenceOpt.get();
        var currentDate = new Date();
        if(currentDate.after(conference.getEndDate()))
            return "finished";
        if(currentDate.before(conference.getPreliminaryPhaseDeadline()))
            return "preliminary";
        if(currentDate.before(conference.getFirstPhaseDeadline()))
            return "first";
        if(currentDate.before(conference.getSecondPhaseDeadline()))
            return "second";
        return "third";
    }

    @Override
    public Optional<Conference> getConference(Long conferenceId) {
        return this.conferenceRepository.findById(conferenceId);
    }

    @Override
    public List<Section> getAllSections(Long conferenceId) {
        return this.sectionRepository.findByConferenceId(conferenceId);
    }

    @Override
    public Boolean bidDeadlineReached(Long conferenceId) throws Exception {
        var conferenceOpt = this.conferenceRepository.findById(conferenceId);
        if(conferenceOpt.isEmpty()) throw new Exception("The conference with this ID does not exist!");
        var conference = conferenceOpt.get();
        var currentDate = new Date();
        return currentDate.after(conference.getBidDeadline());
    }

    @Override
    public List<User> getPCMembersForConference(Long conferenceId) {
        List<Long> pcIDs = this.permissionRepository.findByConferenceIdAndPermission(conferenceId,"pc")
                            .stream().map(Permission::getUserId).collect(Collectors.toList());
        List<User> pcMembers = new ArrayList<>();
        pcIDs.forEach(id -> this.userRepository.findById(id).ifPresent(pcMembers::add));
        return pcMembers;
    }
}
