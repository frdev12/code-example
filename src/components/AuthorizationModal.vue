<script>
import {ref} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

export default {
  name: 'AuthorizationModal',
  emits: ['login'],
  setup(_, context) {
    const userName = ref(null);
    const rules = {
      userName: { required, minLength: minLength(3), maxLength: maxLength(10) },
    }
    const v$ = useVuelidate(rules, {userName});

    function login() {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }
      context.emit('login', userName.value);
    }

    return {
      v$,
      login,
      userName,
    };
  }
};
</script>

<template>
  <div class="overlay"></div>
  <div class="auth-modal">
    <div class="auth-modal__title">Для продолжения работы введите Ваше имя</div>
    <div class="auth-modal__input">
      <input type="text" placeholder="Введите имя" v-model="userName">
      <span
          v-if="v$.userName.required.$invalid && v$.userName.$dirty"
          class="validation-error"
      >
      Это обязательное поле
    </span>
      <span
          v-else-if="v$.userName.minLength.$invalid && v$.userName.$dirty"
          class="validation-error"
      >
      Минимум 3 символа
    </span>
      <span
          v-else-if="v$.userName.maxLength.$invalid && v$.userName.$dirty"
          class="validation-error"
      >
      Максимум 10 символов
    </span>
    </div>
    <button @click="login">Войти</button>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.auth-modal {
  width: 300px;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  &__title {
    font-weight: 500;
    font-size: 18px;
    text-align: center;
  }
  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    input {
      border: 1px solid #005C91;
      border-radius: 5px;
      width: 100%;
      padding: 5px 10px;
    }
  }
  button {
    border-radius: 5px;
    padding: 10px 20px;
    background-color: #005C91;
    font-weight: 500;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #3D87B2;
    }
  }
  .validation-error {
    color: red;
  }
}
</style>