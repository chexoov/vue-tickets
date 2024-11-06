<template>
  <!-- диалог создания -->
  <el-button class="buttonCreate" type="primary" @click="dialogVisibleChange">
    {{ $t("table.button.create") }}
  </el-button>
  <el-dialog v-model="dialogVisible" title="" width="800">
    <div class="dialog-content-header">
      <el-select
        class="dialog-content-header-item"
        v-model="currentPremise"
        @change="getApartment"
        :placeholder="$t('table.interface.house')"
      >
        <el-option
          v-for="item in getSelectInfo"
          :key="item"
          :label="item.address"
          :value="item.id"
        />
      </el-select>
      <el-select
        class="dialog-content-header-item"
        v-model="newCreating.apartment_id"
        :placeholder="$t('table.interface.flat')"
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
        :placeholder="$t('table.interface.term')"
      />
    </div>
    <div class="dialog-content-header">
      <el-input
        class="dialog-content-header-item"
        v-model="newCreating.applicant.last_name"
        :placeholder="$t('table.interface.surname')"
      />
      <el-input
        class="dialog-content-header-item"
        v-model="newCreating.applicant.first_name"
        :placeholder="$t('table.interface.name')"
      />
      <el-input
        class="dialog-content-header-item"
        v-model="newCreating.applicant.patronymic_name"
        :placeholder="$t('table.interface.middle_name')"
      />
      <el-input
        class="dialog-content-header-item"
        v-model="newCreating.applicant.username"
        :placeholder="$t('table.interface.phone')"
      />
    </div>
    <div>
      <textarea
        class="dialog-content-textarea"
        v-model="newCreating.description"
        :placeholder="$t('table.interface.description_application')"
        name=""
        id=""
        cols="93"
        rows="13"
      ></textarea>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="sendNewCreating">{{
          $t("table.button.create")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import api from "../api";

const dialogVisible = ref(false);
const dialogVisibleChange = () => {
  console.log(dialogVisible.value);
  dialogVisible.value = !dialogVisible.value;
};

const newCreating = ref({
  address: "",
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
    api.tickets.createTicket(newCreating.value).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.error("Ошибка отправки данных:", error);
  }
};

const getPremise = async () => {
  api.tickets.getPremise().then((data) => {
    tableData.value = data.data.results;
  });
};
getPremise();

const getSelectInfo = computed(() => {
  const res = tableData.value.map((item: any) => {
    return item;
  });
  return res;
});

const currentPremise = ref("");

const numberHome = ref([]);
const getApartment = async () => {
  api.tickets.getApartments(currentPremise.value).then((data) => {
    numberHome.value = data.data.results;
    newCreating.value.premise_id = currentPremise.value;
    console.log("apartment", data);
  });
};
</script>

<style lang="scss">
.buttonCreate {
  display: block;
  margin-left: auto;
  margin-right: 20px;
}
</style>

<style lang="scss">

.dialog-content-header {
  display: flex;
  padding: 5px;
  justify-content: space-between;
  .dialog-content-header-item {
    border: none;
    padding: 0px 8px;
  }
}

.dialog-content-textarea {
  resize: none;
  opacity: 0.5;
  outline: none;
  padding-top: 20px;
  border: none;
  border-bottom: 2px solid #ccc;
}

</style>