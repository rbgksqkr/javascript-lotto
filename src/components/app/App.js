import './global.css';
import './app.css';

import modal from '../../utils/dom/modal';
import Component from '../core/Component';
import LottoResultModal from '../lottoResultModal/LottoResultModal';
import PurchaseSection from '../purchaseSection/PurchaseSection';
import TitleSection from '../titleSection/TitleSection';
import WinningNumberSection from '../winningNumberSection/WinningNumberSection';

class App extends Component {
  template() {
    return `
      <section id="titleSection"></section>
      <section id="purchaseSection"></section>
      <section id="purchaseResultSection"></section>
      <section id="winningNumberSection" class="hidden"></section>
      <section id="lottoResultModal" class="hidden"></section>
    `;
  }

  mounted() {
    const $titleSection = this.$target.querySelector('#titleSection');
    const $purchaseSection = this.$target.querySelector('#purchaseSection');
    const $winningNumberSection = this.$target.querySelector('#winningNumberSection');
    const $lottoResultModal = this.$target.querySelector('#lottoResultModal');

    new TitleSection($titleSection);
    new PurchaseSection($purchaseSection);
    new WinningNumberSection($winningNumberSection);
    new LottoResultModal($lottoResultModal);
  }

  setEvent() {
    document.body.addEventListener('click', e => {
      if (e.target.id === 'modalBackground') modal.close();
    });
  }
}

export default App;
