package c64.cms.web.converter;

public interface Converter<Model, Dto> {
    Model dtoToModel(Dto dto);

    Dto modelToDto(Model model);
}
