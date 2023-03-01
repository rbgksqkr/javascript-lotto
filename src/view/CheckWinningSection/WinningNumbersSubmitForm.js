import { LOTTO_NUMBERS_COUNT } from '../../domain/constants';

import { $, $$, dispatchCustomEvent } from '../../utils/dom';

class WinningNumbersSubmitForm {
  #template = /* html */ `
  <form class="winning-numbers-form">
    <fieldset>
      <legend>
        지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
      </legend>
      <div class="flex space-between number-input-container">
        <div class="flex-col input-wrapper">
          <label for="winning-numbers-input">당첨 번호</label>
          <div>
            ${Array(LOTTO_NUMBERS_COUNT)
              .fill()
              .map(
                (_, index) => /* html */ `
                <input
                  id="winning-numbers-input"
                  class="number-input"
                  type="number"
                  min="1"
                  max="45"
                  tabindex="${index + 1}"
                  required
                />
            `
              )
              .join('')}
          </div>
        </div>
        <div class="flex-col input-wrapper">
          <label class="bonus-number-label" for="bonus-number-input">
            보너스 번호
          </label>
          <input
            id="bonus-number-input"
            class="number-input"
            type="number"
            min="1"
            max="45"
            tabindex="7"
            required
          />
        </div>
      </div>
      <button class="check-result-button typo-button" type="submit">결과 확인하기</button>
    </fieldset>
  </form>
  `;

  $target;

  FIRST_INPUT_INDEX = 1;

  LAST_INPUT_INDEX = 8;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', this.#template);

    const numberInputs = Array.from($$('.number-input'));
    this.focusFirstInput(numberInputs);
    this.bindEvent(numberInputs);
  }

  focusFirstInput(inputs) {
    const [firstInput] = inputs;

    firstInput.focus();
  }

  bindEvent(numberInputs) {
    numberInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        this.checkInputValidity(e.target);
        this.handleInputAutoFocusNext(numberInputs, e.target);
      });
    });

    this.$target.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  checkInputValidity(input) {
    if (input.checkValidity()) {
      input.classList.add('valid');
      input.classList.remove('invalid');
      return;
    }

    input.classList.remove('valid');
    input.classList.add('invalid');
  }

  handleInputAutoFocusNext(inputs, currentInput) {
    const inputValueLength = currentInput.value.length;
    const nextInput = inputs.find(
      (input) => input.tabIndex === currentInput.tabIndex + 1
    );

    if (this.canFocusNextInput(inputValueLength, nextInput)) {
      nextInput.focus();
    }
  }

  canFocusNextInput(inputValueLength, nextInput) {
    return inputValueLength === 2 && nextInput;
  }

  handleSubmit(e) {
    e.preventDefault();

    const numbers = Array.from(e.target)
      .slice(this.FIRST_INPUT_INDEX, this.LAST_INPUT_INDEX)
      .map((inputEl) => inputEl.valueAsNumber);

    try {
      this.validate(numbers);
      dispatchCustomEvent($('#app'), {
        eventType: 'checkResult',
        data: numbers,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  validate(numbers) {
    if (this.hasDuplicateNumber(numbers)) {
      throw new Error('[ERROR] 당첨 번호에 중복이 존재하면 안됩니다.');
    }
  }

  hasDuplicateNumber(numbers) {
    return numbers.length !== new Set(numbers).size;
  }
}

export default WinningNumbersSubmitForm;