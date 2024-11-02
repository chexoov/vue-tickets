<template>
    <!-- диалог создания -->
    <el-button class="buttonCreate"  type="primary"  @click="dialogVisibleChange">
      Создать
    </el-button>
    <el-dialog v-model="dialogVisible" title="" width="800">
      <div class="dialog-content-header">
        <el-select
          class="dialog-content-header-item"
          v-model="currentPremise"
          @change="getApartment"
          placeholder="Дом"
        >
          <el-option
            class=""
            v-for="item in getSelectInfo"
            :key="item"
            :label="item.address"
            :value="item.id"
          />
        </el-select>
        <el-select
          class="dialog-content-header-item"
          v-model="newCreating.apartment_id"
          placeholder="Квартира"
        >
          <el-option
            v-for="item in numberHome"
            :key="item"
            :label="item.label"
            :value="item.number"
          />
        </el-select>
        <el-input
          class="dialog-content-header-item"
          v-model="newCreating.due_date"
          type="datetime-local"
          placeholder="Срок"
        />
      </div>
      <div class="dialog-content-header">
        <el-input
          class="dialog-content-header-item"
          v-model="newCreating.applicant.last_name"
          placeholder="Фамилия"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newCreating.applicant.first_name"
          placeholder="Имя"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newCreating.applicant.patronymic_name"
          placeholder="Отчество"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newCreating.applicant.username"
          placeholder="Телефон"
        />
      </div>
      <div>
        <textarea
          class="dialog-content-textarea"
          v-model="newCreating.description"
          placeholder="Описание заявки"
          name=""
          id=""
          cols="93"
          rows="13"
        ></textarea>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="sendNewCreating">Cохранить</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const dialogVisible = ref(false);
const dialogVisibleChange = ()  => {
    console.log(dialogVisible.value)
  dialogVisible.value = !dialogVisible.value;
}

const newCreating = ref({
  premise_id: "",
  apartment_id: "",
  applicant: {
    first_name: "",
    last_name: "",
    patronymic_name: "",
    username: "",
  },
  description: "",
  due_date: "",
  status_id: "1",
});

const tableData = ref([]);
const sendNewCreating = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const timeMasc = ":00Z";
    newCreating.value.due_date = newCreating.value.due_date + timeMasc;
    const { data } = await axios.post(
      "https://dev.moydomonline.ru/api/appeals/v1.0/appeals/",
      newCreating.value,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("успешно");
  } catch (error) {
    console.error("Ошибка отправки данных:", error);
  }
};

const getPremise = async () => {
  const token = localStorage.getItem("jwt");
  const { data } = await axios.get(
    `https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  console.log(data);
  tableData.value = data.results;
};
getPremise()


const getSelectInfo = computed(() => {
  const res = tableData.value.map((item: any) => {
    return item;
  });
  return res;
});

const currentPremise = ref("");
const numberHome = ref([]);
const getApartment = async () => {
  const token = localStorage.getItem("jwt");
  const { data } = await axios.get(
    `https://dev.moydomonline.ru/api/geo/v1.0/apartments/?premise_id=${currentPremise.value}&search=`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  numberHome.value = data.results;
  console.log("number",numberHome.value);
}

</script>

<style lang="scss">

.buttonCreate {
    display: block;
    margin-left: auto;
    margin-right: 20px;

}

</style>