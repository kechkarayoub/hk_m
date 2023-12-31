import moment from "moment";
import { COLORS, get_country_phone_code_from_number, get_current_language, get_date_format, 
  get_datetime_format, get_local_number_from_international, get_random_color, get_time_format, toStrRegularNumerals } from 'src/utils/index';
import { act } from '@testing-library/react-native';
import { set } from 'src/Store/locale';

jest.mock('react-native-localize', () => ({
  // Mock getLocales for testing
  getLocales: jest.fn(() => [{ countryCode: 'FR', languageTag: 'fr-FR' }]),
}));

describe('Get_random_color function', () => {
  test('Test get_random_color', () => {
      var random_color = get_random_color();
      var index_color = COLORS.indexOf(random_color);
      expect(index_color).not.toBe(-1);
  });
});

describe('Test get_date_format', () => {
  test('Should render correct string', async () => {
    var date_format = get_date_format(moment());
    expect(date_format).toBe(moment().format("DD/MM/YYYY"));
  });
});

describe('Test get_datetime_format', () => {
  test('Should render correct string', async () => {
    var moment_obj = moment();
    var date_format = get_datetime_format(moment_obj);
    expect(date_format).toBe(moment_obj.format("DD/MM/YYYY HH:mm"));
  });
});

describe('Test get_time_format', () => {
  test('Should render correct string', async () => {
    var moment_obj = moment();
    var date_format = get_time_format(moment_obj);
    expect(date_format).toBe(moment_obj.format("HH:mm"));
  });
});

describe('Test get_current_language', () => {
  test('Should render default stored language', async () => {
    var current_language;
    await act(async () => {
      get_current_language((cl) => {
        current_language = cl;
      })
    });
    expect(current_language).toBe("fr");
  });

  test('Should render stored language', async () => {
    var current_language;
    set("current_language", "ar");
    await act(async () => {
      get_current_language((cl) => {
        current_language = cl;
      })
    });
    expect(current_language).toBe("ar");
  });
});

describe('Test get_local_number_from_international', () => {
  test('Should render null if null', async () => {
    var local_number = get_local_number_from_international(null);
    expect(local_number).toBe(null);
  });

  test('Should render undefined if undefined', async () => {
    var local_number = get_local_number_from_international();
    expect(local_number).toBe(undefined);
  });
  
  test('Should format number', async () => {
    var local_number = get_local_number_from_international("+212612121212");
    expect(local_number).toBe("0612121212");
    local_number = get_local_number_from_international("212612121212");
    expect(local_number).toBe("0612121212");
    local_number = get_local_number_from_international("1212");
    expect(local_number).toBe("1212");
  });
});

describe('Test get_country_phone_code_from_number', () => {
  test('Should render phone code', async () => {
    var local_number = get_country_phone_code_from_number(null);
    expect(local_number).toBe("");
    local_number = get_country_phone_code_from_number();
    expect(local_number).toBe("");
    local_number = get_country_phone_code_from_number("+212612121212");
    expect(local_number).toBe("+212");
    local_number = get_country_phone_code_from_number("212612121212");
    expect(local_number).toBe("+212");
    local_number = get_country_phone_code_from_number("1212");
    expect(local_number).toBe("");
  });
});
describe('Test toStrRegularNumerals', () => {
  test('Should return empty string if parameter is undefined or null', async () => {
    var converted_str = toStrRegularNumerals(null);
    expect(converted_str).toBe("");
    converted_str = toStrRegularNumerals();
    expect(converted_str).toBe("");
    converted_str = toStrRegularNumerals("");
    expect(converted_str).toBe("");
  });

  test("Should return the same value of parameter if parameter doesn't contains arabic numbers", async () => {
    var converted_str = toStrRegularNumerals("12/12/12");
    expect(converted_str).toBe("12/12/12");
    let alpa_num = "qwertyuiopasdfghjklzxcvbnm01234567891234567890-=[];'\\,./!@#$%^&*()_+|{}:|<>?";
    converted_str = toStrRegularNumerals(alpa_num);
    expect(converted_str).toBe(alpa_num);
  });

  test("Should convert arabic numbers", async () => {
    var converted_str = toStrRegularNumerals('٠١٢٣٤٥٦٧٨٩');
    expect(converted_str).toBe("0123456789");
    converted_str = toStrRegularNumerals('٠١٢٣٤55٦٧٨٩');
    expect(converted_str).toBe("01234556789");
  });
});
