import { CONFIG, ERROR_MESSAGE } from '../constants';

const numberValidator = {
  validate(number) {
    this.validateBlank(number);
    this.validateNumber(number);
  },

  validateLottoNumber(number) {
    this.validate(number);
    this.validateRange(number);
  },

  validateBlank(number) {
    if (number.length === 0) {
      throw new Error(ERROR_MESSAGE.BLANK_INPUT);
    }
  },

  validateNumber(number) {
    if (isNaN(number)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_INPUT);
    }
  },

  validateRange(number) {
    if (!this.isValidRange(number)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  },

  isValidRange(number) {
    return number >= CONFIG.MIN_LOTTO_NUMBER && number <= CONFIG.MAX_LOTTO_NUMBER;
  },
};

export default numberValidator;
