import { GameControlStaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import MoneyInput from '../dom_component/MoneyInput';
import LottoList from '../dom_component/LottoList.js';
import LottoInput from '../dom_component/LottoInput.js';
import ResultModal from '../dom_component/ResultModal.js';

class LottoGameDomController {
  #lottoGame = new LottoGame();

  startGame() {
    MoneyInput.activate(this.#purchaseLottos);
    LottoInput.activate(this.#setWinningLotto);
    ResultModal.activate(this.#resetGame);
  }

  #purchaseLottos = (money) => {
    const PURCHASE_COUNT = Number(money) / GameControlStaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(money);
      const USER_LOTTOS = this.#lottoGame.generateUserLottos(PURCHASE_COUNT);
      this.#showLottoList(PURCHASE_COUNT, USER_LOTTOS);
      LottoInput.resetWinningNumberInputs();
    } catch (error) {
      alert(error.message);
      MoneyInput.reset();
    }
  };

  #showLottoList(purchaseCount, userLottos) {
    LottoList.render(purchaseCount, userLottos);
    LottoInput.render();
  }

  #setWinningLotto = (winningNumbers, bonusNumber) => {
    const winningNumbersValidity = this.#varifyWinningNumbers(winningNumbers);
    const bonusNumberValidity = this.#varifyBonusNumber(winningNumbers, bonusNumber);

    if (winningNumbersValidity && bonusNumberValidity) {
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
      this.#showGameResult();
    }
  };

  #varifyWinningNumbers(winningNumbers) {
    try {
      Validation.testLottoNumbers(winningNumbers);
      return true;
    } catch (error) {
      alert(error.message);
      LottoInput.resetWinningNumberInputs();
      return false;
    }
  }

  #varifyBonusNumber(winningNumbers, bonusNumber) {
    try {
      Validation.testBonusNumber(winningNumbers, bonusNumber);
      return true;
    } catch (error) {
      alert(error.message);
      LottoInput.resetBonusNumberInput();
      return false;
    }
  }

  #showGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    ResultModal.render(RANKS, PROFIT_RATE);
  }

  #resetGame = () => {
    LottoList.reset();
    LottoInput.reset();
    MoneyInput.reset();
  };
}

export default new LottoGameDomController();