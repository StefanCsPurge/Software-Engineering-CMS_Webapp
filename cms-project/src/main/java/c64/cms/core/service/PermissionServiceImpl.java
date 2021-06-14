package c64.cms.core.service;

import c64.cms.core.model.Permission;
import c64.cms.core.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public List<Permission> getAllPermissions(Long userId) {
        return this.permissionRepository.findByUserId(userId);
    }

    @Override
    public boolean isAuthor(Long conferenceId, Long userId) {
        List<Permission> permissions = this.permissionRepository.findByConferenceIdAndUserId(conferenceId, userId);
        return permissions.stream().anyMatch(t -> t.getPermission().equals("author"));
    }

    @Override
    public boolean isChair(Long conferenceId, Long userId) {
        List<Permission> permissions = this.permissionRepository.findByConferenceIdAndUserId(conferenceId, userId);
        return permissions.stream().anyMatch(t -> t.getPermission().equals("chair"));
    }

    @Override
    public List<Long> getAllAuthorIDs(Long conferenceId) {
        //TODO
        return null;
    }

    @Override
    public List<Long> getAllChairIDs(Long conferenceId) {
        return null;
    }

    @Override
    public List<Permission> getAllUsersPermissions() {
        return this.permissionRepository.findAll();
    }

}
