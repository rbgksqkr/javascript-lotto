import CONFIG from '../constants/config.js';
import { MESSAGE } from '../constants/message.js';
import PRIZE from '../constants/prize.js';

const webOutputView = {
  printLottoCount(lottoCount) {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const purchaseDiv = document.createElement('div');
    $purchaseSection.replaceChildren();
    purchaseDiv.textContent = `${lottoCount}${MESSAGE.LOTTO_COUNT}`;
    $purchaseSection.appendChild(purchaseDiv);
  },

  convertLottoFormat(lotto) {
    return `🎟️ ${lotto.join(CONFIG.JOIN_SEPARATOR)}`;
  },

  printLottery(lottery) {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const fragment = document.createDocumentFragment();
    lottery.forEach(lotto => {
      const purchaseResultDiv = document.createElement('div');
      purchaseResultDiv.textContent = this.convertLottoFormat(lotto.numberList);
      fragment.appendChild(purchaseResultDiv);
    });
    $purchaseSection.appendChild(fragment);
  },

  printLottoResult(ranks) {
    const resultTableFragment = document.createDocumentFragment();

    // 반복할 때마다 lottoResultRow 하나씩 생성
    [PRIZE.FIFTH, PRIZE.FORTH, PRIZE.THIRD, PRIZE.SECOND, PRIZE.FIRST].forEach(rank => {
      const lottoResultRow = document.createElement('div');

      const lottoMatchedCount = document.createElement('div');
      lottoMatchedCount.textContent = `${PRIZE.COUNT_OUTPUTS[rank]}`;
      lottoMatchedCount.classList.add('lotto-result-cell');

      const lottoResultPrize = document.createElement('div');
      lottoResultPrize.textContent = `${PRIZE.AMOUNT[rank].toLocaleString('ko-KR')}`;
      lottoResultPrize.classList.add('lotto-result-cell');
      const lottoRankCount = document.createElement('div');

      lottoRankCount.textContent = `${ranks[rank]}개`;
      lottoRankCount.classList.add('lotto-result-cell');

      lottoResultRow.classList.add('lotto-result-row');
      lottoResultRow.appendChild(lottoMatchedCount);
      lottoResultRow.appendChild(lottoResultPrize);
      lottoResultRow.appendChild(lottoRankCount);
      resultTableFragment.appendChild(lottoResultRow);
    });

    const $lottoResultTable = document.getElementById('lottoResultTable');
    $lottoResultTable.appendChild(resultTableFragment);
  },

  printProfit(profit) {
    const $lottoResultTable = document.getElementById('lottoResultTable');
    const lottoProfitWrapper = document.createElement('div');
    lottoProfitWrapper.id = 'lottoProfitWrapper';
    const profitText = document.createElement('div');
    profitText.textContent = `당신의 총 수익률은 ${profit} %입니다.`;
    profitText.id = 'profitText';
    lottoProfitWrapper.appendChild(profitText);
    $lottoResultTable.appendChild(lottoProfitWrapper);
  },
};

export default webOutputView;
