<template>
  <div class="memory-game">
    <div class="memory-game__left">
      <div class="memory-game__cards-wrapper">
        <div v-for="index in 36" :key="index"
             class="memory-game__card">
          <app-memory-card v-if="processCards[index-1]"
                           :cardData="processCards[index-1]"
                           v-model="pickedCardsArr"
                           :disable-actions="checkCardBlocked( processCards[index-1] )"/>
        </div>
      </div>
    </div>

    <div class="memory-game__right">
      <div class="memory-game__action-buttons">
        <button class="memory-game__button"
                :disabled="!isGameStarted"
                @click="restartGame">
          Перезапустить игру
        </button>

        <button class="memory-game__button"
                :disabled="isGameStarted"
                @click="startGame">
          Начать игру
        </button>
      </div>

      <div class="memory-game__result-table">
        <app-memory-table/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

import AppMemoryCard from './AppMemoryCard.vue';
import AppMemoryTable from './AppMemoryTable.vue';

export default {
  name: "AppMemoryGame",
  components: {AppMemoryCard, AppMemoryTable},
  data() {
    return {
      cards: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
      ],
      processCards: [],
      isGameStarted: false,
      startGameTime: null,
      pickedCardsArr: [],
      firstCardTimer: null,
    }
  },
  methods: {
    ...mapMutations( 'memory', [ 'addMemoryTimeValue', 'clearMemoryTimeValue' ] ),
    duplicateAndShuffleArray() {
      let cards = Array.from( this.cards );

      cards = [ ...cards, ...cards ];

      const processCards = [];

      cards.forEach( (value, index) => {
        const processCard = {
          id: 'memory-card-' + index,
          value
        }

        processCards.push(processCard)
      } )

      processCards.sort(() => Math.random() - 0.5);

      return processCards;
    },
    startGame() {
      this.processCards = this.duplicateAndShuffleArray();
      this.startGameTime = new Date();
      this.isGameStarted = true;
      this.clearMemoryTimeValue();
    },
    restartGame() {
      this.processCards = this.duplicateAndShuffleArray();
      this.pickedCardsArr = [];
      this.startGameTime = new Date();
      this.clearMemoryTimeValue();
    },
    stopGame() {
      this.startGameTime = null;
      this.isGameStarted = false;
    },
    checkCardsEqual() {
      if ( this.pickedCardsArr.length !== 2 ) {
        return;
      }

      const [firstCard, secondCard] = this.pickedCardsArr;

      return firstCard.value === secondCard.value;
    },
    applyCards() {
      const pickedCard = this.pickedCardsArr[0];

      const milliseconds = (new Date() - this.startGameTime) / 1000;

      this.addMemoryTimeValue({
        name: pickedCard.value,
        time: milliseconds
      })

      this.processCards.forEach( (card, index) => {
        if ( !card ) return;

        if ( card.value === pickedCard.value ) {
          this.processCards[index] = null;
        }
      } )

      this.pickedCardsArr = [];

      if ( !this.processCards.find( card => card !== null ) ) {
        this.stopGame();

        setTimeout( () => {
          alert('Победа!');
        } )
      }
    },
    rejectCards() {
      this.pickedCardsArr = [];
    },
    checkCardBlocked( card ) {
      return !this.isGameStarted ||
             this.pickedCardsArr.includes( card ) ||
             this.pickedCardsArr.length === 2;
    }
  },
  watch: {
    pickedCardsArr(val) {
      if ( this.firstCardTimer ) {
        clearTimeout( this.firstCardTimer );
        this.firstCardTimer = null;
      }

      if ( val.length === 1 ) {
        this.firstCardTimer = setTimeout( () => {
          this.rejectCards();
        }, 5000 )
      } else if ( val.length === 2 ) {
        const isCardsEqual = this.checkCardsEqual();

        setTimeout( () => {
          if ( isCardsEqual ) {
            this.applyCards();
          } else {
            this.rejectCards();
          }
        }, 200 )
      }
    }
  }
}
</script>

