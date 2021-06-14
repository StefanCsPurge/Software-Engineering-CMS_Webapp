package c64.cms.web.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String website;
    private String affiliation;
    private String firstname;
    private String lastname;
    private String email;
}
