package c64.cms.web.dto;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
public class UserDto implements Serializable {
    private Long id;
    private String username;
    private String website;
    private String affiliation;
    private String firstname;
    private String lastname;
    private String email;
    private Boolean isAdmin;
}
