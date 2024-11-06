<template>
  <LangChanger />
  <CreateModal />
  <div>
    <div class="example-input">
      <el-input
        v-model="serchInput"
        class="input-serch"
        suffix-icon="Search"
        :placeholder="$t('table.serch.search_applicant')"
        @input="debouncedGetSerchInfo"
      />
      <el-select
        v-model="selectHome"
        :placeholder="$t('table.serch.search_house')"
      >
        <el-option
        v-for="item in allHome"
        @click="getSerchInfoSelect(item.id)"
          :key="item"
          :label="item.address"
          :value="item.id"
        />
      </el-select>
    </div>

    <router-link :to="{ name: 'login' }">Перейти на главную</router-link>
    <el-table :data="tableData" style="width: 100%" max-height="100%">
      <el-table-column label="№">
        <template #default="scope">
          <el-button type="primary">{{ scope.row.number }}</el-button></template
        >
      </el-table-column>
      <el-table-column prop="created_at" :label="$t('table.headers.created')" />
      <el-table-column
        prop="premise.address"
        :label="$t('table.headers.address')"
      />
      <el-table-column
        prop="applicant.first_name"
        :label="$t('table.headers.applicant')"
      />
      <el-table-column
        prop="description"
        :label="$t('table.headers.description')"
      />
      <el-table-column
        prop="status.full_details"
        :label="$t('table.headers.term')"
      />
      <el-table-column prop="status.name" :label="$t('table.headers.status')" />
      <el-table-column>
        <template #default="scope">
          <el-button type="danger" @click="openEditingDialog(scope.row)">{{
            $t("table.button.edit")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditModal
      v-if="dialogVisibleEdit"
      :openDialog="dialogVisibleEdit"
      @close-dialog="closeEditingDialog"
    />

    <div class="example-pagination-block">
      <div class="m-4">
        <el-select
          class="border-border"
          v-model="selectSize"
          style="width: 100px; border: none"
          @change="resizeTable"
        >
          <el-option
            v-for="item in numbers"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <el-pagination
        v-if="!serchInput"
        :page-count="pageAmount"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";
import CreateModal from "./CreateModal.vue";
import EditModal from "./EditModal.vue";
import debounce from "lodash/debounce";
import LangChanger from "./LangChanger.vue";

import { useListData } from "../stores/ListData";
import { getHello, getDefault } from "../helpers";

import api from "../api";

api.tickets.getTickets(1, 10).then((data) => {
  tableData.value = data.data.results;
  pageAmount.value = data.data.pages;
  console.log("data", data);
});

console.log("getHello()", getHello());
console.log("getDefault()", getDefault());

const store = useListData();

console.log(store.editingTicketData);

const dialogVisibleEdit = ref(false);

const numbers = Array.from({ length: 20 }).map((_, i) => i + 1);
const selectSize = ref(10);

const serchInput = ref("");
const selectHome = ref("");

const pageAmount = ref(0);

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
});

const openEditingDialog = (proppedCol) => {
  console.log("otvet", dialogVisibleEdit.value);
  console.log("proppedCol", proppedCol);
  dialogVisibleEdit.value = true;
  store.editingTicketData.premise_id = proppedCol.premise_id;

  store.editingTicketData.address = proppedCol?.premise?.address || "";
  store.editingTicketData.numberHome = proppedCol.apartment.label;
  store.editingTicketData.number = proppedCol.number;
  store.editingTicketData.created = proppedCol.status_log.created_at;
  store.editingTicketData.id = proppedCol.id;

  store.editingTicketData.apartment_id = proppedCol.apartment_id;
  store.editingTicketData.due_date = proppedCol.due_date;
  store.editingTicketData.applicant.first_name =
    proppedCol.applicant.first_name;
  store.editingTicketData.applicant.last_name = proppedCol.applicant.last_name;
  store.editingTicketData.applicant.patronymic_name =
    proppedCol.applicant.patronymic_name;
  store.editingTicketData.applicant.username = proppedCol.applicant.username;
  store.editingTicketData.description = proppedCol.description;
  store.editingTicketData.status_id = proppedCol.status_id;

  console.log(store.editingTicketData);
};

const closeEditingDialog = () => {
  dialogVisibleEdit.value = false;
};


const resizeTable = () => {
  getInfo(1, selectSize.value);
};

const handleCurrentChange = (val: number) => {
  getInfo(val, selectSize.value);
  console.log(`current page: ${val}`);
};

// основная таблица
const tableData = ref([]);
const getInfo = async (currentPage = 1, currentSize = 10) => {
  api.tickets.getTickets(currentPage, currentSize).then((data) => {
    tableData.value = data.data.results;
    pageAmount.value = data.data.pages;
    console.log("logo", tableData.value);
    normalizeDate();
  });
};
getInfo();

// инпут поиска
const getSerchInfo = async (currentSearch = "") => {
  if (currentSearch === "") {
    getInfo();
    return;
  }
  api.tickets.searchTicket(currentSearch).then((data) => {
    tableData.value = data.data.results;
  });
};

// селект поиска
const getSerchInfoSelect = async (currentSearch = "") => {
  if (currentSearch === "") {
    getInfo();
    return;
  }
  api.tickets.searchHuse(currentSearch).then((data) => {
    tableData.value = data.data.results;
    console.log("serchSelect", data.data.results);
  });
};

const debouncedGetSerchInfo = debounce(getSerchInfo, 1000);

// const getSelectInfo = computed(() => {
//   const res = tableData.value.map((item: any) => {
//     return item;
//   });
//   console.log("все данные", res);
//   return res;
// });

const allHome = ref([]);
const getPremise = async () => {
  api.tickets.getPremise().then((data) => {
    allHome.value = data.data.results;
    console.log("allHome", allHome.value);
  });
};
getPremise();


// нормализация даты в таблице
const normalizeDate = () => {
  tableData.value.forEach((item: any) => {
    item.created_at = new Date(item.created_at).toLocaleDateString();
    console.log("time", item.created_at);
  });

};
</script>

<style scoped lang="scss">
.example-input {
  display: flex;
  padding: 15px;
  .input-serch {
    padding-right: 15px;
  }
}

.el-table {
  --el-table-header-text-color: rgba(80, 176, 83, 1);
}
.example-pagination-block {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
</style>
