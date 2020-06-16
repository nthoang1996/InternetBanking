<template>
  <div>
    <modal name="hello-world" no-close-on-backdrop>
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" v-if="this.getModalType == 1">
            <ModalHeader />
            <ModalBody />
            <ModalFooter @close="closeModal"/>
          </div>
           <div class="modal-container" v-if="this.getModalType == 2">
             <ModalSuggestionHeader v-if="this.getModalType == 2"/>
              <ModalSuggestionBody v-if="this.getModalType == 2"/>
              <ModalSuggestionFooter @close="closeModalSuggest" v-if="this.getModalType == 2"/>
           </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { mapGetters } from "vuex";
import ModalSuggestionHeader from './ModalSuggestionHeader';
import ModalSuggestionBody from './ModalSuggestionBody';
import ModalSuggestionFooter from './ModalSuggestionFooter';
export default {
  components: { ModalHeader, ModalBody, ModalFooter, ModalSuggestionHeader, ModalSuggestionBody, ModalSuggestionFooter },
  computed: {
    ...mapGetters(["getModalType"])
  },
  methods:{
    closeModal(isOpenModal){
      this.$emit('close',isOpenModal);
    },
    closeModalSuggest(){
      return this.$emit('closeModalSuggest');
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  height: 330px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>