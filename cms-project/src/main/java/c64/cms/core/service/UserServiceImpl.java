package c64.cms.core.service;

import c64.cms.core.model.User;
import c64.cms.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean existsUsername(String username) {
        return userRepository.findAll().stream().anyMatch(user -> user.getUsername().equals(username));
    }

    @Override
    public User getUserByUsername(String username) throws Exception {
        if(!existsUsername(username))
            throw new Exception("username does not exist");
        else {
            var users = userRepository.findAll().stream()
                    .filter(user -> user.getUsername().equals(username)).collect(Collectors.toList());
            return users.get(0);
        }
    }

    @Override
    public void addUser(User user) {
        this.userRepository.save(user);
    }


    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }
}
