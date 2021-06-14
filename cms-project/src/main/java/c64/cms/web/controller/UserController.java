package c64.cms.web.controller;
import c64.cms.core.model.User;
import c64.cms.core.service.PermissionService;
import c64.cms.core.service.UserService;
import c64.cms.web.converter.UserConverter;
import c64.cms.web.dto.UserDto;
import c64.cms.web.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import c64.cms.core.model.Permission;
import c64.cms.web.request.PermissionsRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private UserConverter userConverter;

    @RequestMapping(value = "/getUsers", method = RequestMethod.GET)
    public List<UserDto> getUsers(){
        return userConverter.convertModelsToDtos(userService.getAllUsers());
    }

    @RequestMapping(value = "/getUserPermissions", method = RequestMethod.POST)
    public List<Permission> getUserPermissions(@RequestBody PermissionsRequest permissionsRequest) {
        Long userId = permissionsRequest.getUserId();
        return permissionService.getAllPermissions(userId);
    }

    @RequestMapping(value = "/getAllPermissions", method = RequestMethod.GET)
    public List<Permission> getUserPermissions() {
        return permissionService.getAllUsersPermissions();
    }

    @GetMapping("/getLoggedUser")
    public UserDto getLoggedUser() {
        Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails) object).getUsername();
        UserDto userDto = null;
        try {
            User user = this.userService.getUserByUsername(username);
            userDto = userConverter.modelToDto(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userDto;
    }
}
