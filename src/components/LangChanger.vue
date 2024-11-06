<template>
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 240px"
      @change="changeLocale"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

locale.value = localStorage.getItem("locale") || "ru";

const options = [
  {
    value: "ru",
    label: "Русский",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "es",
    label: "Español",
  },
  {
    value: "fr",
    label: "Français",
  },
  {
    value: "ja",
    label: "日本語",
  },
];
const value = ref(locale.value);
const changeLocale = (value: string) => {
    locale.value = value;
    localStorage.setItem("locale", locale.value);
};



</script>