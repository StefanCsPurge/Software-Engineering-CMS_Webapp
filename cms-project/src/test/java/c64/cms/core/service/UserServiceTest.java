package c64.cms.core.service;

import c64.cms.core.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void testUser() {
        try {
            var myUser = User.builder()
                    .firstName("GG")
                    .lastName("gg")
                    .isAdmin(false)
                    .email("an@email")
                    .password("pass")
                    .username("user1")
                    .build();
            this.userService.addUser(myUser);

            assert this.userService.existsUsername("user1");
            assert !this.userService.existsUsername("user2");

            var gotUser = this.userService.getUserByUsername("user1");
            assert gotUser.getFirstName().equals("GG") && gotUser.getLastName().equals("gg");

        } catch (Exception e) {
            e.printStackTrace();
            assert false;
        }
    }

}
