<template>
    <el-dialog  v-model="dialogVisibleEdit" @close="$emit('closeDialog') " destroy-on-close title="" width="800">
      <p>Заявка №{{  newEditing.number }} (от {{ newEditing.created }})</p>
      <div class="dialog-content-header">
        {{ newEditing.id }}
        <el-select
          class="dialog-content-header-item"
          v-model="newEditing.address"
          @change="handleChange"
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
          v-model="newEditing.numberHome"
          placeholder="Квартира"
        >
          <el-option
            v-for="item in getNumberHome"
            :key="item"
            :label="item.label"
            :value="item.number"
          />
        </el-select>



        
        <el-input
          class="dialog-content-header-item"
          v-model="newEditing.due_date"
          disabled
          
        />
      </div>
      <div class="dialog-content-header">
        <el-input
          class="dialog-content-header-item"
          v-model="newEditing.applicant.last_name"
          placeholder="Фамилия"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newEditing.applicant.first_name"
          placeholder="Имя"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newEditing.applicant.patronymic_name"
          placeholder="Отчество"
        />
        <el-input
          class="dialog-content-header-item"
          v-model="newEditing.applicant.username"
          placeholder="Телефон"
        />
      </div>
      <div>
        <textarea
          class="dialog-content-textarea"
          v-model="newEditing.description"
          placeholder="Описание заявки"
          name=""
          id=""
          cols="93"
          rows="13"
        ></textarea>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="patchEdit">Cохранить изменения</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref, toRefs,  } from "vue";
import { useListData } from "../stores/ListData";

import api from "../api";


const props = defineProps({
    openDialog: {
        type: Boolean,
        default: false
    }
})

const dialogVisibleEdit = ref(props.openDialog);

const store = useListData();

const newEditing = ref({
  premise_id: "",
  
  number: "",
  address: "",
  numberHome: "",
  created: "",
  id: "",

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
})


const getTicketFromStore = () => {
  newEditing.value.premise_id = store.editingTicketData.premise_id
  newEditing.value.address = store.editingTicketData.address
  newEditing.value.numberHome = store.editingTicketData.numberHome
  newEditing.value.number = store.editingTicketData.number
  newEditing.value.created = store.editingTicketData.created
  newEditing.value.id = store.editingTicketData.id
  newEditing.value.apartment_id = store.editingTicketData.apartment_id
  newEditing.value.due_date = store.editingTicketData.due_date
  newEditing.value.applicant.first_name = store.editingTicketData.applicant.first_name
  newEditing.value.applicant.last_name = store.editingTicketData.applicant.last_name
  newEditing.value.applicant.patronymic_name = store.editingTicketData.applicant.patronymic_name
  newEditing.value.applicant.username = store.editingTicketData.applicant.username
  newEditing.value.description = store.editingTicketData.description
  newEditing.value.status_id = store.editingTicketData.status_id
}
getTicketFromStore()

const tableData = ref([]);

const getPremise = async () => {
  api.tickets.getPremise().then((data) => {
    tableData.value = data.data.results;
  })
};
getPremise()

// !!
const patchEdit = async () => {
  try {
    api.tickets.updateTicket(newEditing.value.id, newEditing.value).then((data) => {
      console.log("успешно", data);
    });
  } catch (error) {
    console.error("Ошибка отправки данных:", error);
  }
};


const currentPremise = ref("");
const getNumberHome = ref([]);
const getApartment = async () => {
  api.tickets.getApartments(currentPremise.value).then((data) => {
    getNumberHome.value = data.data.results;
  })
};

const getSelectInfo = computed(() => {
  const res = tableData.value.map((item: any) => {
    return item;
  });
  console.log('все данные',res);
  return res;
});

const handleChange = () => {
 getSelectInfo.value.forEach((item: any) => {
  if (item.id === newEditing.value.address) {
    currentPremise.value = item.id;
    newEditing.value.address = item.address;
    newEditing.value.apartment_id = item.apartment_id;
    newEditing.value.premise_id = currentPremise.value;
  }
 })
  getApartment();
};


</script>

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