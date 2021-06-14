package c64.cms.core.service;

import c64.cms.core.model.Permission;
import c64.cms.core.model.User;

import java.util.List;

public interface UserService {
    boolean existsUsername(String username);
    User getUserByUsername(String username) throws Exception;

    void addUser(User user) throws Exception;

    List<User> getAllUsers();
}
