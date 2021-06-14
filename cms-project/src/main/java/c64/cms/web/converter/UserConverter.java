package c64.cms.web.converter;

import c64.cms.core.model.User;
import c64.cms.web.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserConverter extends AbstractConverter<User, UserDto> implements Converter<User, UserDto>{


    @Override
    public User dtoToModel(UserDto userDto) {
        return User.builder()
                .username(userDto.getUsername())
                .website(userDto.getWebsite())
                .affiliation(userDto.getAffiliation())
                .firstName(userDto.getFirstname())
                .lastName(userDto.getLastname())
                .email(userDto.getEmail())
                .isAdmin(userDto.getIsAdmin())
                .build();
    }

    @Override
    public UserDto modelToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .website(user.getWebsite())
                .affiliation(user.getAffiliation())
                .firstname(user.getFirstName())
                .lastname(user.getLastName())
                .email(user.getEmail())
                .isAdmin(user.getIsAdmin())
                .build();
    }
}
